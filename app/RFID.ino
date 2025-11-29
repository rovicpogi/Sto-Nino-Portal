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
 *   3.3V    -> VCC (try 5V if 3.3V doesn't work)
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
const char* ssid = "PLDTHOMEFIBRcb1f0";
const char* password = "PLDTWIFIf3p4u";

// Server URL (Vercel deployment)
const char* serverURL = "https://migrate-eight.vercel.app/api/admin/attendance-live";

// RC522 Pins
#define SS_PIN 5
#define RST_PIN 4

// SPI Pins for ESP32
#define SCK_PIN 18
#define MOSI_PIN 23
#define MISO_PIN 19

// Initialize RC522
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Initialize LCD (I2C address: 0x27 or 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Variables
String lastCardUID = "";
unsigned long lastScanTime = 0;
const unsigned long scanInterval = 2000; // 2 seconds between scans
bool isConnected = false;
bool rc522Working = false;

void setup() {
  // Initialize Serial
  Serial.begin(115200);
  delay(2000);
  
  Serial.println();
  Serial.println("========================================");
  Serial.println("ESP32 RFID Attendance System");
  Serial.println("========================================");
  
  // Initialize LCD
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  
  // Initialize SPI
  Serial.println("Initializing SPI...");
  SPI.begin(SCK_PIN, MISO_PIN, MOSI_PIN, SS_PIN);
  delay(100);
  
  // Reset RC522
  Serial.println("Resetting RC522...");
  pinMode(RST_PIN, OUTPUT);
  digitalWrite(RST_PIN, LOW);
  delay(50);
  digitalWrite(RST_PIN, HIGH);
  delay(200);
  
  // Initialize RC522
  Serial.println("Initializing RC522...");
  mfrc522.PCD_Init();
  delay(100);
  
  // Check RC522 version
  byte version = mfrc522.PCD_ReadRegister(mfrc522.VersionReg);
  Serial.print("RC522 Version: 0x");
  if (version < 0x10) Serial.print("0");
  Serial.println(version, HEX);
  
  if (version == 0x00 || version == 0xFF) {
    Serial.println("ERROR: RC522 not detected!");
    Serial.println("Check wiring and power supply.");
    Serial.println("Try using 5V instead of 3.3V for RC522 VCC");
    rc522Working = false;
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("RC522 ERROR!");
    lcd.setCursor(0, 1);
    lcd.print("Check Wiring");
    delay(5000);
  } else {
    Serial.println("RC522 initialized successfully!");
    rc522Working = true;
    
    // Set antenna gain to maximum
    mfrc522.PCD_SetAntennaGain(mfrc522.RxGain_max);
    Serial.println("Antenna gain set to maximum");
  }
  
  // Connect to WiFi
  connectToWiFi();
  
  // Display ready message
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  lcd.setCursor(0, 1);
  lcd.print("Scan RFID Card");
  
  Serial.println("System ready. Waiting for RFID card...");
  Serial.println("========================================");
}

void loop() {
  // Check WiFi
  if (WiFi.status() != WL_CONNECTED) {
    isConnected = false;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Disconnected");
    connectToWiFi();
    return;
  }
  
  // Skip if RC522 not working
  if (!rc522Working) {
    delay(1000);
    return;
  }
  
  // CONTINUOUS CARD DETECTION - Most reliable method
  // Reset the antenna and check for cards continuously
  if (!mfrc522.PICC_IsNewCardPresent()) {
    // No card detected, continue loop
    delay(10);
    return;
  }
  
  // Card detected! Now try to read it
  if (!mfrc522.PICC_ReadCardSerial()) {
    // Failed to read, try again
    delay(10);
    return;
  }
  
  // Card read successfully!
  Serial.println();
  Serial.println(">>> CARD DETECTED! <<<");
  
  // Read UID
  String cardUID = "";
  Serial.print("UID: ");
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    if (mfrc522.uid.uidByte[i] < 0x10) cardUID += "0";
    cardUID += String(mfrc522.uid.uidByte[i], HEX);
    Serial.print("0x");
    if (mfrc522.uid.uidByte[i] < 0x10) Serial.print("0");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    Serial.print(" ");
  }
  Serial.println();
  cardUID.toUpperCase();
  Serial.println("Card UID: " + cardUID);
  
  // Prevent duplicate scans
  unsigned long currentTime = millis();
  if (cardUID == lastCardUID && (currentTime - lastScanTime) < scanInterval) {
    Serial.println("(Same card, ignoring duplicate)");
    mfrc522.PICC_HaltA();
    mfrc522.PCD_StopCrypto1();
    delay(100);
    return;
  }
  
  lastCardUID = cardUID;
  lastScanTime = currentTime;
  
  Serial.println(">>> Processing: " + cardUID + " <<<");
  
  // Display on LCD
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Scanning...");
  lcd.setCursor(0, 1);
  String displayUID = cardUID;
  if (displayUID.length() > 16) {
    displayUID = displayUID.substring(0, 13) + "...";
  }
  lcd.print(displayUID);
  
  // Send to server
  sendScanToServer(cardUID);
  
  // Halt card and stop crypto
  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
  delay(500);
  
  // Reset display
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("System Ready");
  lcd.setCursor(0, 1);
  lcd.print("Scan RFID Card");
}

void connectToWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting WiFi");
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 30) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    isConnected = true;
    Serial.println();
    Serial.println("WiFi connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Connected");
    lcd.setCursor(0, 1);
    String ip = WiFi.localIP().toString();
    if (ip.length() > 16) {
      ip = ip.substring(0, 13) + "...";
    }
    lcd.print(ip);
    delay(2000);
  } else {
    Serial.println();
    Serial.println("WiFi connection failed!");
    isConnected = false;
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Failed");
    delay(2000);
  }
}

