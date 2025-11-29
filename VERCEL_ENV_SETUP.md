# How to Set Environment Variables in Vercel

## Step-by-Step Instructions

### Method 1: Using Vercel Dashboard (Recommended)

1. **Go to your Vercel project dashboard**
   - Visit https://vercel.com/dashboard
   - Select your project: `migrate-eight` (or your project name)

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab (left sidebar)
   - Click on **Environment Variables** (under "Configuration")

3. **Add/Edit Variables**
   - You should see three variables already listed:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `SUPABASE_SERVICE_ROLE_KEY`

4. **If variables are missing or need to be updated:**
   - Click **"Add Another"** button (or click the edit icon next to existing variable)
   - Enter the **Key** (variable name)
   - Enter the **Value** (paste the full value)
   - **IMPORTANT:** Make sure to select the correct **Environment**:
     - ✅ **Production** (for live site)
     - ✅ **Preview** (for preview deployments)
     - ✅ **Development** (for local development)
   - Click **Save**

5. **After adding/editing variables:**
   - Click the **"Save"** button at the bottom of the page
   - **Redeploy your application** for changes to take effect:
     - Go to **Deployments** tab
     - Click the **"..."** menu on the latest deployment
     - Select **"Redeploy"**

### Method 2: Using Vercel CLI

If you have Vercel CLI installed:

```bash
# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY

# Pull environment variables to local .env file
vercel env pull .env.local
```

### Method 3: Import from .env file

1. Create a `.env.local` file in your project root with:
```
NEXT_PUBLIC_SUPABASE_URL=https://ulntyefamkxkbynrugop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. In Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Click **"Import .env"** button
   - Paste the contents of your `.env.local` file
   - Click **Save**

## Required Environment Variables

### 1. NEXT_PUBLIC_SUPABASE_URL
```
https://ulntyefamkxkbynrugop.supabase.co
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MjgwNDEsImV4cCI6MjA3NjIwNDA0MX0.TnL8jfBVJD8Z0N5rFl_KFhAku8zxiy2fFvztBDYHaWk
```

### 3. SUPABASE_SERVICE_ROLE_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsbnR5ZWZhbWt4a2J5bnJ1Z29wIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDYyODA0MSwiZXhwIjoyMDc2MjA0MDQxfQ.tfffewwmTzFzUE5rvchjfVzzI6OPInrpZ4WlIHG_4sw
```

## Troubleshooting

### Issue: "No environment variables were created" message
- This is a UI bug in Vercel. If you see variables listed, they ARE set.
- Try refreshing the page
- Check if variables are actually working by checking your deployment logs

### Issue: Can't edit variables
- Make sure you have **Owner** or **Admin** permissions on the project
- Try deleting and re-adding the variable
- Check if you're in the correct project

### Issue: Variables not working after setting
- **Redeploy your application** after setting variables
- Variables are only available after a new deployment
- Check deployment logs to see if variables are being read correctly

### Issue: Variables work locally but not on Vercel
- Make sure you selected **Production** environment when adding variables
- Check that variable names match exactly (case-sensitive)
- Verify no extra spaces or quotes in the values

## Verify Variables Are Set

After setting variables and redeploying, check:
1. Go to **Deployments** → Click on latest deployment → **View Function Logs**
2. Look for any errors about missing environment variables
3. Test your API endpoints to see if they work

## Quick Copy-Paste Values

If you need to quickly copy the values, here they are:

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

