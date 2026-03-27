#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"

MAX30105 particleSensor;

uint32_t irBuffer[100];
uint32_t redBuffer[100];

int32_t spo2;
int8_t validSPO2;
int32_t heartRate;
int8_t validHeartRate;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);

  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found");
    while (1);
  }

  particleSensor.setup(
    60,    // LED brightness
    4,     // sample average
    2,     // LED mode (RED + IR)
    100,   // sample rate
    411,   // pulse width
    4096   // ADC range
  );

  Serial.println("Place finger on sensor");
}

void loop() {
  for (int i = 0; i < 100; i++) {
    while (!particleSensor.available())
      particleSensor.check();

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i]  = particleSensor.getIR();
    particleSensor.nextSample();
  }

  maxim_heart_rate_and_oxygen_saturation(
    irBuffer, 100, redBuffer,
    &spo2, &validSPO2,
    &heartRate, &validHeartRate
  );

  if (validHeartRate && validSPO2) {
    Serial.print("Heart Rate: ");
    Serial.print(heartRate);
    Serial.print(" bpm | SpO2: ");
    Serial.print(spo2);
    Serial.println(" %");
  } else {
    Serial.println("Adjust finger placement");
  }

  delay(1000);
}
