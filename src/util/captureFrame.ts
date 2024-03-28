import { copyFile } from "fs/promises";
import { type FSWebcam } from "node-webcam";
import { join } from "path";
import { ensurePathExists } from "@/util/ensurePathExists";
import { formatDate } from "@/util/formatDate";
import { formatDatetime } from "@/util/formatDatetime";

export interface CaptureFrameOptions {
  webcam: FSWebcam;
  flashDrivePath: string | null;
  localCapturePath: string;
  lastFramePath: string;
  updateLastFrameOnly?: boolean;
}

export function captureFrame({
  webcam,
  flashDrivePath,
  localCapturePath,
  lastFramePath,
  updateLastFrameOnly,
}: CaptureFrameOptions) {
  const currentTime = new Date();
  const currentDateDirectory = formatDate(currentTime);
  const capturePath = flashDrivePath
    ? join(flashDrivePath, currentDateDirectory)
    : join(localCapturePath, currentDateDirectory);

  // create the capture path if needed (includes current date that changes)
  ensurePathExists(capturePath);

  // filename is the current datetime, formatted for filenames
  const filename = `${formatDatetime(currentTime, true)}.jpg`;
  const captureFilePath = join(capturePath, filename);

  // capture to last frame file
  webcam.capture(lastFramePath, (error, _capturedFilePath) => {
    // handle error
    if (error) {
      console.error("Capturing failed", error, _capturedFilePath);

      return;
    }

    // copy the last frame into capture directory
    if (updateLastFrameOnly !== true) {
      console.log(`Captured frame '${captureFilePath}'`);

      copyFile(lastFramePath, captureFilePath).catch((error) => {
        console.error(
          `Copying last to '${captureFilePath}' frame file failed`,
          error,
        );
      });
    }
  });
}
