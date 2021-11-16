import React from "react";
import Link from "next/link";
import { Project, WithId } from "@/types/index";
import { CogIcon } from "@heroicons/react/outline";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const Thumbnail = ({ id, name, private: privatly }: WithId<Project>) => {
  return (
    <div className="relative rounded-lg border hover:border-gray-300 bg-gray-50 dark:bg-gray-900 px-6 py-5 shadow-sm flex items-center space-x-3 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex-1 min-w-0">
        <Link href={`/app/projects/${id}`}>
          <a className="flex-1 focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="inline-flex items-center text-sm font-medium text-gray-900 dark:text-white">
              {name}
              {privatly ? (
                <EyeOffIcon className="h-3 w-3 ml-3" />
              ) : (
                <EyeIcon className="h-3 w-3 ml-3" />
              )}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{`ID: ${id}`}</p>
          </a>
        </Link>
      </div>
      <Link href={`/app/projects/${id}/settings`}>
        <a className="self-center z-10 text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-gray-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <CogIcon className="h-6 w-6" />
        </a>
      </Link>
    </div>
  );
};

export default Thumbnail;
