/*
 * ESP32 RFID Attendance System
 * Features:
 * - RC522 RFID Reader
 * - I2C LCD Display (16x2)
 * - WiFi Connection
 * - Time In/Time Out Recording
 * - Student Information Display
 * 
 * Pin Connections:
 * RC522:
 *   GPIO 5  -> SDA/SS
 *   GPIO 4  -> RST
 *   GPIO 18 -> SCK
 *   GPIO 23 -> MOSI
 *   GPIO 19 -> MISO
 *   3.3V    -> VCC
 *   GND     -> GND
 * 
 * LCD (I2C):
 *   GPIO 21 -> SDA
 *   GPIO 22 -> SCL
 *   5V/3.3V -> VCC
 *   GND     -> GND
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <SPI.h>
#include <MFRC522.h>
#include <LiquidCrystal_I2C.h>
#include <ArduinoJson.h>

// WiFi Credentials
const char* ssid = "ZTE_2.4G_ammtqh";
const char* password = "RHuafPuR";

// Server URL (Vercel deployment)
const char* serverURL = "https://migrate-eight.vercel.app/api/admin/attendance-live";

// RC522 Pins
#define SS_PIN 5
#define RST_PIN 4

// Initialize RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Initialize LCD (I2C address may vary, common: 0x27 or 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2); // Change 0x27 to your LCD's I2C address if different

// Variables
String lastCardUID = "";
unsigned long lastScanTime = 0;
const unsigned long scanInterval = 2000; // Minimum 2 seconds between scans
bool isConnected = false;

void setup() {
  Serial.begin(115200);
  delay(1000);

  // Initialize SPI for RC522
  SPI.begin();
  mfrc522.PCD_Init();
  
  // Initialize LCD
  lcd.init();
  lcd.backlight();
  
  // Display startup message
  lcd.setCursor(0, 0);
  lcd.print("RFID System");
  lcd.setCursor(0, 1);
  lcd.print("Initializing...");
  delay(2000);
  
  // Connect to WiFi
  connectToWiFi();
  
  // Display ready message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  lcd.setCursor(0, 1);
  lcd.print("Scan RFID Card");
  
  Serial.println("RFID Attendance System Ready");
  Serial.println("Waiting for RFID card...");
}

void loop() {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    isConnected = false;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Disconnected");
    lcd.setCursor(0, 1);
    lcd.print("Reconnecting...");
    connectToWiFi();
    return;
  }
  
  // Check for new RFID card
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(100);
    return;
  }
  
  // Prevent duplicate scans
  unsigned long currentTime = millis();
  if (currentTime - lastScanTime < scanInterval) {
    return;
  }
  
  // Read card UID
  String cardUID = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) cardUID += "0";
    cardUID += String(mfrc522.uid.uidByte[i], HEX);
  }
  cardUID.toUpperCase();
  
  // Check if it's the same card (prevent rapid re-scans)
  if (cardUID == lastCardUID && (currentTime - lastScanTime) < 5000) {
    mfrc522.PICC_HaltA();
    return;
  }
  
  lastCardUID = cardUID;
  lastScanTime = currentTime;
  
  Serial.println("Card detected: " + cardUID);
  
  // Display scanning message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Scanning...");
  lcd.setCursor(0, 1);
  lcd.print("Card: " + cardUID.substring(0, 8));
  
  // Send scan to server
  sendScanToServer(cardUID);
  
  // Halt card
  mfrc522.PICC_HaltA();
  delay(500);
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    isConnected = true;
    Serial.println("");
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Connected");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP());
    delay(2000);
  } else {
    Serial.println("");
    Serial.println("WiFi connection failed!");
    isConnected = false;
  }
}

void sendScanToServer(String rfidCard) {
  if (!isConnected || WiFi.status() != WL_CONNECTED) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("No Connection");
    lcd.setCursor(0, 1);
    lcd.print("Check WiFi");
    delay(2000);
    return;
  }
  
  WiFiClientSecure client;
  client.setInsecure(); // Skip certificate validation (for Vercel)
  // For production, you should add proper certificate validation
  
  // Set timeout for connection
  client.setTimeout(10000); // 10 seconds
  
  HTTPClient http;
  http.setTimeout(10000); // 10 seconds timeout
  
  // Ensure URL doesn't have trailing slash
  String url = String(serverURL);
  if (url.endsWith("/")) {
    url = url.substring(0, url.length() - 1);
  }
  
  Serial.println("Connecting to: " + url);
  http.begin(client, url); // Use secure client for HTTPS
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Accept", "application/json");
  http.addHeader("User-Agent", "ESP32-RFID-Scanner");
  
  // Create JSON payload
  DynamicJsonDocument doc(1024);
  doc["rfidCard"] = rfidCard;
  
  String jsonPayload;
  serializeJson(doc, jsonPayload);
  
  Serial.println("=== Sending RFID Scan ===");
  Serial.println("URL: " + String(serverURL));
  Serial.println("RFID Card: " + rfidCard);
  Serial.println("Payload: " + jsonPayload);
  
  // Send POST request
  int httpResponseCode = http.POST(jsonPayload);
  
  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    // Check Content-Type header
    String contentType = http.header("Content-Type");
    Serial.println("Content-Type: " + contentType);
    
    String response = http.getString();
    response.trim(); // Remove leading/trailing whitespace
    
    Serial.println("Response length: " + String(response.length()));
    Serial.println("Response: " + response);
    
    // Check if response is empty
    if (response.length() == 0) {
      Serial.println("Empty response received");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Empty Response");
      lcd.setCursor(0, 1);
      lcd.print("Code: " + String(httpResponseCode));
      delay(3000);
      http.end();
      return;
    }
    
    // Check if response is HTML (error page)
    if (response.startsWith("<!DOCTYPE") || response.startsWith("<html") || response.startsWith("<HTML")) {
      Serial.println("Received HTML instead of JSON - likely an error page");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Server Error");
      lcd.setCursor(0, 1);
      lcd.print("HTML Response");
      delay(3000);
      http.end();
      return;
    }
    
    // Check if response doesn't start with { (not JSON)
    if (!response.startsWith("{") && !response.startsWith("[")) {
      Serial.println("Response doesn't appear to be JSON");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Invalid Format");
      lcd.setCursor(0, 1);
      lcd.print("Not JSON");
      delay(3000);
      http.end();
      return;
    }
    
    // Parse response
    DynamicJsonDocument responseDoc(2048);
    DeserializationError error = deserializeJson(responseDoc, response);
    
    if (error) {
      // JSON parsing failed
      Serial.print("JSON Parse error: ");
      Serial.println(error.c_str());
      Serial.println("Response preview: " + response.substring(0, 200));
      
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Parse Error");
      lcd.setCursor(0, 1);
      String errorCode = String(error.code());
      if (errorCode.length() > 16) errorCode = errorCode.substring(0, 13) + "...";
      lcd.print(errorCode);
      delay(3000);
    } else if (responseDoc["success"]) {
      // Success - display student information
      displayStudentInfo(responseDoc);
    } else {
      // Error from server
      String errorMsg = "Unknown error";
      if (responseDoc.containsKey("error")) {
        errorMsg = responseDoc["error"].as<String>();
      } else if (responseDoc.containsKey("message")) {
        errorMsg = responseDoc["message"].as<String>();
      }
      
      Serial.println("Server Error: " + errorMsg);
      Serial.println("Full Response: " + response);
      
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Error!");
      lcd.setCursor(0, 1);
      // Truncate error message to fit LCD (16 characters)
      String displayError = errorMsg;
      if (displayError.length() > 16) {
        displayError = displayError.substring(0, 13) + "...";
      }
      lcd.print(displayError);
      delay(3000);
    }
  } else {
    Serial.print("HTTP Error code: ");
    Serial.println(httpResponseCode);
    
    // Try to get error response body
    String errorResponse = http.getString();
    Serial.println("Error response: " + errorResponse);
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("HTTP Error");
    lcd.setCursor(0, 1);
    String errorCode = "Code: " + String(httpResponseCode);
    if (errorCode.length() > 16) errorCode = errorCode.substring(0, 13) + "...";
    lcd.print(errorCode);
    delay(3000);
  }
  
  http.end();
  
  // Reset display after delay
  delay(2000);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  lcd.setCursor(0, 1);
  lcd.print("Scan RFID Card");
}

void displayStudentInfo(DynamicJsonDocument& doc) {
  // Extract student information
  const char* studentName = doc["record"]["studentName"] | "Unknown";
  const char* gradeLevel = doc["record"]["gradeLevel"] | "N/A";
  const char* section = doc["record"]["section"] | "N/A";
  const char* scanType = doc["record"]["scanType"] | "unknown";
  const char* message = doc["message"] | "";
  
  // Display on LCD
  lcd.clear();
  
  // Line 1: Student Name (truncate if too long)
  String name = String(studentName);
  if (name.length() > 16) {
    name = name.substring(0, 13) + "...";
  }
  lcd.setCursor(0, 0);
  lcd.print(name);
  
  // Line 2: Grade/Section and Scan Type
  String info = String(gradeLevel) + "-" + String(section);
  if (info.length() > 10) {
    info = info.substring(0, 10);
  }
  lcd.setCursor(0, 1);
  lcd.print(info);
  
  // Show scan type indicator
  if (strcmp(scanType, "timein") == 0) {
    lcd.setCursor(12, 1);
    lcd.print("IN");
  } else if (strcmp(scanType, "timeout") == 0) {
    lcd.setCursor(12, 1);
    lcd.print("OUT");
  }
  
  // Print to Serial
  Serial.println("=== Student Information ===");
  Serial.println("Name: " + String(studentName));
  Serial.println("Grade: " + String(gradeLevel));
  Serial.println("Section: " + String(section));
  Serial.println("Scan Type: " + String(scanType));
  Serial.println("Message: " + String(message));
  Serial.println("===========================");
  
  // Show success message briefly
  delay(3000);
  
  // Show time in/out confirmation
  lcd.clear();
  if (strcmp(scanType, "timein") == 0) {
    lcd.setCursor(0, 0);
    lcd.print("TIME IN");
    lcd.setCursor(0, 1);
    lcd.print("Recorded!");
  } else if (strcmp(scanType, "timeout") == 0) {
    lcd.setCursor(0, 0);
    lcd.print("TIME OUT");
    lcd.setCursor(0, 1);
    lcd.print("Recorded!");
  } else {
    lcd.setCursor(0, 0);
    lcd.print("Scan Recorded");
    lcd.setCursor(0, 1);
    lcd.print("Successfully");
  }
  
  delay(2000);
}

