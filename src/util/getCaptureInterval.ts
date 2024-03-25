export interface CaptureIntervalOptions {
  sequenceDurationSeconds: number;
  outputDurationDurationSeconds: number;
  fps: number;
}

/**
 * Get the interval in milliseconds to capture an image.
 *
 * @param {CaptureIntervalOptions} options
 * @returns {number}
 */
export function getCaptureInterval({
  sequenceDurationSeconds,
  outputDurationDurationSeconds,
  fps,
}: CaptureIntervalOptions): number {
  const totalFrames = outputDurationDurationSeconds * fps;
  const captureInterval = (sequenceDurationSeconds * 1000) / totalFrames;

  return captureInterval;
}
