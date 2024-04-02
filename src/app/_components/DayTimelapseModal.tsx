"use client";

import { api } from "@/trpc/react";
import Button from "./Button";
import { Modal, ModalProps } from "./Modal";
import { Debug } from "@/app/_components/Debug";
import { useEffect, useState } from "react";
import { set } from "zod";

export type DayTimelapseModalProps = Omit<
  ModalProps,
  "title" | "footer" | "children" | "loading"
>;

export const DayTimelapseModal: React.FC<DayTimelapseModalProps> = ({
  visible,
  onClose,
  ...rest
}) => {
  const { isPending, data } = api.timelapse.getCaptureFolders.useQuery();
  const { mutate } = api.timelapse.createDayTimelapse.useMutation();
  const [chosenPath, setChosenPath] = useState<string>();

  useEffect(() => {
    const firstPath = data && data[0]?.path;

    if (!firstPath || chosenPath) {
      return;
    }

    setChosenPath(firstPath);
  }, [data]);

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
          <Button
            disabled={!chosenPath}
            onClick={() =>
              mutate({
                path: chosenPath!,
              })
            }
          >
            Generate
          </Button>
        </div>
      }
      onClose={onClose}
    >
      {data && (
        <div>
          <p>Choose date</p>
          <select
            onChange={(e) => setChosenPath(e.target.value)}
            className="px-3 py-2"
          >
            {data.map(({ date, path }) => (
              <option key={path} value={path}>
                {date.toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}
    </Modal>
  );
};
