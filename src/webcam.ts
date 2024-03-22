import { type WebcamOptions, create } from "node-webcam";

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

  setInterval(() => {
    console.log("capture");

    webcam.capture("public/capture.jpg", (err, data) => {
      console.log(err, data);
    });
  }, 1000);
}
