import { useEffect, useRef } from 'react';

interface VideoFeedProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isActive: boolean;
  currentGesture?: { gesture: string; confidence: number } | null;
}

export const VideoFeed: React.FC<VideoFeedProps> = ({ videoRef, canvasRef, isActive, currentGesture }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && videoRef.current) {
        const video = videoRef.current;
        if (video.videoWidth && video.videoHeight) {
          canvasRef.current.width = video.videoWidth;
          canvasRef.current.height = video.videoHeight;
        }
      }
    };

    const handleLoadedMetadata = () => {
      handleResize();
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      if (videoElement.videoWidth > 0) {
        handleResize();
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [videoRef, canvasRef]);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
      />
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
        width={1280}
        height={720}
      />
      {!isActive && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <p className="text-white text-xl">Camera is off</p>
        </div>
      )}
      {isActive && currentGesture && (
        <div className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold text-lg">
          Detected: {currentGesture.gesture} ({Math.round(currentGesture.confidence * 100)}%)
        </div>
      )}
    </div>
  );
};
