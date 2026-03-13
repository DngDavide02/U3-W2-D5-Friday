# Quick Setup Guide

## 🚨 Current Issue
The imports are failing because dependencies haven't been installed yet.

## 🔧 Solution Steps

### Step 1: Install Dependencies
**Choose ONE of these methods:**

**Method A: Double-click the install script**
- Find `install.bat` in your project folder
- Double-click it to run

**Method B: Command Line**
```cmd
cd "c:\Users\dange\Desktop\coding\coding\EPICODE\Front-End\Esercizi\U3-W2\U3-W2-D5-Friday"
npm install
```

**Method C: PowerShell**
```powershell
Set-Location "c:\Users\dange\Desktop\coding\coding\EPICODE\Front-End\Esercizi\U3-W2\U3-W2-D5-Friday"
npm install
```

**Method D: VS Code Terminal**
1. Open VS Code
2. Press `Ctrl + \` (backtick) to open terminal
3. Run: `npm install`

### Step 2: Set Up Environment
```cmd
copy .env.example .env
```

### Step 3: Start Development
```cmd
npm run dev
```

## ✅ What This Fixes
- ✅ `@tanstack/react-query` import errors
- ✅ `@heroicons/react` import errors  
- ✅ `axios` import errors
- ✅ `tailwindcss` styling issues
- ✅ All other dependency-related errors

## 🎯 After Installation
You'll see a modern weather app with:
- Beautiful UI with TailwindCSS
- Smooth animations with Framer Motion
- Professional error handling
- Responsive design
- Modern React architecture

## 📞 If Issues Persist
1. Make sure Node.js is installed (v18+)
2. Try deleting `node_modules` and `package-lock.json`
3. Run `npm cache clean --force`
4. Run `npm install` again

The modernized app will work perfectly once dependencies are installed! 🌟
