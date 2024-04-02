"use client";

import { api } from "@/trpc/react";
import Button from "./Button";
import { Modal, ModalProps } from "./Modal";
import { Debug } from "@/app/_components/Debug";

export type DayTimelapseModalProps = Omit<
  ModalProps,
  "title" | "footer" | "children"
>;

export const DayTimelapseModal: React.FC<DayTimelapseModalProps> = ({
  visible,
  onClose,
  ...rest
}) => {
  const { isPending, data } = api.timelapse.getCaptureFolders.useQuery();

  return (
    <Modal
      {...rest}
      visible={visible}
      loading={isPending}
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
        <Debug title="Data">{data}</Debug>
      </div>
    </Modal>
  );
};
