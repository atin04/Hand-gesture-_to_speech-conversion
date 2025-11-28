# Project Structure

```
sign-language-app/
│
├── src/
│   ├── components/              # React UI components
│   │   ├── ControlPanel.tsx     # Start/Stop/Clear controls
│   │   ├── GestureReference.tsx # ASL alphabet reference
│   │   ├── SettingsModal.tsx    # Configuration modal
│   │   ├── TextOutput.tsx       # Recognized text display
│   │   └── VideoFeed.tsx        # Camera feed with hand tracking
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCamera.ts         # Camera management
│   │   └── useHandTracking.ts   # Hand detection & tracking
│   │
│   ├── services/                # Business logic
│   │   └── sessionService.ts    # Session data persistence
│   │
│   ├── utils/                   # Utilities
│   │   ├── browserFingerprint.ts # Device identification
│   │   └── gestureClassifier.ts  # ASL gesture recognition
│   │
│   ├── lib/                     # External integrations
│   │   └── supabase.ts          # Database client
│   │
│   ├── types/                   # TypeScript definitions
│   │   └── mediapipe.d.ts       # MediaPipe types
│   │
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles
│
├── supabase/
│   └── migrations/              # Database migrations
│       └── 20251115063720_create_sign_language_sessions.sql
│
├── public/                      # Static assets (auto-generated)
├── dist/                        # Production build (auto-generated)
│
├── Configuration Files
├── .env                         # Environment variables (Supabase)
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── tailwind.config.js           # TailwindCSS configuration
├── postcss.config.js            # PostCSS configuration
└── eslint.config.js             # ESLint configuration

└── Documentation
    ├── README.md                # Complete project documentation
    ├── INSTALLATION.md          # Installation guide
    ├── SETUP_GUIDE.txt          # Quick start guide
    └── PROJECT_STRUCTURE.md     # This file
```

## Key Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **TailwindCSS** - Styling
- **MediaPipe Hands** - Hand tracking AI
- **Supabase** - Database & backend
- **Lucide React** - Icons

## Component Overview

### VideoFeed
- Displays camera stream
- Renders hand landmarks
- Shows bounding box for hand detection
- Real-time gesture recognition feedback

### ControlPanel
- Start/Stop camera
- Clear text
- Save to file
- Quit application

### TextOutput
- Displays recognized text
- Character counter
- Auto-scroll

### GestureReference
- ASL alphabet chart
- Visual reference for users

### SettingsModal
- Confidence threshold adjustment
- Hold time configuration
- Future settings expansion

## Data Flow

1. Camera captures video → `useCamera.ts`
2. Hand tracking detects landmarks → `useHandTracking.ts`
3. Landmarks classified to gestures → `gestureClassifier.ts`
4. Gestures converted to text → `App.tsx`
5. Session data saved → `sessionService.ts` → Supabase

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # TypeScript type checking
```
