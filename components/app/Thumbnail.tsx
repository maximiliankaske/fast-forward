import React from "react";
import Link from "next/link";
import { Project, WithId } from "../../types";
import { CogIcon } from "@heroicons/react/outline";

const Thumbnail = ({ id, name, authorId }: WithId<Project>) => {
  return (
    <div className="relative rounded-lg border bg-white dark:bg-gray-900 px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 bg-gray-100 rounded-full" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/app/${id}`}>
          <a className="flex-1 focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {name}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{`ID: ${id}`}</p>
          </a>
        </Link>
      </div>
      <Link href={`/app/${id}/settings`}>
        <a className="self-center z-10 text-gray-700 dark:text-white dark:hover:text-gray-300 hover:text-gray-900 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <CogIcon className="h-6 w-6" />
        </a>
      </Link>
    </div>
  );
};

export default Thumbnail;
