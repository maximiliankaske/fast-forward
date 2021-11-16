import React from "react";
import { FolderAddIcon } from "@heroicons/react/outline";
import EmptyState from "../common/EmptyState";

interface Props {
  onClick: () => void;
}

const TempalteEmptyState = ({ onClick }: Props) => {
  return (
    <EmptyState
      title={"No Tempaltes"}
      description="Get started by creating a new Tempalte."
      onClick={onClick}
      buttonTitle={"Duplicate Template"}
      icon={FolderAddIcon}
    />
  );
};
export default TempalteEmptyState;
