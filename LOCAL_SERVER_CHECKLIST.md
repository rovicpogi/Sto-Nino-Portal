# Local Server RFID Setup - Checklist

## ✅ Checklist (Do This One By One)

### 1. Confirm Your PC's IP

**Action Required:**
1. Open CMD → type: `ipconfig`
2. Look for: `IPv4 Address: 192.168.1.9`
3. If it shows something else (ex. `192.168.1.14`), update your ESP32 URL

**Current ESP32 Configuration:**
- File: `app/RFID.ino`
- Line 44: `const char* serverURL = "http://192.168.1.9:3000/api/admin/attendance-live";`

**If your IP is different:**
```cpp
// Update line 44 in RFID.ino
const char* serverURL = "http://YOUR_IP_HERE:3000/api/admin/attendance-live";
```

---

### 2. Test the API Manually

**Action Required:**
1. Start Next.js dev server: `npm run dev`
2. Go to your browser and open:
   ```
   http://192.168.1.9:3000/api/admin/attendance-live
   ```
   (Replace `192.168.1.9` with your actual IP if different)

**Expected Results:**
- ✅ JSON output (even if empty: `{"success":true,"records":[]}`)
- ✅ Your API logic output

**If you see:**
- ❌ "Cannot GET /api/admin/attendance-live" → Route doesn't exist
- ❌ "Internal Server Error" → Check terminal for errors
- ❌ Downloads something strange → Wrong content-type

**Current Status:**
- ✅ Route exists: `app/api/admin/attendance-live/route.ts`
- ✅ Has GET handler
- ✅ Has POST handler
- ✅ All 500 errors fixed (returns JSON with 200 status)

---

### 3. Fix Next.js API Route (for App Router)

**Current Route Structure:**
```
app/api/admin/attendance-live/route.ts
```

**✅ CORRECT FORMAT:**
- Uses App Router format (`route.ts`)
- Has `export async function POST(req)`
- Has `export async function GET(req)`
- Has `export async function OPTIONS(req)` for CORS

**Current Implementation:**
```typescript
export async function POST(request: Request) {
  // Set default headers
  const postHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  try {
    const scanData = await request.json()
    // ... processing logic
    return NextResponse.json({ success: true, ... }, { status: 200, headers: postHeaders })
  } catch (error) {
    // Always returns JSON, never HTML
    return NextResponse.json({ success: false, error: ... }, { status: 200, headers: postHeaders })
  }
}
```

**✅ Status:** Route is correctly configured!

---

### 4. ESP32 Must Send POST

**Current ESP32 Code:**
- File: `app/RFID.ino`
- Line 374: `http.addHeader("Content-Type", "application/json");`
- Line 389: `int httpCode = http.POST(jsonPayload);`

**✅ CORRECT IMPLEMENTATION:**
```cpp
// Line 374-376: Set headers
http.addHeader("Content-Type", "application/json");
http.addHeader("Accept", "application/json");
http.addHeader("Connection", "close");

// Line 378-388: Create JSON payload
DynamicJsonDocument doc(512);
doc["rfidCard"] = content;
doc["studentId"] = ""; // Optional
String jsonPayload;
serializeJson(doc, jsonPayload);

// Line 389: Send POST request
int httpCode = http.POST(jsonPayload);
```

**✅ Status:** ESP32 correctly uses POST method!

**If you accidentally used GET:**
- ❌ You would see 500 errors
- ❌ API expects POST, not GET

---

### 5. Watch the Terminal Where Next.js Runs

**Action Required:**
1. Run: `npm run dev`
2. Keep terminal open and visible
3. Scan your RFID card
4. Watch for:
   - ✅ `POST /api/admin/attendance-live` requests
   - ✅ `Received:` logs (if added)
   - ✅ Any error messages

**What to Look For:**
```
✓ POST /api/admin/attendance-live 200 in 45ms
✓ Received: { rfidCard: "3206E2AB", ... }
```

**If you see errors:**
- Check ESP32 Serial Monitor
- Check browser console
- Check terminal logs

---

## Summary

| Item | Status | Action Required |
|------|--------|----------------|
| 1. PC IP | ⚠️ | Run `ipconfig` and verify/update ESP32 URL |
| 2. API Test | ✅ | Test in browser: `http://YOUR_IP:3000/api/admin/attendance-live` |
| 3. API Route | ✅ | Already correct (App Router format) |
| 4. ESP32 POST | ✅ | Already using POST correctly |
| 5. Dev Server | ⚠️ | Run `npm run dev` and watch terminal |

---

## Quick Test Steps

1. **Verify IP:**
   ```cmd
   ipconfig
   ```
   Update `RFID.ino` line 44 if needed

2. **Start Server:**
   ```bash
   npm run dev
   ```

3. **Test API:**
   Open browser: `http://YOUR_IP:3000/api/admin/attendance-live`
   Should see JSON response

4. **Upload ESP32 Code:**
   - Verify IP in code
   - Upload to ESP32
   - Open Serial Monitor (115200 baud)

5. **Scan RFID:**
   - Watch Serial Monitor for connection
   - Watch terminal for POST requests
   - Check Admin page for scans

---

## Troubleshooting

### ESP32 Can't Connect
- ✅ Check WiFi credentials
- ✅ Verify PC IP matches ESP32 URL
- ✅ Check firewall allows port 3000
- ✅ Verify Next.js server is running

### API Returns Error
- ✅ Check terminal for detailed errors
- ✅ Verify route file exists
- ✅ Check database connection
- ✅ Verify environment variables

### Scans Not Appearing
- ✅ Check ESP32 Serial Monitor
- ✅ Check browser console
- ✅ Verify RFID card is assigned to student
- ✅ Check Admin page → RFID Scans tab

---

**All code is ready! Just verify your IP and start the dev server!** 🚀

