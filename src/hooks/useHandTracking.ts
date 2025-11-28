import { useEffect, useRef, useState } from 'react';
import { GestureClassifier, GestureResult } from '../utils/gestureClassifier';
import type { HandsResults } from '../types/mediapipe';

export const useHandTracking = (
  videoElement: HTMLVideoElement | null,
  canvasElement: HTMLCanvasElement | null,
  isActive: boolean,
  showLandmarks: boolean = true
) => {
  const [currentGesture, setCurrentGesture] = useState<GestureResult | null>(null);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const handsRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const classifierRef = useRef(new GestureClassifier());
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    if (!videoElement || !canvasElement || !isActive) {
      return;
    }

    if (!window.Hands || !window.Camera) {
      console.error('MediaPipe libraries not loaded');
      return;
    }

    const checkVideoReady = () => {
      return videoElement.readyState >= 2 && videoElement.videoWidth > 0 && videoElement.videoHeight > 0;
    };

    if (!checkVideoReady()) {
      const handleCanPlay = () => {
        if (canvasElement) {
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
        }
      };
      videoElement.addEventListener('canplay', handleCanPlay, { once: true });
    } else {
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
    }

    const hands = new window.Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7
    });

    canvasCtxRef.current = canvasElement.getContext('2d');

    hands.onResults((results: HandsResults) => {
      if (!canvasCtxRef.current || !canvasElement) return;

      const ctx = canvasCtxRef.current;
      ctx.save();
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        setIsHandDetected(true);

        if (showLandmarks) {
          drawLandmarks(ctx, landmarks, canvasElement.width, canvasElement.height);
          drawBoundingBox(ctx, landmarks, canvasElement.width, canvasElement.height);
        }

        const gesture = classifierRef.current.classify(landmarks);
        if (gesture) {
          setCurrentGesture(gesture);
        }
      } else {
        setIsHandDetected(false);
        classifierRef.current.reset();
        setCurrentGesture(null);
      }

      ctx.restore();
    });

    const camera = new window.Camera(videoElement, {
      onFrame: async () => {
        if (handsRef.current && videoElement) {
          await handsRef.current.send({ image: videoElement });
        }
      },
      width: 1280,
      height: 720
    });

    handsRef.current = hands;
    cameraRef.current = camera;

    camera.start();

    return () => {
      camera.stop();
      hands.close();
    };
  }, [videoElement, canvasElement, isActive, showLandmarks]);

  return { currentGesture, isHandDetected };
};

function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  width: number,
  height: number
) {
  const connections = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [9, 10], [10, 11], [11, 12],
    [0, 13], [13, 14], [14, 15], [15, 16],
    [0, 17], [17, 18], [18, 19], [19, 20],
    [5, 9], [9, 13], [13, 17]
  ];

  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = 2;

  for (const [start, end] of connections) {
    const startPoint = landmarks[start];
    const endPoint = landmarks[end];

    ctx.beginPath();
    ctx.moveTo(startPoint.x * width, startPoint.y * height);
    ctx.lineTo(endPoint.x * width, endPoint.y * height);
    ctx.stroke();
  }

  for (const landmark of landmarks) {
    ctx.fillStyle = '#FF0000';
    ctx.beginPath();
    ctx.arc(landmark.x * width, landmark.y * height, 5, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function drawBoundingBox(
  ctx: CanvasRenderingContext2D,
  landmarks: any[],
  width: number,
  height: number
) {
  let minX = 1, minY = 1, maxX = 0, maxY = 0;

  for (const landmark of landmarks) {
    minX = Math.min(minX, landmark.x);
    minY = Math.min(minY, landmark.y);
    maxX = Math.max(maxX, landmark.x);
    maxY = Math.max(maxY, landmark.y);
  }

  const padding = 0.05;
  minX = Math.max(0, minX - padding);
  minY = Math.max(0, minY - padding);
  maxX = Math.min(1, maxX + padding);
  maxY = Math.min(1, maxY + padding);

  const boxX = minX * width;
  const boxY = minY * height;
  const boxWidth = (maxX - minX) * width;
  const boxHeight = (maxY - minY) * height;

  ctx.strokeStyle = '#FFA500';
  ctx.lineWidth = 3;
  ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
}
