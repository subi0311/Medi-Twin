#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

Adafruit_SH1106G display = Adafruit_SH1106G(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire);

void setup() {
  Wire.begin(21, 22); // SDA, SCL
  Serial.begin(115200);

  Serial.println("Starting SH1106 Test...");

  display.begin(0x3C, true); // Address 0x3C
  display.clearDisplay();

  display.setTextSize(2);
  display.setTextColor(SH110X_WHITE);
  display.setCursor(0, 20);
  display.println("HELLO!");
  display.display();
}

void loop() {

}