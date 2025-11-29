# ESP32 Error -11: Connection Refused - Troubleshooting Guide

## What Error -11 Means
**Error -11 = "Connection Refused"** - The ESP32 cannot connect to your Next.js server.

## Quick Fix Checklist

### 1. ✅ Check if Next.js Server is Running
```bash
# In your project folder (C:\xampp\htdocs\capstone_Main)
npm run dev
```

**Expected output:**
```
✓ Ready on http://localhost:3000
```

If you don't see this, the server is NOT running!

### 2. ✅ Verify Your PC's IP Address

**On Windows:**
1. Open Command Prompt (CMD)
2. Type: `ipconfig`
3. Look for **"IPv4 Address"** under your WiFi adapter
4. It should look like: `192.168.1.x` or `192.168.0.x`

**Current ESP32 setting:**
```cpp
const char* serverURL = "http://192.168.1.9:3000/api/admin/attendance-live";
```

**If your IP is different (e.g., 192.168.1.10), update `RFID.ino` line 44:**
```cpp
const char* serverURL = "http://192.168.1.10:3000/api/admin/attendance-live";
```

### 3. ✅ Test Server in Browser

Open this URL in your browser:
```
http://192.168.1.9:3000/api/admin/attendance-live
```

**If it works:** You should see JSON response (even if it's an error, it means server is running)
**If it doesn't work:** Server is not accessible at that IP/port

### 4. ✅ Check Windows Firewall

**Option A: Allow Port 3000**
1. Open Windows Defender Firewall
2. Advanced Settings → Inbound Rules → New Rule
3. Port → TCP → Specific local ports: `3000`
4. Allow the connection

**Option B: Temporarily Disable Firewall (for testing only)**
1. Windows Security → Firewall & network protection
2. Turn off firewall for Private network (temporarily)
3. Test ESP32 connection
4. Re-enable firewall after testing

### 5. ✅ Verify ESP32 and PC are on Same Network

**Check ESP32 IP:**
- Look at Serial Monitor output
- Should show: `WiFi IP: 192.168.1.x` (same subnet as PC)

**Check PC IP:**
- Run `ipconfig` in CMD
- Should be: `192.168.1.x` (same subnet as ESP32)

**If different subnets (e.g., ESP32: 192.168.1.x, PC: 192.168.0.x):**
- They're on different networks
- Connect both to the same WiFi network

### 6. ✅ Alternative: Use Vercel Deployment

If local server keeps failing, switch to Vercel:

**In `RFID.ino`, change line 44-47:**
```cpp
// Comment out local server:
// const char* serverURL = "http://192.168.1.9:3000/api/admin/attendance-live";

// Uncomment Vercel:
const char* serverURL = "https://migrate-eight.vercel.app/api/admin/attendance-live";
```

**Note:** Vercel is slower but more reliable for remote access.

## Common Issues & Solutions

### Issue: "Server Not Running"
**Solution:** Run `npm run dev` in project folder

### Issue: "Wrong IP Address"
**Solution:** 
1. Run `ipconfig` to get your PC's IP
2. Update `serverURL` in `RFID.ino`

### Issue: "Firewall Blocking"
**Solution:** Allow port 3000 in Windows Firewall

### Issue: "Different Networks"
**Solution:** Connect ESP32 and PC to the same WiFi network

### Issue: "Port 3000 Already in Use"
**Solution:**
```bash
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Then restart Next.js
npm run dev
```

## Testing Steps

1. **Start Next.js server:**
   ```bash
   cd C:\xampp\htdocs\capstone_Main
   npm run dev
   ```

2. **Verify server is accessible:**
   - Open browser: `http://localhost:3000/api/admin/attendance-live`
   - Should see JSON response

3. **Check your PC's IP:**
   ```bash
   ipconfig
   ```

4. **Update ESP32 code if needed:**
   - Edit `RFID.ino` line 44
   - Change IP to match your PC's IP
   - Upload to ESP32

5. **Test ESP32 connection:**
   - Open Serial Monitor (115200 baud)
   - Look for connection success message

## Still Not Working?

1. **Check Serial Monitor output** - It shows detailed error messages
2. **Try Vercel URL** - More reliable for remote access
3. **Restart everything:**
   - Restart Next.js server
   - Restart ESP32
   - Restart WiFi router (if needed)

## Quick Test Command

**Test if server is accessible from ESP32's network:**
```bash
# On your PC, test if port 3000 is listening
netstat -an | findstr :3000
```

Should show: `TCP    0.0.0.0:3000    LISTENING`

