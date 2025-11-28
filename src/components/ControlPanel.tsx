import { Camera, CameraOff, Trash2, Save, Settings, Eye, EyeOff } from 'lucide-react';

interface ControlPanelProps {
  isActive: boolean;
  showLandmarks: boolean;
  onStart: () => void;
  onStop: () => void;
  onClear: () => void;
  onSave: () => void;
  onToggleLandmarks: () => void;
  onOpenSettings: () => void;
  gestureCount: number;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isActive,
  showLandmarks,
  onStart,
  onStop,
  onClear,
  onSave,
  onToggleLandmarks,
  onOpenSettings,
  gestureCount
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-3">
          {!isActive ? (
            <button
              onClick={onStart}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              <Camera size={20} />
              Start Camera
            </button>
          ) : (
            <button
              onClick={onStop}
              className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-md"
            >
              <CameraOff size={20} />
              Stop Camera
            </button>
          )}

          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
            disabled={!isActive}
          >
            <Trash2 size={20} />
            Clear
          </button>

          <button
            onClick={onSave}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-md"
          >
            <Save size={20} />
            Save Session
          </button>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={onToggleLandmarks}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
              showLandmarks
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
            title={showLandmarks ? 'Hide landmarks' : 'Show landmarks'}
          >
            {showLandmarks ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>

          <button
            onClick={onOpenSettings}
            className="flex items-center gap-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
          >
            <Settings size={20} />
          </button>

          <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-sm text-gray-600">Gestures: </span>
            <span className="font-bold text-blue-800">{gestureCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
