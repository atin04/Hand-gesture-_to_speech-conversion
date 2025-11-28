import { useEffect, useRef } from 'react';

interface TextOutputProps {
  text: string;
  textSize: 'small' | 'medium' | 'large';
}

export const TextOutput: React.FC<TextOutputProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div className="bg-gray-50 rounded border-2 border-gray-300 h-full flex flex-col relative">
      <div
        ref={textRef}
        className="flex-1 overflow-y-auto p-4 text-2xl font-bold text-gray-800 break-words"
      >
        {text || (
          <span className="text-gray-400 text-base font-normal">
            Recognized text will appear here...
          </span>
        )}
      </div>
      <div className="absolute bottom-2 right-2 bg-gray-200 rounded px-2 py-1 text-xs text-gray-600 border border-gray-300">
        {text.length}
      </div>
    </div>
  );
};
