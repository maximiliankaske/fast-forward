import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { FolderAddIcon } from "@heroicons/react/outline";
import Button from "../ui/Button";

interface Props {
  onClick: () => void;
}

const EmptyState = ({ onClick }: Props) => {
  return (
    <div className="text-center">
      <FolderAddIcon className="mx-auto h-12 w-12 text-gray-400" />

      <h3 className="mt-2 text-sm font-medium">No projects</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new project.
      </p>
      <div className="mt-6">
        <Button onClick={onClick} className="inline-flex items-center" reverse>
          <PlusIcon className="-ml-1 mr-1 h-5 w-5" aria-hidden="true" />
          New Project
        </Button>
      </div>
    </div>
  );
};
export default EmptyState;
