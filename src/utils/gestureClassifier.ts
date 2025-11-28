import type { NormalizedLandmarkList } from '../types/mediapipe';

export interface GestureResult {
  gesture: string;
  confidence: number;
}

function getDistance(p1: any, p2: any): number {
  return Math.sqrt(
    Math.pow(p1.x - p2.x, 2) +
    Math.pow(p1.y - p2.y, 2) +
    Math.pow(p1.z - p2.z, 2)
  );
}

function recognizeGesture(landmarks: NormalizedLandmarkList): GestureResult {
  const wrist = landmarks[0];

  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const thumbMCP = landmarks[2];

  const indexTip = landmarks[8];
  const indexPIP = landmarks[6];
  const indexMCP = landmarks[5];

  const middleTip = landmarks[12];
  const middlePIP = landmarks[10];
  const middleMCP = landmarks[9];

  const ringTip = landmarks[16];
  const ringPIP = landmarks[14];
  const ringMCP = landmarks[13];

  const pinkyTip = landmarks[20];
  const pinkyPIP = landmarks[18];
  const pinkyMCP = landmarks[17];

  const indexUp = indexTip.y < indexMCP.y - 0.05;
  const middleUp = middleTip.y < middleMCP.y - 0.05;
  const ringUp = ringTip.y < ringMCP.y - 0.05;
  const pinkyUp = pinkyTip.y < pinkyMCP.y - 0.05;

  const indexDown = indexTip.y > indexPIP.y;
  const middleDown = middleTip.y > middlePIP.y;
  const ringDown = ringTip.y > ringPIP.y;
  const pinkyDown = pinkyTip.y > pinkyPIP.y;

  const upCount = [indexUp, middleUp, ringUp, pinkyUp].filter(Boolean).length;

  const thumbIndexDist = getDistance(thumbTip, indexTip);
  const thumbMiddleDist = getDistance(thumbTip, middleTip);

  if (upCount === 0 && indexDown && middleDown && ringDown && pinkyDown) {
    if (thumbTip.y < indexMCP.y - 0.02) {
      return { gesture: 'S', confidence: 0.92 };
    }

    if (thumbTip.y > wrist.y + 0.04 && thumbTip.x > indexMCP.x - 0.03) {
      return { gesture: 'A', confidence: 0.93 };
    }

    if (thumbTip.y > indexMCP.y - 0.02 && thumbTip.y < indexMCP.y + 0.03) {
      return { gesture: 'E', confidence: 0.91 };
    }

    if (thumbTip.x < indexMCP.x && thumbTip.y < indexMCP.y + 0.02) {
      return { gesture: 'T', confidence: 0.88 };
    }

    return { gesture: 'M', confidence: 0.85 };
  }

  if (upCount === 4) {
    const thumbHidden = thumbTip.y > indexMCP.y - 0.02;
    if (thumbHidden) {
      return { gesture: 'B', confidence: 0.94 };
    }

    const allSpread = Math.abs(indexTip.x - middleTip.x) > 0.04 &&
                     Math.abs(middleTip.x - ringTip.x) > 0.03 &&
                     Math.abs(ringTip.x - pinkyTip.x) > 0.03;
    if (allSpread) {
      return { gesture: 'SPACE', confidence: 0.90 };
    }
  }

  if (indexUp && !middleUp && !ringUp && !pinkyUp) {
    const thumbOut = Math.abs(thumbTip.x - indexMCP.x) > 0.08;
    const thumbAtSide = Math.abs(thumbTip.y - indexMCP.y) < 0.04;
    if (thumbOut && thumbAtSide) {
      return { gesture: 'L', confidence: 0.93 };
    }

    if (thumbMiddleDist < 0.05) {
      return { gesture: 'D', confidence: 0.92 };
    }

    if (!thumbOut) {
      return { gesture: 'X', confidence: 0.86 };
    }
  }

  if (!indexUp && !middleUp && !ringUp && pinkyUp) {
    const thumbOut = getDistance(thumbTip, wrist) > getDistance(thumbMCP, wrist) * 1.3;
    if (thumbOut) {
      return { gesture: 'Y', confidence: 0.94 };
    }
    return { gesture: 'I', confidence: 0.93 };
  }

  if (indexUp && middleUp && !ringUp && !pinkyUp) {
    const closeTogether = Math.abs(indexTip.x - middleTip.x) < 0.025;
    if (closeTogether) {
      return { gesture: 'U', confidence: 0.92 };
    }

    const spread = Math.abs(indexTip.x - middleTip.x) > 0.045;
    if (spread) {
      return { gesture: 'V', confidence: 0.93 };
    }

    return { gesture: 'R', confidence: 0.87 };
  }

  if (indexUp && middleUp && ringUp && !pinkyUp) {
    return { gesture: 'W', confidence: 0.92 };
  }

  if (!indexUp && middleUp && ringUp && pinkyUp) {
    if (thumbIndexDist < 0.06) {
      return { gesture: 'F', confidence: 0.91 };
    }
  }

  if (!indexUp && !middleUp && !ringUp && !pinkyUp) {
    const cShape = thumbIndexDist > 0.07 && thumbIndexDist < 0.13;
    const thumbOut = getDistance(thumbTip, wrist) > getDistance(thumbMCP, wrist) * 1.2;
    if (cShape && thumbOut) {
      return { gesture: 'C', confidence: 0.89 };
    }

    if (thumbIndexDist < 0.05) {
      return { gesture: 'O', confidence: 0.90 };
    }
  }

  if (indexUp && !middleUp && !ringUp && !pinkyUp) {
    const sideways = indexTip.x < indexMCP.x - 0.06;
    const thumbSideways = Math.abs(thumbTip.x - indexTip.x) < 0.04;
    if (sideways && thumbSideways) {
      return { gesture: 'G', confidence: 0.87 };
    }
  }

  if (indexUp && middleUp && !ringUp && !pinkyUp) {
    const sideways = indexTip.x < indexMCP.x - 0.05;
    const together = Math.abs(indexTip.x - middleTip.x) < 0.03;
    if (sideways && together) {
      return { gesture: 'H', confidence: 0.86 };
    }
  }

  if (indexDown && middleDown && ringDown && pinkyDown) {
    const thumbUnder = thumbTip.y > wrist.y + 0.02 && thumbTip.x < middleMCP.x;
    if (thumbUnder) {
      return { gesture: 'N', confidence: 0.84 };
    }
  }

  if (indexTip.y > indexMCP.y && !middleUp && !ringUp && !pinkyUp) {
    return { gesture: 'Q', confidence: 0.83 };
  }

  if (indexTip.y > indexMCP.y && middleTip.y > middleMCP.y && !ringUp && !pinkyUp) {
    return { gesture: 'P', confidence: 0.84 };
  }

  return { gesture: 'UNKNOWN', confidence: 0.3 };
}

