import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const ASL_ALPHABET = [
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
  ['H', 'I', 'J', 'K', 'L', 'M', 'N'],
  ['O', 'P', 'Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];

export const GestureReference: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
      >
        <span>ASL Alphabet Reference</span>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>

      {isExpanded && (
        <div className="p-6 bg-gray-50">
          <div className="grid grid-cols-7 gap-4">
            {ASL_ALPHABET.flat().map((letter) => (
              <div
                key={letter}
                className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border-2 border-gray-200 hover:border-blue-400 transition-colors"
              >
                <span className="text-3xl font-bold text-gray-800">{letter}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-gray-700">
              <strong>Tips:</strong> Hold each gesture steady for about 1 second for best recognition.
              Make sure your hand is clearly visible and well-lit.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
