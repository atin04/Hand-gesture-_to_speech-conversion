# Sign Language to Text Recognition

Real-time ASL (American Sign Language) alphabet recognition application using hand tracking and AI. This application uses your webcam to detect hand gestures and convert them to text in real-time.

## Features

- **Real-time Recognition:** Instant ASL alphabet (A-Z) gesture detection
- **Special Gestures:** SPACE and DELETE functionality
- **Live Video Feed:** Hand landmark visualization with bounding boxes
- **Text Output:** Character counter and live text display
- **Export Capability:** Save recognized text to file
- **Session Tracking:** Usage statistics stored in Supabase database
- **User Preferences:** Customizable settings for confidence threshold, landmark display, and text size
- **Modern UI:** Clean, intuitive desktop-style interface

## Prerequisites

Before running this project, ensure you have:

- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Webcam** (built-in or external)
- **Modern Web Browser:** Chrome 90+, Edge 90+, or Firefox 88+ recommended
- **Supabase Account** (for database features)

## Quick Start

### 1. Extract Project Files

Extract all files to a folder on your computer.

### 2. Install Dependencies

Open a terminal in the project folder and run:

```bash
npm install
```

### 3. Configure Environment

The `.env` file is already configured with Supabase credentials. The database schema will be created automatically on first run.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 5. Open in Browser

Click the URL in the terminal or manually navigate to `http://localhost:5173` in your browser.

## How to Use

### Getting Started

1. **Grant Camera Permission:** Allow webcam access when prompted by your browser
2. **Click "Start Camera":** Enable the video feed
3. **Position Your Hand:** Show your hand clearly in the video frame
4. **Look for the Green Indicator:** "Hand detected - Hold sign steady" means you're ready

### Making Gestures

1. **Form the ASL Sign:** Use proper ASL alphabet hand positions
2. **Hold Steady:** Keep the gesture still for about 0.5-1 second
3. **Wait for Recognition:** The letter will appear in the text output
4. **Continue:** Move to the next letter after a brief pause

### Special Gestures

- **SPACE:** Open hand with all five fingers spread wide
- **DELETE:** Removes the last character from the text

### Managing Your Text

- **Clear All:** Remove all recognized text
- **Save to a Text File:** Download your text as a `.txt` file
- **Quit:** Stop the camera and end the session

## Supported Gestures

### Complete ASL Alphabet (A-Z)

The application recognizes all 26 letters of the ASL alphabet:

- **A** - Fist with thumb on the side
- **B** - Four fingers up, thumb tucked
- **C** - Curved hand shape
- **D** - Index up, thumb touching middle
- **E** - All fingers tightly curled
- **F** - Three fingers up, thumb and index forming circle
- **G** - Index and thumb pointing sideways
- **H** - Index and middle sideways together
- **I** - Only pinky up
- **J** - J-motion with pinky (motion-based)
- **K** - Index and middle in V with thumb between
- **L** - Index up, thumb out perpendicular
- **M** - Fist with thumb under three fingers
- **N** - Fist with thumb under two fingers
- **O** - Circle shape with thumb and fingers
- **P** - Index and middle pointing down
- **Q** - Index and thumb pointing down
- **R** - Index and middle crossed
- **S** - Fist with thumb over fingers
- **T** - Thumb sticking through fist
- **U** - Index and middle together pointing up
- **V** - Peace sign (index and middle spread)
- **W** - Three fingers up (index, middle, ring)
- **X** - Index bent like a hook
- **Y** - Thumb and pinky out
- **Z** - Z-motion with index (motion-based)

### Special Commands

- **SPACE** - All five fingers spread wide apart
- **DELETE** - Closed fist pointing sideways

## Tips for Best Results

### Lighting and Position

- Use good, even lighting on your hand
- Avoid backlighting or shadows
- Keep your hand within the frame
- Position hand 1-2 feet from the camera

### Gesture Technique

- Hold each gesture steady for 0.5-1 second
- Make clear, distinct hand shapes
- Wait for the cooldown period between letters
- Show only one hand at a time

### Improving Accuracy

- Practice ASL hand positions beforehand
- Keep background clear and uncluttered
- Ensure hand is fully visible (all fingers)
- Avoid wearing gloves or hand accessories

## Project Structure

