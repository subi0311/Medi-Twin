#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>

#include <Adafruit_MPU6050.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

#include <OneWire.h>
#include <DallasTemperature.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

// 
const char* ssid = "Zahid khan";
const char* password = "khan78692";

// ⚠️ laptop / backend IP
String serverURL = "http://192.168.100.5/5000/api/v1/deviceData/add";
// String serverURL = "http://192.168.0.104:5000/api/v1/deviceData/add";
String deviceId  = "ESP32_01";

// ================= OLED ==================
Adafruit_SH1106G display(128, 64, &Wire, -1);

// ================= MPU =================
Adafruit_MPU6050 mpu;
int stepCount = 0;
bool stepUp = false;

// ================= TEMP ==================
#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);

// ================= MAX30102 ===============
MAX30105 particleSensor;
uint32_t irBuffer[100];
uint32_t redBuffer[100];
int32_t spo2;
int8_t validSPO2;
int32_t heartRate;
int8_t validHeartRate;

// ================= WIFI CONNECT =================
void connectWiFi() {
  Serial.print("Connecting to WiFi");
  WiFi.begin(ssid, password);

  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi Connected");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ WiFi Failed");
  }
}

// ================= SEND DATA =================
void sendData(float tempF, int hr, int spo2Val, int steps) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ WiFi not connected, data not sent");
    return;
  }

  HTTPClient http;
  http.begin(serverURL);
  http.addHeader("Content-Type", "application/json");

  String payload = "{";
  payload += "\"deviceId\":\"" + deviceId + "\"," ;
  payload += "\"temperature\":" + String(tempF, 1) + ",";
  payload += "\"heartRate\":" + String(hr) + ",";
  payload += "\"spo2\":" + String(spo2Val) + ",";
  payload += "\"steps\":" + String(steps);
  payload += "}";

  int httpCode = http.POST(payload);
  Serial.print("📡 POST status: ");
  Serial.println(httpCode);

  http.end();
}

// ================= SETUP =================
void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  // OLED init
  if (!display.begin(0x3C)) {
    Serial.println("❌ OLED failed to initialize");
  } else {
    display.setTextSize(1);
    display.setTextColor(SH110X_WHITE);
  }

  // MPU init
  if (!mpu.begin()) {
    Serial.println("❌ MPU6050 failed to initialize");
  }

  // Temp sensor
  tempSensor.begin();

  // MAX30102 init
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("❌ MAX30102 failed to initialize");
  } else {
    particleSensor.setup();
  }

  connectWiFi();
  Serial.println("✅ System Ready");
}

// ================= LOOP =================
void loop() {
  // ---- TEMP ----
  tempSensor.requestTemperatures();
  float tempC = tempSensor.getTempCByIndex(0);
  float tempF = tempC * 9.0 / 5.0 + 32.0;

  // ---- STEPS ----
  sensors_event_t a, g, t;
  mpu.getEvent(&a, &g, &t);

  if (a.acceleration.x > 1.2 && !stepUp) stepUp = true;
  if (a.acceleration.x < 0.4 && stepUp) {
    stepCount++;
    stepUp = false;
  }

  // ---- HR + SPO2 ----
  for (int i = 0; i < 100; i++) {
    unsigned long startTime = millis();
    while (!particleSensor.available()) {
      particleSensor.check();
      if (millis() - startTime > 1000) { // 1 sec timeout
        redBuffer[i] = 0;
        irBuffer[i] = 0;
        break;
      }
    }
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i]  = particleSensor.getIR();
    particleSensor.nextSample();
  }

  maxim_heart_rate_and_oxygen_saturation(
    irBuffer, 100, redBuffer,
    &spo2, &validSPO2,
    &heartRate, &validHeartRate
  );

  // ---- SERIAL ----
  Serial.println("----- SENSOR DATA -----");
  Serial.print("Temp(F): "); Serial.println(tempF, 1);
  Serial.print("Steps  : "); Serial.println(stepCount);

  if (validHeartRate && validSPO2) {
    Serial.print("HR     : "); Serial.println(heartRate);
    Serial.print("SpO2   : "); Serial.println(spo2);
    sendData(tempF, heartRate, spo2, stepCount);
  } else {
    Serial.println("Finger not detected");
  }
  Serial.println("-----------------------\n");

  // ---- OLED ----
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print("Steps: "); display.println(stepCount);

  display.setCursor(0, 16);
  display.print("Temp: "); display.print(tempF, 1); display.println("F");

  display.setCursor(0, 32);
  display.print("HR: ");
  validHeartRate ? display.println(heartRate) : display.println("--");

  display.setCursor(0, 48);
  display.print("SpO2: ");
  validSPO2 ? display.println(spo2) : display.println("--");

  display.display();

  delay(2000);
}

