"use client";

import Button from "./_components/Button";
import { LatestFrame } from "./_components/LatestFrame";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col gap-5">
        <LatestFrame />
        <div className="flex flex-row gap-2">
          <Button onClick={() => alert("Create video all time")}>
            All time
          </Button>
          <Button
            secondary
            onClick={() => alert("Create video of last 24 hours")}
          >
            Last 24 hours
          </Button>
        </div>
      </div>
    </main>
  );
}
