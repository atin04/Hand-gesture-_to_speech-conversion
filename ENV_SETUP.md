# Environment Setup Guide

Complete guide to setting up your development environment for the Sign Language to Text Recognition application.

## Table of Contents

1. [Node.js Installation](#nodejs-installation)
2. [Project Setup](#project-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Environment Variables](#environment-variables)
5. [Database Setup](#database-setup)
6. [Troubleshooting](#troubleshooting)

## Node.js Installation

### Windows

1. **Download Node.js:**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS (Long Term Support) version
   - Choose Windows Installer (.msi)

2. **Run Installer:**
   - Double-click the downloaded file
   - Follow installation wizard
   - Accept license agreement
   - Keep default installation path
   - Ensure "npm package manager" is checked
   - Click Install

3. **Verify Installation:**
   - Open Command Prompt
   - Run: `node --version`
   - Run: `npm --version`
   - Both should display version numbers

### macOS

#### Using Official Installer

1. **Download Node.js:**
   - Visit [nodejs.org](https://nodejs.org/)
   - Download the LTS version for macOS
   - Choose .pkg file

2. **Install:**
   - Open the downloaded .pkg file
   - Follow installation wizard
   - Enter password when prompted

3. **Verify:**
   - Open Terminal
   - Run: `node --version`
   - Run: `npm --version`

#### Using Homebrew (Recommended)

1. **Install Homebrew** (if not already installed):
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. **Install Node.js:**
```bash
brew install node
```

3. **Verify:**
```bash
node --version
npm --version
```

### Linux (Ubuntu/Debian)

1. **Update package manager:**
```bash
sudo apt update
```

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Verify:**
```bash
node --version
npm --version
```

### Linux (Fedora/RHEL)

1. **Install Node.js:**
```bash
curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
sudo dnf install -y nodejs
```

2. **Verify:**
```bash
node --version
npm --version
```

## Project Setup

### 1. Extract Project Files

**Windows:**
- Right-click the project ZIP file
- Select "Extract All"
- Choose destination folder
- Click Extract

**macOS:**
- Double-click the ZIP file
- File will extract automatically

**Linux:**
```bash
unzip sign-language-app.zip
cd sign-language-app
```

### 2. Open in Code Editor

We recommend Visual Studio Code:

**Download VS Code:**
- Visit [code.visualstudio.com](https://code.visualstudio.com/)
- Download for your operating system
- Install and launch

**Open Project:**
- File → Open Folder
- Navigate to project folder
- Click Select Folder

### 3. Open Terminal

**VS Code:**
- Terminal → New Terminal (or `` Ctrl+` ``)

**Or use system terminal:**
- Navigate to project folder
- Windows: Shift + Right-click → Open PowerShell
- macOS: Terminal app
- Linux: Terminal app

### 4. Install Dependencies

```bash
npm install
```

This will:
- Download all required packages
- Install React, TypeScript, Vite
- Set up TailwindCSS
- Install MediaPipe and TensorFlow
- Configure Supabase client

**Expected output:**
```
added 237 packages in 45s
```

## Supabase Configuration

### 1. Create Supabase Account

1. Visit [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub, Google, or email
4. Verify your email

### 2. Create New Project

1. Click "New Project"
2. Choose organization (or create one)
3. Fill in project details:
   - **Name:** sign-language-app (or your choice)
   - **Database Password:** Strong password (save this!)
   - **Region:** Choose closest to your users
   - **Pricing Plan:** Free tier is sufficient

4. Click "Create new project"
5. Wait 2-3 minutes for setup

### 3. Get API Keys

1. Go to Project Settings (gear icon)
2. Click "API" in sidebar
3. You'll see:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** Long string starting with `eyJ...`

4. **Copy these values** - you'll need them next

### 4. Configure Project Security

1. Go to Authentication → URL Configuration
2. Add Site URL: `http://localhost:5173` (for development)
3. Add Redirect URLs: `http://localhost:5173/**`
4. Save changes

## Environment Variables

### 1. Locate .env File

The project includes a `.env` file in the root directory.

**If missing, create it:**

**Windows:**
- Right-click in VS Code Explorer
- New File → `.env`

**macOS/Linux:**
```bash
touch .env
```

### 2. Configure .env File

Open `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

**Replace:**
- `your-project-id` with your actual Supabase project URL
- `your-anon-key-here` with your actual anon key

**Example:**
```env
VITE_SUPABASE_URL=https://xyzabcdef123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emFiY2RlZjEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjk4NzAwMDAwLCJleHAiOjIwMTQyNzYwMDB9.abcdefghijklmnopqrstuvwxyz1234567890
```

### 3. Important Notes

- **Never commit `.env` to version control**
- **Keep keys private and secure**
- **.env is listed in .gitignore** (already configured)
- **Restart dev server** after changing .env

## Database Setup

### 1. Apply Database Migration

The project includes a migration file that creates all necessary tables.

**Method 1: Automatic (Recommended)**

The migration runs automatically when you start the app for the first time. No action needed.

**Method 2: Manual**

1. Go to Supabase Dashboard
2. Click "SQL Editor"
3. Open `supabase/migrations/20251115063720_create_sign_language_sessions.sql`
4. Copy entire contents
5. Paste into Supabase SQL Editor
6. Click "Run"

### 2. Verify Database Setup

1. Go to Supabase Dashboard
2. Click "Table Editor"
3. You should see three tables:
   - `user_preferences`
   - `sign_language_sessions`
   - `gesture_logs`

### 3. Test Database Connection

1. Start the development server: `npm run dev`
2. Open the application
3. Click "Start Camera"
4. Check browser console for errors
5. No database errors = successful connection

## Starting the Application

### 1. Start Development Server

```bash
npm run dev
```

**Expected output:**
```
  VITE v5.4.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. Open in Browser

- Hold Ctrl (Cmd on Mac) and click the URL
- Or manually open `http://localhost:5173`

### 3. Grant Camera Permissions

- Browser will prompt for camera access
- Click "Allow"
- Camera feed should appear

### 4. Test Gesture Recognition

- Click "Start Camera"
- Make an ASL gesture (try "I" - pinky up)
- Hold steady for 1 second
- Letter should appear in text output

## Troubleshooting

### Node.js Issues

**"node: command not found"**
- Node.js not installed or not in PATH
- Reinstall Node.js
- Restart terminal/computer

**"npm: command not found"**
- npm should come with Node.js
- Reinstall Node.js with npm option checked

**Version too old**
- Requires Node.js 16+
- Update to latest LTS version

### Installation Issues

**"npm install" fails**
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Permission errors (Linux/Mac)**
```bash
# Don't use sudo, fix permissions instead
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config
```

**Network errors**
```bash
# Use different registry
npm config set registry https://registry.npmjs.org/
npm install
```

### Supabase Issues

**Can't find API keys**
- Go to Project Settings → API
- Keys are at the top of the page
- Use "anon public" key, not "service_role"

**"Failed to fetch" errors**
- Check `.env` file exists
- Verify URL and key are correct
- Ensure no extra spaces in values
- Restart dev server

**Database connection fails**
- Verify project is active in Supabase
- Check internet connection
- Confirm URL format is correct
- Review browser console for details

### Camera Issues

**Camera not working**
- Grant permissions when prompted
- Check camera isn't used by other apps
- Try different browser (Chrome recommended)
- Verify camera works in other applications

**HTTPS required error**
- localhost should work with http
- For network access, use HTTPS
- Or use `127.0.0.1` instead of IP address

### Application Issues

**Port 5173 already in use**
```bash
# Use different port
npm run dev -- --port 3000
```

**Blank page**
- Check browser console for errors
- Verify all dependencies installed
- Clear browser cache
- Try incognito/private mode

**Build fails**
```bash
# Check for TypeScript errors
npm run typecheck

# Verify build
npm run build
```

## Environment Check Script

Save this as `check-env.js` and run with `node check-env.js`:

```javascript
const fs = require('fs');
const { execSync } = require('child_process');

console.log('Checking environment...\n');

// Check Node.js version
try {
  const nodeVersion = execSync('node --version').toString().trim();
  console.log(`✓ Node.js: ${nodeVersion}`);
} catch (e) {
  console.log('✗ Node.js: Not installed');
}

// Check npm version
try {
  const npmVersion = execSync('npm --version').toString().trim();
  console.log(`✓ npm: ${npmVersion}`);
} catch (e) {
  console.log('✗ npm: Not installed');
}

// Check .env file
if (fs.existsSync('.env')) {
  console.log('✓ .env file: Found');
  const envContent = fs.readFileSync('.env', 'utf8');
  if (envContent.includes('VITE_SUPABASE_URL') && envContent.includes('VITE_SUPABASE_ANON_KEY')) {
    console.log('✓ Environment variables: Configured');
  } else {
    console.log('✗ Environment variables: Missing or incomplete');
  }
} else {
  console.log('✗ .env file: Not found');
}

// Check node_modules
if (fs.existsSync('node_modules')) {
  console.log('✓ Dependencies: Installed');
} else {
  console.log('✗ Dependencies: Not installed (run npm install)');
}

console.log('\nEnvironment check complete!');
```

## Next Steps

Once setup is complete:

1. **Read the README.md** - Full usage instructions
2. **Practice ASL alphabet** - Learn the hand positions
3. **Test gestures** - Try all 26 letters
4. **Explore settings** - Adjust confidence threshold
5. **Check DEPLOYMENT.md** - When ready to deploy

## Additional Resources

### Documentation
- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)

### Learning Resources
- [ASL Alphabet Chart](https://www.startasl.com/american-sign-language-alphabet/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community Support
- [Supabase Discord](https://discord.supabase.com/)
- [Vite Discord](https://chat.vitejs.dev/)
- [React Community](https://react.dev/community)

---

**Need help?** Review the troubleshooting section or check the README.md for additional guidance.
