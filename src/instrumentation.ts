export async function register() {
  // we only want to run this in nodejs
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // only require the webcam module in nodejs
    const { startWebcamCapture } = await import("@/webcam");

    // start the webcam capture
    startWebcamCapture();
  }
}
