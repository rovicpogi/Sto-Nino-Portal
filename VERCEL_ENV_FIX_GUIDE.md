# ✅ COMPLETE VERCEL ENVIRONMENT VARIABLES FIX GUIDE

Based on common issues and best practices, follow this EXACT step-by-step guide.

## 🚨 CRITICAL: Variable Names Must Match EXACTLY

Your code expects these **EXACT** names (case-sensitive, no typos):

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## 📋 STEP-BY-STEP: Setting Variables in Vercel

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Click on your project: `migrate-eight`
3. Go to **Settings** → **Environment Variables**

### Step 2: Clear Existing Variables (if needed)
- If variables exist but aren't working, delete them first
- Click the **delete icon** (minus sign) next to each variable
- Confirm deletion

### Step 3: Add Variables ONE BY ONE

#### Variable 1: NEXT_PUBLIC_SUPABASE_URL
1. Click **"Add Another"** button
2. In **Key** field, type EXACTLY: `NEXT_PUBLIC_SUPABASE_URL`
   - ⚠️ Check for typos: `NEXT_PUBLIC` (not `NEXT_PUBL_TC` or `NEXT_PUBLC`)
3. In **Value** field, paste: `https://ulntyefamkxkbynrugop.supabase.co`
4. **IMPORTANT:** Check the environment checkboxes:
   - ✅ **Production**
   - ✅ **Preview**  
   - ✅ **Development**
5. Click **Save** (the small save icon next to this variable)

#### Variable 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
1. Click **"Add Another"** button again
2. In **Key** field, type EXACTLY: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. In **Value** field, paste the full anon key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk
   ```
   - ⚠️ If it's too long and Vercel glitches:
     - Copy to Notepad first
     - Then copy from Notepad to Vercel
4. Check all three environments: ✅ Production, ✅ Preview, ✅ Development
5. Click **Save**

#### Variable 3: SUPABASE_SERVICE_ROLE_KEY
1. Click **"Add Another"** button again
2. In **Key** field, type EXACTLY: `SUPABASE_SERVICE_ROLE_KEY`
   - ⚠️ Note: NO `NEXT_PUBLIC_` prefix (this is server-only)
3. In **Value** field, paste the full service role key:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYyODA0MSwiZXhwIjoyMDc2MjA0MDQxfQ.tfffewwmTzFzUE5rvchjfVzzI6OPInrpZ4WlIHG_4sw
   ```
   - ⚠️ If it's too long, use Notepad trick
4. Check all three environments: ✅ Production, ✅ Preview, ✅ Development
5. Click **Save**

### Step 4: Final Save
- Scroll to the bottom of the page
- Click the big blue **"Save"** button
- Wait for confirmation

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click **"..."** menu on latest deployment
3. Click **"Redeploy"**
4. Wait 1-2 minutes for deployment

## ✅ VERIFICATION: Check if Variables Are Set

After deployment, visit these URLs:

### 1. Environment Variables Check
```
https://migrate-eight.vercel.app/api/debug/env
```

Expected response:
```json
{
  "success": true,
  "environment": "production",
  "variables": {
    "NEXT_PUBLIC_SUPABASE_URL": { "exists": true },
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": { "exists": true },
    "SUPABASE_SERVICE_ROLE_KEY": { "exists": true }
  },
  "allSet": true
}
```

### 2. Database Health Check
```
https://migrate-eight.vercel.app/api/debug/database
```

Expected response:
```json
{
  "success": true,
  "checks": {
    "environment": {
      "url": true,
      "anonKey": true,
      "serviceKey": true
    },
    "database": {
      "connected": true,
      "attendanceTable": true,
      "studentsTable": true
    }
  }
}
```

### 3. Check Vercel Function Logs
1. Go to **Deployments** → Latest deployment → **View Function Logs**
2. Make a request to `/api/admin/attendance-live`
3. Look for:
   ```
   === ENVIRONMENT VARIABLES DEBUG ===
   URL: SET
   ANON: SET
   SERVICE: SET
   ```
   - If any shows "MISSING" → variable not set correctly

## 🐛 COMMON MISTAKES TO AVOID

### ❌ Mistake 1: Typo in Variable Name
- Wrong: `NEXT_PUBL_TC_SUPABASE_URL`
- Wrong: `NEXT_PUBLC_SUPABASE_URL`
- Wrong: `NEXT_PUBLIC_SUPOBASE_URL`
- ✅ Correct: `NEXT_PUBLIC_SUPABASE_URL`

### ❌ Mistake 2: Forgot to Click "Add Another"
- Typing in fields without clicking "Add Another" first
- Variables won't save

### ❌ Mistake 3: Wrong Environment Selected
- Only selected "Preview" but not "Production"
- Production deployments won't see variables

### ❌ Mistake 4: Forgot Final Save Button
- Added variables but didn't click the big blue "Save" at bottom
- Everything is lost when you leave the page

### ❌ Mistake 5: Using Anon Key in Server Code
- Using `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `/api` routes
- Should use `SUPABASE_SERVICE_ROLE_KEY` for server-side admin operations

## 🔧 CODE FIXES APPLIED

I've fixed the following issues in the codebase:

1. ✅ `app/api/admin/settings/route.ts` - Now uses `getSupabaseAdmin()` instead of anon key
2. ✅ `app/api/admin/students/route.ts` - Now uses `getSupabaseAdmin()` for server-side operations
3. ✅ All API routes use correct environment variable names
4. ✅ Added comprehensive error handling and logging

## 📝 QUICK REFERENCE: Variable Values

Copy these EXACT values:

**NEXT_PUBLIC_SUPABASE_URL:**
```
https://ulntyefamkxkbynrugop.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk
```

**SUPABASE_SERVICE_ROLE_KEY:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYyODA0MSwiZXhwIjoyMDc2MjA0MDQxfQ.tfffewwmTzFzUE5rvchjfVzzI6OPInrpZ4WlIHG_4sw
```

## 🎯 FINAL CHECKLIST

Before considering it fixed:

- [ ] All 3 variables added in Vercel
- [ ] Variable names match EXACTLY (no typos)
- [ ] All 3 environments selected (Production, Preview, Development)
- [ ] Clicked "Save" button at bottom
- [ ] Redeployed application
- [ ] Checked `/api/debug/env` - all variables show as "SET"
- [ ] Checked `/api/debug/database` - database connection works
- [ ] Checked Vercel Function Logs - no "MISSING" errors
- [ ] Tested RFID scanning - works without 500 errors

## 🆘 STILL GETTING 500 ERRORS?

1. **Check Vercel Logs** - Look for specific error messages
2. **Verify Variable Names** - Use `/api/debug/env` endpoint
3. **Check Database** - Use `/api/debug/database` endpoint
4. **Redeploy** - Variables only apply after redeployment

If still not working, share:
- Screenshot of Vercel Environment Variables page
- Output from `/api/debug/env`
- Error from Vercel Function Logs

