"use client";

import { useState } from "react";
import Button from "./_components/Button";
import { LatestFrame } from "./_components/LatestFrame";
import { Modal } from "./_components/Modal";

export default function Home() {
  const [showConfigureModal, setShowConfigureModal] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col gap-5">
          <LatestFrame />
          <div className="flex flex-row gap-2">
            <Button onClick={() => setShowConfigureModal(true)}>
              Generate timelapse
            </Button>
            {/* <Button
              secondary
              onClick={() => alert("Create video of last 24 hours")}
            >
              Last 24 hours
            </Button> */}
          </div>
        </div>
      </main>

      <Modal
        visible={showConfigureModal}
        onClose={() => setShowConfigureModal(false)}
        title="Configure Timelapse"
        footer={
          <div className="flex flex-row justify-between">
            <Button secondary onClick={() => setShowConfigureModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => alert("Generate video..")}>Generate</Button>
          </div>
        }
      >
        <div>
          <p>Configure the webcam capture settings.</p>
        </div>
      </Modal>
    </>
  );
}
