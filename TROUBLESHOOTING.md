# 🔧 Troubleshooting Guide

## ✅ Database Tables Created Successfully!

Good news: Your database tables (`Blog` and `Admin`) have been created in your Hostinger MySQL database.

---

## ⚠️ Current Issue: Prisma Client Generation

### Problem
```
EPERM: operation not permitted, rename 'query_engine-windows.dll.node.tmp'
```

This is a Windows file permission issue with Prisma Client generation.

### ✅ Solution 1: Restart Your Computer (Recommended)

The simplest solution:
1. Close all terminals and VS Code
2. Restart your computer
3. Open the project again
4. Run: `npm run dev`

This will release any file locks and allow Prisma to generate properly.

---

### ✅ Solution 2: Close Conflicting Processes

If you can't restart:

1. **Close all Node processes:**
   ```powershell
   # In PowerShell (Run as Administrator)
   Get-Process node | Stop-Process -Force
   ```

2. **Delete node_modules/.prisma folder:**
   ```powershell
   Remove-Item -Recurse -Force node_modules\.prisma
   ```

3. **Regenerate:**
   ```bash
   npx prisma generate
   npm run dev
   ```

---

### ✅ Solution 3: Run as Administrator

1. Close VS Code
2. Right-click VS Code icon
3. Select "Run as Administrator"
4. Open your project
5. Run commands:
   ```bash
   npx prisma generate
   npm run dev
   ```

---

### ✅ Solution 4: Disable Antivirus Temporarily

Sometimes antivirus software blocks file operations:

1. Temporarily disable Windows Defender or your antivirus
2. Run: `npx prisma generate`
3. Re-enable antivirus
4. Run: `npm run dev`

---

## 🎯 Quick Fix Commands

Try these in order:

```powershell
# 1. Stop all Node processes
taskkill /F /IM node.exe

# 2. Clean Prisma cache
Remove-Item -Recurse -Force node_modules\.prisma -ErrorAction SilentlyContinue

# 3. Generate Prisma Client
npx prisma generate

# 4. Start dev server
npm run dev
```

---

## ✅ Verify Database Tables Exist

Your tables were created successfully. You can verify:

### Option 1: Using Prisma Studio
```bash
npx prisma studio
```
Opens at: http://localhost:5555

### Option 2: Using MySQL Command
```bash
mysql -h srv1753.hstgr.io -u u569154749_StockologyDB -p
# Password: Stockology@123

# Then run:
USE u569154749_stockologyDB;
SHOW TABLES;
```

You should see:
- `Admin`
- `Blog`

---

## 🚀 After Prisma Client is Generated

Once the Prisma Client generates successfully:

### 1. Create Admin User
```bash
# Make sure dev server is running
npm run dev

# In new terminal or browser:
curl -X POST http://localhost:3000/api/auth/setup
```

### 2. Login
- Open: http://localhost:3000/admin/login
- Email: `stockology@gmail.com`
- Password: `Xmv02441!`

---

## 🐛 Common Errors & Solutions

### Error: "Admin table does not exist"
**Status**: ✅ FIXED - Tables created via `npx prisma db push`

### Error: "Cannot connect to database"
**Solution**:
```bash
# Test connection
npx prisma db pull

# If fails, edit .env and try IP address:
DATABASE_URL="mysql://u569154749_StockologyDB:Stockology@123@193.203.184.192:3306/u569154749_stockologyDB"
```

### Error: "Port 3000 already in use"
**Solution**:
```bash
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- -p 3001
```

### Error: "Module not found: @prisma/client"
**Solution**:
```bash
npm install @prisma/client
npx prisma generate
```

### Error: "Invalid credentials"
**Solution**:
Make sure admin user is created first:
```bash
curl -X POST http://localhost:3000/api/auth/setup
```

---

## 🔍 Check Current Status

### Database Status
```bash
# Check if tables exist
npx prisma db pull
# Should succeed without errors
```

### Prisma Client Status
```bash
# Check if client is generated
dir node_modules\.prisma\client
# Should show files
```

### Dev Server Status
```bash
# Check if running
curl http://localhost:3000
# Should return HTML or JSON
```

---

## 📋 Complete Reset (If Nothing Works)

If all else fails, complete reset:

```powershell
# 1. Stop all processes
taskkill /F /IM node.exe

# 2. Delete node_modules
Remove-Item -Recurse -Force node_modules

# 3. Delete package-lock.json
Remove-Item package-lock.json

# 4. Clean npm cache
npm cache clean --force

# 5. Reinstall
npm install

# 6. Generate Prisma Client
npx prisma generate

# 7. Verify database
npx prisma db pull

# 8. Start server
npm run dev
```

---

## 🎯 Current Status Summary

✅ **Database**: Connected and tables created  
⚠️ **Prisma Client**: Generation blocked by file permissions  
⏳ **Dev Server**: Waiting for Prisma Client  
⏳ **Admin User**: Pending creation  

---

## 💡 Recommended Next Steps

1. **Try Solution 1**: Restart your computer (easiest)
2. **If that doesn't work**: Try Solution 2 (close processes)
3. **If still issues**: Try Solution 3 (run as admin)
4. **Last resort**: Complete reset

---

## 📞 Additional Help

### Check Logs
```bash
# Check npm logs
npm run dev --verbose

# Check Prisma logs
npx prisma --version
npx prisma validate
```

### Verify Installation
```bash
# Check Node version
node --version
# Should be 18+

# Check npm version
npm --version

# Check Prisma version
npx prisma --version
```

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ `npx prisma generate` completes without errors
2. ✅ `npm run dev` starts successfully
3. ✅ Can access http://localhost:3000
4. ✅ Can create admin user at `/api/auth/setup`
5. ✅ Can login at `/admin/login`

---

## 🎉 Almost There!

Your database is set up correctly. Just need to resolve the Prisma Client generation issue, then you're ready to go!

**Recommended**: Restart your computer and try again. This resolves 90% of file permission issues on Windows.

---

**Last Updated**: 2025-10-13  
**Status**: Database ✅ | Prisma Client ⚠️ | Ready to fix!
