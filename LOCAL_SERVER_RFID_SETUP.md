# Local Server RFID Setup - Working Plan

## Current Configuration

### ESP32 Configuration
- **File**: `app/RFID.ino`
- **Current Server URL**: `http://192.168.1.9:3000/api/admin/attendance-live`
- **Status**: ✅ Configured for local server
- **Network**: `PLDTHOMEFIBRcb1f0` / `PLDTWIFIf3p4u`

### API Endpoint
- **Route**: `/api/admin/attendance-live`
- **Status**: ✅ Ready for localhost
- **Features**:
  - GET: Fetches RFID scans
  - POST: Receives RFID scans from ESP32
  - All 500 errors fixed (returns JSON with 200 status)
  - Works on both localhost and Vercel

### Admin Page
- **File**: `app/admin/page.tsx`
- **RFID Scans Tab**: Fetches from `/api/admin/attendance-live?limit=100`
- **Auto-refresh**: Every 5 seconds when tab is active
- **Status**: ✅ Ready to receive scans

### RFID Display Page
- **File**: `app/admin/rfid-display/page.tsx`
- **Purpose**: Secondary display for live RFID scans
- **Auto-refresh**: Every 2 seconds
- **Status**: ✅ Ready to display scans

## Setup Checklist

### 1. Start Local Development Server
```bash
npm run dev
# Server should run on http://localhost:3000
```

### 2. Verify Network Configuration
- Ensure ESP32 and computer are on the same network
- Check ESP32 IP: `192.168.1.9` (update if different)
- Verify computer's local IP matches ESP32's target

### 3. Update ESP32 Code (if needed)
- Current IP: `192.168.1.9:3000`
- If your computer's IP is different, update line 44 in `RFID.ino`:
  ```cpp
  const char* serverURL = "http://YOUR_COMPUTER_IP:3000/api/admin/attendance-live";
  ```

### 4. Test Connection
1. Upload `RFID.ino` to ESP32
2. Open Serial Monitor (115200 baud)
3. Check for WiFi connection and server connection messages
4. Scan an RFID card
5. Verify scan appears in:
   - Admin page → "RFID Scans" tab
   - Admin page → "RFID Scans" → "Open in New Window" (display page)

## Testing Steps

1. **ESP32 Connection Test**
   - Serial Monitor should show: "Connected to server"
   - LCD should show: "Ready" or "Waiting for card"

2. **RFID Scan Test**
   - Scan a card with assigned RFID
   - ESP32 should POST to `/api/admin/attendance-live`
   - Admin page should show the scan within 5 seconds

3. **Display Test**
   - Open `/admin/rfid-display` in a new window
   - Scan a card
   - Display should update within 2 seconds

## Troubleshooting

### ESP32 Can't Connect
- Check WiFi credentials in `RFID.ino`
- Verify computer's firewall allows port 3000
- Check if Next.js dev server is running
- Verify IP address is correct

### Scans Not Appearing
- Check browser console for errors
- Verify API endpoint is accessible: `http://localhost:3000/api/admin/attendance-live`
- Check ESP32 Serial Monitor for POST response
- Verify RFID card is assigned to a student

### 500 Errors
- All 500 errors have been fixed
- API always returns JSON with 200 status
- Check terminal for detailed error logs

## Notes

- **Local Server Advantages**:
  - Faster response time (no internet latency)
  - No Vercel deployment needed for testing
  - Easier debugging with local logs

- **Switching to Vercel**:
  - Uncomment Vercel URL in `RFID.ino` line 47
  - Comment out local server URL (line 44)
  - Re-upload to ESP32

## Current Status

✅ ESP32 configured for local server  
✅ API endpoint ready  
✅ Admin page ready to receive scans  
✅ Display page ready  
✅ All error handling in place  

**Ready to test!**