```
sign-language-app/
├── src/
│   ├── components/          # React UI components
│   │   ├── VideoFeed.tsx           # Camera feed display
│   │   ├── TextOutput.tsx          # Recognized text display
│   │   ├── ControlPanel.tsx        # Control buttons
│   │   ├── SettingsModal.tsx       # User settings
│   │   └── GestureReference.tsx    # ASL reference guide
│   ├── hooks/               # Custom React hooks
│   │   ├── useCamera.ts            # Camera management
│   │   └── useHandTracking.ts      # Hand detection logic
│   ├── services/            # Business logic services
│   │   └── sessionService.ts       # Session tracking
│   ├── utils/               # Utility functions
│   │   ├── gestureClassifier.ts    # Gesture recognition
│   │   └── browserFingerprint.ts   # User identification
│   ├── lib/                 # Third-party integrations
│   │   └── supabase.ts             # Supabase client
│   ├── types/               # TypeScript definitions
│   │   └── mediapipe.d.ts          # MediaPipe types
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── supabase/
│   └── migrations/          # Database migrations
│       └── 20251115063720_create_sign_language_sessions.sql
├── public/                  # Static assets
├── dist/                    # Production build output
├── .env                     # Environment variables (Supabase)
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Database Schema

The application uses Supabase PostgreSQL with the following tables:

### `user_preferences`
Stores user settings and configurations:
- `browser_id` (primary key) - Anonymous user identifier
- `confidence_threshold` - Minimum confidence for gesture recognition (0-1)
- `show_landmarks` - Toggle hand landmark visualization
- `text_size` - Output text size (small/medium/large)

### `sign_language_sessions`
Tracks user sessions:
- `id` (UUID) - Unique session identifier
- `browser_id` - Links to user preferences
- `start_time` - Session start timestamp
- `end_time` - Session end timestamp
- `total_gestures` - Count of recognized gestures

### `gesture_logs`
Individual gesture recognition events:
- `id` (UUID) - Unique log identifier
- `session_id` - Links to session
- `browser_id` - User identifier
- `gesture` - Recognized letter or command
- `confidence` - Recognition confidence score
- `timestamp` - When gesture was recognized

## Configuration

### Environment Variables

The `.env` file contains Supabase configuration:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### User Settings

Accessible via the Settings button (if implemented):
- **Confidence Threshold:** Adjust sensitivity (default: 0.85)
- **Show Landmarks:** Toggle hand skeleton overlay
- **Text Size:** Small, Medium, or Large output text

## Building for Production

### Create Production Build

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Deploy

The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Scripts

Available npm scripts:

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
npm run typecheck # Check TypeScript types
```

## Troubleshooting

### Camera Issues

**Camera not working:**
- Check browser permissions (camera access)
- Close other applications using the camera
- Refresh the page
- Try a different browser

**Video is dark or unclear:**
- Improve room lighting
- Clean your camera lens
- Check camera settings in your OS

### Recognition Issues

**Gestures not recognized:**
- Hold the gesture steady for 1 full second
- Ensure good lighting on your hand
- Check that hand is fully visible in frame
- Show only one hand at a time
- Practice proper ASL hand positions

**Wrong letters appearing:**
- Slow down between gestures
- Make clearer, more distinct hand shapes
- Increase the hold time for each gesture
- Adjust confidence threshold in settings

**High latency or lag:**
- Close unnecessary browser tabs
- Restart the browser
- Check system resources (CPU/RAM)
- Reduce video quality in camera settings

### Application Issues

**npm install fails:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version: `node --version` (should be 16+)

**Development server won't start:**
- Check if port 5173 is already in use
- Try a different port: `npm run dev -- --port 3000`
- Restart your terminal/command prompt

**Build errors:**
- Run `npm run typecheck` to identify TypeScript errors
- Ensure all dependencies are installed
- Check for syntax errors in recent changes

**Database connection issues:**
- Verify `.env` file exists and has correct values
- Check Supabase project is active
- Verify network connection
- Check browser console for specific errors

## Performance Optimization

### For Better Recognition Speed

1. Close unnecessary applications
2. Use a modern browser (Chrome/Edge recommended)
3. Ensure good CPU/GPU performance
4. Reduce background browser activity

### For Better Accuracy

1. Use consistent hand positions
2. Practice standard ASL alphabet signs
3. Maintain steady camera angle
4. Keep hand at consistent distance from camera

## Technologies Used

### Frontend Framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

### Styling
- **TailwindCSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Lucide React** - Icon library

### Hand Tracking
- **MediaPipe Hands** - Google's hand tracking solution
- **TensorFlow.js** - Machine learning in browser

### Database
- **Supabase** - PostgreSQL database and authentication
- **@supabase/supabase-js** - Supabase client library

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TypeScript-specific linting
- **Autoprefixer** - CSS vendor prefixing

## Browser Compatibility

### Fully Supported
- Chrome 90+
- Edge 90+
- Firefox 88+
- Safari 14+

### Requirements
- WebRTC support (camera access)
- ES6+ JavaScript support
- WebAssembly support (for MediaPipe)

## Security & Privacy

- All hand tracking is performed locally in the browser
- No video or images are uploaded to servers
- Session data is anonymized using browser fingerprinting
- Supabase connections use secure HTTPS
- Camera access requires explicit user permission

## Known Limitations

- Motion-based letters (J, Z) have limited support
- Similar gestures (M, N, S, A, E, T) may require extra precision
- Works best with one hand at a time
- Requires consistent lighting conditions
- Performance depends on device capabilities

## Future Enhancements

Potential improvements for future versions:
- Support for ASL words and phrases
- Multi-hand gesture recognition
- Custom gesture training
- Voice output option
- Mobile app version
- Offline mode
- Multi-language support

## Contributing

This project is designed for educational purposes. Feel free to:
- Fork and modify for your own use
- Report bugs or issues
- Suggest improvements
- Share with others learning ASL

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Verify all prerequisites are met
4. Ensure latest version of dependencies

## License

This project is provided as-is for educational purposes.

## Acknowledgments

- ASL alphabet based on American Sign Language standards
- Hand tracking powered by Google MediaPipe
- Database infrastructure by Supabase
- Built with modern web technologies

---

**Happy Signing!** Practice your ASL alphabet and enjoy real-time recognition.
