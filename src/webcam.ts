import { type WebcamOptions, create } from "node-webcam";
import { copyFile } from "fs/promises";
import { join } from "path";

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
    // device: false,
    // verbose: false,
  };

  console.log("starting webcam capture");

  // create webcam
  const webcam = create(options);

  // TODO: store and serve from USB stick
  const captureDirectory = `public/capture`;
  const publicCaptureDirectory = `public/capture`;

  // capture an image every second
  setInterval(() => {
    const currentDate = new Date();

    const filename = `${currentDate.toISOString()}.jpg`;
    const filePath = join(captureDirectory, filename);
    const lastFramePath = join(publicCaptureDirectory, "last.jpg");

    webcam.capture(join(captureDirectory, filename), (error, data) => {
      // handle error
      if (error) {
        console.log("capturing failed", error, data);

        return;
      }

      // copy the last frame into a separate file with a known name
      copyFile(filePath, lastFramePath).catch((error) => {
        console.error("copying last frame file failed", error);
      });
    });
  }, 1000);
}
