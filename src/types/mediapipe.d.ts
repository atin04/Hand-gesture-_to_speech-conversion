interface NormalizedLandmark {
  x: number;
  y: number;
  z: number;
}

type NormalizedLandmarkList = NormalizedLandmark[];

interface HandsResults {
  image: HTMLCanvasElement | HTMLVideoElement | HTMLImageElement;
  multiHandLandmarks?: NormalizedLandmarkList[];
  multiHandedness?: Array<{
    index: number;
    score: number;
    label: string;
  }>;
}

interface HandsOptions {
  locateFile?: (file: string) => string;
}

interface HandsConfig {
  maxNumHands?: number;
  modelComplexity?: 0 | 1;
  minDetectionConfidence?: number;
  minTrackingConfidence?: number;
}

interface CameraOptions {
  onFrame: () => Promise<void>;
  width: number;
  height: number;
}

declare global {
  interface Window {
    Hands: {
      new (options: HandsOptions): {
        setOptions(config: HandsConfig): void;
        onResults(callback: (results: HandsResults) => void): void;
        send(inputs: { image: HTMLVideoElement | HTMLImageElement }): Promise<void>;
        close(): void;
      };
    };
    Camera: {
      new (videoElement: HTMLVideoElement, options: CameraOptions): {
        start(): Promise<void>;
        stop(): void;
      };
    };
  }
}

export type { NormalizedLandmark, NormalizedLandmarkList, HandsResults, HandsOptions, HandsConfig, CameraOptions };
