import { useRef, useState, useEffect } from 'react';
import { VideoFeed } from './components/VideoFeed';
import { TextOutput } from './components/TextOutput';
import { SettingsModal } from './components/SettingsModal';
import { useCamera } from './hooks/useCamera';
import { useHandTracking } from './hooks/useHandTracking';
import { SessionService } from './services/sessionService';
import { UserPreferences } from './lib/supabase';
import { Hand } from 'lucide-react';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { videoRef, isActive, error, startCamera, stopCamera } = useCamera();

  const [recognizedText, setRecognizedText] = useState('');
  const [preferences, setPreferences] = useState<UserPreferences>({
    browser_id: '',
    confidence_threshold: 0.85,
    show_landmarks: true,
    text_size: 'medium'
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const sessionServiceRef = useRef(new SessionService());

  const { currentGesture, isHandDetected } = useHandTracking(
    videoRef.current,
    canvasRef.current,
    isActive,
    preferences.show_landmarks
  );

  useEffect(() => {
    const loadPreferences = async () => {
      const prefs = await sessionServiceRef.current.loadPreferences();
      setPreferences(prefs);
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    if (currentGesture) {
      handleGestureRecognized(currentGesture.gesture);
    }
  }, [currentGesture]);

  const handleStart = async () => {
    await startCamera();
    await sessionServiceRef.current.startSession();
  };

  const handleStop = async () => {
    stopCamera();
    await sessionServiceRef.current.endSession();
  };

  const handleGestureRecognized = async (gesture: string) => {
    if (gesture === 'DELETE') {
      setRecognizedText(prev => prev.slice(0, -1));
    } else if (gesture === 'SPACE') {
      setRecognizedText(prev => prev + ' ');
    } else {
      setRecognizedText(prev => prev + gesture);
    }

    if (currentGesture) {
      await sessionServiceRef.current.recordGesture(gesture, currentGesture.confidence);
    }
  };

  const handleClear = () => {
    setRecognizedText('');
  };

  const handleSave = async () => {
    await sessionServiceRef.current.endSession();

    const blob = new Blob([recognizedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sign-language-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (isActive) {
      await sessionServiceRef.current.startSession();
    }
  };

  const handleSavePreferences = async (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    await sessionServiceRef.current.savePreferences(newPreferences);
    setIsSettingsOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl overflow-hidden">
        <header className="bg-gray-200 px-4 py-2 flex items-center justify-between border-b border-gray-300">
          <div className="flex items-center gap-2">
            <Hand size={24} className="text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-800">
              Sign Language to Text
            </h1>
          </div>
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-gray-400 hover:bg-gray-500"></button>
            <button className="w-3 h-3 rounded-full bg-gray-400 hover:bg-gray-500"></button>
            <button
              onClick={handleStop}
              className="w-3 h-3 rounded-full bg-gray-400 hover:bg-red-500"
            ></button>
          </div>
        </header>

        {error && (
          <div className="mx-4 mt-4 p-3 bg-red-100 border border-red-300 rounded text-red-800 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="p-4">
          {isActive && (
            <div className="mb-2 flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isHandDetected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-gray-600">
                {isHandDetected ? 'Hand detected - Hold sign steady' : 'No hand detected - Show your hand'}
              </span>
            </div>
          )}
          <div className="mb-4 h-[400px]">
            <VideoFeed
              videoRef={videoRef}
              canvasRef={canvasRef}
              isActive={isActive}
              currentGesture={currentGesture}
            />
          </div>

          <div className="mb-4 h-[140px]">
            <TextOutput text={recognizedText} textSize={preferences.text_size} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={handleClear}
              className="py-4 px-6 text-xl font-semibold bg-yellow-200 hover:bg-yellow-300 text-gray-800 rounded transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleSave}
              className="py-4 px-6 text-xl font-semibold bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
            >
              Save to a Text File
            </button>
            <button
              onClick={handleStop}
              className="py-4 px-6 text-xl font-semibold bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
            >
              Quit
            </button>
          </div>

          {!isActive && (
            <button
              onClick={handleStart}
              className="w-full mt-3 py-3 px-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Start Camera
            </button>
          )}
        </div>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          preferences={preferences}
          onSave={handleSavePreferences}
        />
      </div>
    </div>
  );
}

export default App;