void sendScanToServer(String rfidCard) {
  // Check WiFi connection
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi not connected! Reconnecting...");
    isConnected = false;
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("WiFi Lost");
    lcd.setCursor(0, 1);
    lcd.print("Reconnecting...");
    connectToWiFi();
    if (WiFi.status() != WL_CONNECTED) {
      delay(2000);
      return;
    }
  }
  
  Serial.println("Preparing HTTPS connection...");
  Serial.println("Server URL: " + String(serverURL));
  
  WiFiClientSecure client;
  client.setInsecure(); // Skip certificate validation
  client.setTimeout(15000); // 15 seconds timeout
  
  HTTPClient http;
  http.setTimeout(15000); // 15 seconds timeout
  http.setReuse(false); // Don't reuse connections
  
  String url = String(serverURL);
  if (url.endsWith("/")) {
    url = url.substring(0, url.length() - 1);
  }
  
  Serial.println("Connecting to: " + url);
  
  // Begin connection with retry
  bool connected = false;
  for (int attempt = 0; attempt < 3; attempt++) {
    if (http.begin(client, url)) {
      connected = true;
      Serial.println("Connection established!");
      break;
    }
    Serial.print("Connection attempt ");
    Serial.print(attempt + 1);
    Serial.println(" failed, retrying...");
    delay(1000);
  }
  
  if (!connected) {
    Serial.println("ERROR: Failed to establish connection after 3 attempts");
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connection");
    lcd.setCursor(0, 1);
    lcd.print("Failed");
    delay(3000);
    return;
  }
  
  http.addHeader("Content-Type", "application/json");
  http.addHeader("Accept", "application/json");
  http.addHeader("Connection", "close");
  
  // Create JSON payload
  DynamicJsonDocument doc(512);
  doc["rfidCard"] = rfidCard;
  
  String jsonPayload;
  serializeJson(doc, jsonPayload);
  
  Serial.println("Sending: " + jsonPayload);
  Serial.println("Payload length: " + String(jsonPayload.length()));
  
  // Send POST request
  int httpCode = http.POST(jsonPayload);
  
  Serial.print("HTTP Response Code: ");
  Serial.println(httpCode);
  
  if (httpCode > 0) {
    String response = http.getString();
    response.trim();
    
    Serial.println("Response: " + response);
    
    // Check if response is valid JSON
    if (response.length() > 0 && (response.startsWith("{") || response.startsWith("["))) {
      DynamicJsonDocument responseDoc(2048);
      DeserializationError error = deserializeJson(responseDoc, response);
      
      if (!error && responseDoc["success"]) {
        // Success!
        const char* studentName = responseDoc["record"]["studentName"] | "Unknown";
        const char* scanType = responseDoc["record"]["scanType"] | "unknown";
        
        Serial.println("Success! Student: " + String(studentName));
        Serial.println("Scan Type: " + String(scanType));
        
        // Display on LCD
        lcd.clear();
        String name = String(studentName);
        if (name.length() > 16) {
          name = name.substring(0, 13) + "...";
        }
        lcd.setCursor(0, 0);
        lcd.print(name);
        
        if (strcmp(scanType, "timein") == 0) {
          lcd.setCursor(0, 1);
          lcd.print("TIME IN");
        } else if (strcmp(scanType, "timeout") == 0) {
          lcd.setCursor(0, 1);
          lcd.print("TIME OUT");
        } else {
          lcd.setCursor(0, 1);
          lcd.print("Recorded");
        }
        
        delay(3000);
      } else {
        // Error from server
        String errorMsg = "Error";
        String searchedRfid = "";
        
        if (responseDoc.containsKey("error")) {
          errorMsg = responseDoc["error"].as<String>();
        }
        if (responseDoc.containsKey("searchedRfid")) {
          searchedRfid = responseDoc["searchedRfid"].as<String>();
        }
        if (responseDoc.containsKey("message")) {
          errorMsg = responseDoc["message"].as<String>();
        }
        
        Serial.println("Server error: " + errorMsg);
        if (searchedRfid.length() > 0) {
          Serial.println("Searched RFID: " + searchedRfid);
          Serial.println("IMPORTANT: Assign this RFID card to a student in the admin panel!");
        }
        Serial.println("Full response: " + response);
        
        // Display error on LCD - show RFID and error message
        lcd.clear();
        if (searchedRfid.length() > 0) {
          // Show RFID on first line
          String rfidDisplay = "RFID: " + searchedRfid;
          if (rfidDisplay.length() > 16) {
            rfidDisplay = searchedRfid.substring(0, 13) + "...";
          }
          lcd.setCursor(0, 0);
          lcd.print(rfidDisplay);
          
          // Show error on second line
          lcd.setCursor(0, 1);
          lcd.print("Not Found");
        } else {
          // No RFID info, just show error message
          if (errorMsg.length() <= 16) {
            lcd.setCursor(0, 0);
            lcd.print(errorMsg);
          } else {
            String line1 = errorMsg.substring(0, 16);
            String line2 = errorMsg.substring(16, 32);
            lcd.setCursor(0, 0);
            lcd.print(line1);
            lcd.setCursor(0, 1);
            lcd.print(line2);
          }
        }
        delay(5000); // Show error longer
      }
    } else {
      Serial.println("Invalid response format");
      lcd.clear();
      lcd.setCursor(0, 0);
      lcd.print("Invalid Response");
      delay(3000);
    }
  } else {
    // HTTP Error Code -1 usually means connection failed
    Serial.print("HTTP Error Code: ");
    Serial.println(httpCode);
    
    String errorMsg = "";
    if (httpCode == -1) {
      errorMsg = "Connection Failed";
      Serial.println("ERROR: Connection failed. Possible causes:");
      Serial.println("  - Server unreachable");
      Serial.println("  - WiFi connection lost");
      Serial.println("  - SSL/TLS handshake failed");
      Serial.println("  - Timeout");
      
      // Try to reconnect WiFi
      if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi disconnected, attempting reconnect...");
        connectToWiFi();
      }
    } else if (httpCode == -2) {
      errorMsg = "Timeout";
      Serial.println("ERROR: Request timeout");
    } else if (httpCode == -3) {
      errorMsg = "Invalid Response";
      Serial.println("ERROR: Invalid response from server");
    } else {
      errorMsg = "Error " + String(httpCode);
    }
    
    // Try to get error response
    String errorResponse = http.getString();
    if (errorResponse.length() > 0) {
      Serial.println("Error response: " + errorResponse);
    }
    
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(errorMsg);
    lcd.setCursor(0, 1);
    if (httpCode == -1) {
      lcd.print("Check WiFi");
    } else {
      lcd.print("Code: " + String(httpCode));
    }
    delay(3000);
  }
  
  http.end();
  client.stop();
  
  // Small delay before next operation
  delay(100);
}
