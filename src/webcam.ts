import { type WebcamOptions, create } from "node-webcam";
import { copyFile } from "fs/promises";
import { join } from "path";
import { getFlashDrivePath } from "./util/getFlashDrivePath";

export function startWebcamCapture() {
  const options: WebcamOptions = {
    width: 1920,
    height: 1080,
    quality: 90,
    output: "jpeg",
    callbackReturn: "location",
    // frames: 60,
    // delay: 0,
    // saveShots: true,
    // device: "/dev/video0",
    // verbose: false,
  };

  console.log("starting webcam capture");

  // create webcam
  const webcam = create(options);

  const flashDrivePath = getFlashDrivePath();

  // prefer flash drive but fallback to local directory
  const projectPath = join(__dirname, "..", "..");
  const captureDirectory =
    flashDrivePath ?? join(projectPath, `public/capture`);
  const publicCaptureDirectory = join(projectPath, `public`);

  console.log(`Capture images are stored in '${captureDirectory}'`);

  // capture an image at interval
  setInterval(() => {
    const currentDate = new Date();

    const filename = `${currentDate.toISOString()}.jpg`;
    const captureFilePath = join(captureDirectory, filename);
    const lastFramePath = join(publicCaptureDirectory, "last.jpg");

    // capture to last frame file
    webcam.capture(lastFramePath, (error, _capturedFilePath) => {
      // handle error
      if (error) {
        console.log("capturing failed", error, _capturedFilePath);

        return;
      }

      console.log("captured frame", captureFilePath);

      // copy the last frame onto capture directory (prefer flash drive)
      copyFile(lastFramePath, captureFilePath).catch((error) => {
        console.error("copying last frame file failed", error);
      });
    });
  }, 5000);
}
