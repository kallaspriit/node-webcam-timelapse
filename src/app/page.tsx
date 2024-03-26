"use client";

import { useState } from "react";
import Button from "./_components/Button";
import { LatestFrame } from "./_components/LatestFrame";
import { DayTimelapseModal } from "@/app/_components/DayTimelapseModal";

export default function Home() {
  const [showDayTimelapseModal, setShowDayTimelapseModal] = useState(false);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container max-w-[1280px] flex flex-col gap-10">
          <LatestFrame />
          <div className="flex flex-row gap-2">
            <Button onClick={() => setShowDayTimelapseModal(true)}>
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

      <DayTimelapseModal visible={showDayTimelapseModal} onClose={() => setShowDayTimelapseModal(false)} />
    </>
  );
}
