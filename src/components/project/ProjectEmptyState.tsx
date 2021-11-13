import React from "react";
import { FolderAddIcon } from "@heroicons/react/outline";
import EmptyState from "../common/EmptyState";

interface Props {
  onClick: () => void;
}

const ProjectEmptyState = ({ onClick }: Props) => {
  return (
    <EmptyState
      title={"No projects"}
      description="Get started by creating a new project."
      onClick={onClick}
      buttonTitle={"New Project"}
      icon={FolderAddIcon}
    />
  );
};
export default ProjectEmptyState;