export class GestureClassifier {
  private lastGesture: string | null = null;
  private gestureHoldCount = 0;
  private readonly holdThreshold = 20;
  private recentGestures: GestureResult[] = [];
  private lastEmittedGesture: string | null = null;
  private cooldownFrames = 0;
  private readonly cooldownThreshold = 30;

  classify(landmarks: NormalizedLandmarkList | undefined): GestureResult | null {
    if (!landmarks || landmarks.length !== 21) {
      this.reset();
      return null;
    }

    if (this.cooldownFrames > 0) {
      this.cooldownFrames--;
      return null;
    }

    const result = recognizeGesture(landmarks);

    if (result.confidence < 0.80 || result.gesture === 'UNKNOWN') {
      return null;
    }

    this.recentGestures.push(result);
    if (this.recentGestures.length > 10) {
      this.recentGestures.shift();
    }

    const mostCommon = this.getMostCommonGesture();

    if (mostCommon.gesture === this.lastGesture) {
      this.gestureHoldCount++;
    } else {
      this.lastGesture = mostCommon.gesture;
      this.gestureHoldCount = 1;
    }

    if (this.gestureHoldCount >= this.holdThreshold) {
      if (mostCommon.gesture !== this.lastEmittedGesture) {
        this.lastEmittedGesture = mostCommon.gesture;
        this.cooldownFrames = this.cooldownThreshold;
        this.gestureHoldCount = 0;
        return mostCommon;
      }
    }

    return null;
  }

  private getMostCommonGesture(): GestureResult {
    const gestureCounts = new Map<string, { count: number; totalConfidence: number }>();

    for (const result of this.recentGestures) {
      const current = gestureCounts.get(result.gesture) || { count: 0, totalConfidence: 0 };
      gestureCounts.set(result.gesture, {
        count: current.count + 1,
        totalConfidence: current.totalConfidence + result.confidence
      });
    }

    let maxCount = 0;
    let mostCommon = { gesture: 'UNKNOWN', confidence: 0 };

    for (const [gesture, data] of gestureCounts.entries()) {
      if (data.count > maxCount) {
        maxCount = data.count;
        mostCommon = {
          gesture,
          confidence: data.totalConfidence / data.count
        };
      }
    }

    return mostCommon;
  }

  reset(): void {
    this.lastGesture = null;
    this.gestureHoldCount = 0;
    this.recentGestures = [];
  }
}
