export interface CaptureIntervalOptions {
  // sequenceDurationSeconds: number;
  startHours: number;
  endHours: number;
  outputDurationSeconds: number;
  fps: number;
}

/**
 * Get the interval in milliseconds to capture an image.
 *
 * @param {CaptureIntervalOptions} options
 * @returns {number}
 */
export function setCaptureInterval(
  callback: VoidFunction,
  { startHours, endHours, outputDurationSeconds, fps }: CaptureIntervalOptions,
) {
  const sequenceDurationSeconds = (endHours - startHours) * 60 * 60;
  const totalFrames = outputDurationSeconds * fps;
  const captureInterval = (sequenceDurationSeconds * 1000) / totalFrames;

  const timeout = setInterval(() => {
    const currentHours = new Date().getHours();

    // skip if outside the capture window
    if (currentHours < startHours || currentHours >= endHours) {
      return;
    }

    callback();
  }, captureInterval);

  return {
    captureInterval,
    timeout,
  };
}
