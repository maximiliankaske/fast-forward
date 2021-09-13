import React from "react";
import Link from "next/link";
import { Project, WithId } from "../../types";
import { CogIcon } from "@heroicons/react/solid";

const Thumbnail = ({ id, name, authorId }: WithId<Project>) => {
  return (
    <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 bg-gray-100 rounded-full" />
      </div>
      <div className="flex-1 min-w-0">
        <Link href={`/app/${id}`}>
          <a className="flex-1 focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-900">{name}</p>
            <p className="text-sm text-gray-500 truncate">{authorId}</p>
          </a>
        </Link>
      </div>
      <Link href={`/app/${id}/settings`}>
        <a className="self-center focus:outline-none z-10">
          <CogIcon className="h-6 w-6 text-gray-700 hover:text-gray-900" />
        </a>
      </Link>
    </div>
  );
};

export default Thumbnail;
