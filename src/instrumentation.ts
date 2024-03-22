export async function register() {
  console.log("instrumentation", process.env.NEXT_RUNTIME);

  // we only want to run this in nodejs
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("register import webcam");

    // only require the webcam module in nodejs
    const { startWebcamCapture } = await import("@/webcam");

    // start the webcam capture
    startWebcamCapture();
  }
}
