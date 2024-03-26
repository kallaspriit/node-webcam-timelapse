"use client";

import { api } from "@/trpc/react";
import Button from "./Button";
import { Modal, ModalProps } from "./Modal";

export type DayTimelapseModalProps = Omit<ModalProps, "title" | "footer" | "children" >;

export const DayTimelapseModal: React.FC<DayTimelapseModalProps> = ({ onClose, ...rest }) => {
  const x = api.timelapse.getCaptureFolders.useQuery();
  
  return (
    <Modal
    {...rest}
    title="Configure Timelapse"
    footer={
      <div className="flex flex-row justify-between">
        <Button secondary onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => alert("Generate video..")}>Generate</Button>
      </div>
    }
    onClose={onClose}
  >
    <div>
      <p>Configure the webcam capture settings.</p>
      <pre>{JSON.stringify(x, null, '  ')}</pre>
    </div>
  </Modal>
  );
}