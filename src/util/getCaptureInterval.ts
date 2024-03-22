export interface GetCaptureIntervalOptions {
  sequenceDurationSeconds: number;
  outputDurationDurationSeconds: number;
  fps: number;
}

/**
 * Get the interval in milliseconds to capture an image.
 *
 * @param {GetCaptureIntervalOptions} options
 * @returns {number}
 */
export function getCaptureInterval({
  sequenceDurationSeconds,
  outputDurationDurationSeconds,
  fps,
}: GetCaptureIntervalOptions): number {
  const totalFrames = outputDurationDurationSeconds * fps;
  const captureInterval = (sequenceDurationSeconds * 1000) / totalFrames;

  return captureInterval;
}
