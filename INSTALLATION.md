# Installation Guide

## Quick Start

### Requirements
- Node.js 16+ ([Download here](https://nodejs.org))
- Modern web browser (Chrome, Edge, or Firefox)
- Webcam

### Installation Steps

1. **Extract the project:**
   ```bash
   # On Mac/Linux
   tar -xzf sign-language-app-complete.tar.gz
   cd project

   # On Windows
   # Use 7-Zip or WinRAR to extract
   # Then navigate to the project folder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will take 2-3 minutes.

3. **Start the application:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Go to `http://localhost:5173`
   - Allow camera permissions when prompted

## VS Code Setup

1. Open VS Code
2. File → Open Folder → Select the extracted `project` folder
3. Open Terminal (Ctrl + `)
4. Run: `npm install`
5. Run: `npm run dev`
6. Ctrl+Click the localhost URL

## What You Get

- Real-time ASL alphabet recognition (A-Z)
- SPACE gesture (open hand)
- DELETE gesture (closed fist)
- Save text to file
- Professional desktop-style interface

## Troubleshooting

**Camera not working?**
- Allow camera permissions in browser
- Check no other app is using the camera

**Port already in use?**
```bash
npm run dev -- --port 3000
```

**Installation failed?**
```bash
rm -rf node_modules package-lock.json
npm install
```

## Building for Production

```bash
npm run build
```

Output will be in `dist/` folder.

## Support

Check `README.md` for detailed documentation.
