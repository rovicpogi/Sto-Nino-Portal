# ESP32 RFID Attendance System

## Hardware Requirements

- ESP32 Development Board
- RC522 RFID Reader Module
- I2C LCD Display (16x2)
- Jumper Wires
- Breadboard (optional)

## Pin Connections

### RC522 RFID Module
- **GPIO 5** → RC522 SDA/SS
- **GPIO 4** → RC522 RST
- **GPIO 18** → RC522 SCK
- **GPIO 23** → RC522 MOSI
- **GPIO 19** → RC522 MISO
- **3.3V** → RC522 VCC
- **GND** → RC522 GND

### I2C LCD Display
- **GPIO 21** → LCD SDA
- **GPIO 22** → LCD SCL
- **5V or 3.3V** → LCD VCC
- **GND** → LCD GND

## Required Libraries

Install these libraries in Arduino IDE:

1. **WiFi** (built-in)
2. **HTTPClient** (built-in)
3. **SPI** (built-in)
4. **MFRC522** by GithubCommunity
   - Install via: Tools → Manage Libraries → Search "MFRC522"
5. **LiquidCrystal_I2C** by Frank de Brabander
   - Install via: Tools → Manage Libraries → Search "LiquidCrystal_I2C"
6. **ArduinoJson** by Benoit Blanchon
   - Install via: Tools → Manage Libraries → Search "ArduinoJson"

## Configuration

Before uploading, update these values in the code:

```cpp
// WiFi Credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// Server URL (Change to your server IP/domain)
const char* serverURL = "http://your-server-ip:3000/api/admin/attendance-live";

// LCD I2C Address (common: 0x27 or 0x3F)
LiquidCrystal_I2C lcd(0x27, 16, 2); // Change if needed
```

## How to Find LCD I2C Address

1. Upload an I2C scanner sketch
2. Open Serial Monitor
3. Look for the LCD address in the output

## Features

- ✅ Automatic Time In/Time Out detection
- ✅ Student information display on LCD
- ✅ Real-time sync with web server
- ✅ WiFi auto-reconnect
- ✅ Duplicate scan prevention
- ✅ Error handling and display

## How It Works

1. **Card Detection**: ESP32 continuously scans for RFID cards
2. **Card Read**: When a card is detected, it reads the UID
3. **Server Communication**: Sends POST request to `/api/admin/attendance-live` with RFID card number
4. **Time In/Out Logic**: Server automatically determines if it's time in or time out
5. **Display**: Shows student information on LCD and updates web display

## API Endpoint

The code sends POST requests to:
```
POST /api/admin/attendance-live
Content-Type: application/json

{
  "rfidCard": "ABC123DEF456"
}
```

## Troubleshooting

### WiFi Connection Issues
- Check SSID and password
- Ensure 2.4GHz WiFi (ESP32 doesn't support 5GHz)
- Check signal strength

### LCD Not Displaying
- Check I2C address (try 0x27 or 0x3F)
- Verify SDA/SCL connections
- Check power supply

### RFID Not Reading
- Verify SPI connections
- Check RC522 power (3.3V)
- Ensure card is close enough to reader

### Server Connection Failed
- Verify server URL is correct
- Check if server is running
- Ensure ESP32 and server are on same network
- Check firewall settings

## Testing

1. Upload code to ESP32
2. Open Serial Monitor (115200 baud)
3. Scan an RFID card
4. Check Serial Monitor for debug information
5. Verify data appears on web display at `/admin/rfid-display`

## Notes

- Minimum 2 seconds between scans (prevents duplicate reads)
- Same card can't be scanned again within 5 seconds
- System automatically handles time in/time out based on daily records
- LCD shows student name, grade, section, and scan type (IN/OUT)

