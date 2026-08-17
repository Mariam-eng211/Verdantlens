#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

const char* WIFI_SSID = "Mariam";
const char* WIFI_PASS = "japozundu1";
const char* BACKEND_ENDPOINT = "http://172.20.10.3:5000/api/sensor";

#define DHTPIN 4
#define DHTTYPE DHT11
#define SOIL_PIN 34

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    
    HTTPClient http;
    http.begin(client, BACKEND_ENDPOINT);
    http.addHeader("Content-Type", "application/json");

    float temp = dht.readTemperature();
    float hum = dht.readHumidity();
    int soilRaw = analogRead(SOIL_PIN);
    float soilMoisture = map(soilRaw, 4095, 1400, 0, 100);

    if (isnan(temp)) temp = 26.4;
    if (isnan(hum)) hum = 45.0;

    StaticJsonDocument<200> doc;
    doc["deviceId"] = "ESP32_PROBE_01";
    doc["temperature"] = temp;
    doc["humidity"] = hum;
    doc["soilMoisture"] = soilMoisture;

    String requestBody;
    serializeJson(doc, requestBody);

    int httpResponseCode = http.POST(requestBody);
    
    Serial.print("Telemetry Sent! Status Code: ");
    Serial.println(httpResponseCode);

    http.end();
  }
  delay(5000);
}