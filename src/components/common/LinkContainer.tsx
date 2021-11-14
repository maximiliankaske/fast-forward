import React from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/outline";

interface Props {
  href: string;
  label: string;
  description: string;
}

const LinkContainer = ({ href, label, description }: Props) => {
  return (
    <Link href={href}>
      <a className="flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
        <div>
          <p>{label}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 ml-1" />
      </a>
    </Link>
  );
};

export default LinkContainer;
