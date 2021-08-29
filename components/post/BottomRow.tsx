import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";
import Badge from "../ui/Badge";
import Divider from "../ui/Divider";

const tags = ["blue", "gray", "red", "pink", "purple"] as const;

const BottomRow: FC = () => {
  return (
    <div className="pt-6 block xl:hidden">
      <div className="flex justify-between">
        <div>
          <p className="text-xs leading-5 tracking-wide uppercase text-gray-500">
            Previous article
          </p>
          <Link href="/">
            <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
              Previous steps for OpenOxyen
            </a>
          </Link>
        </div>
        <div>
          <p className="text-xs text-right leading-5 tracking-wide uppercase text-gray-500">
            Next article
          </p>
          <Link href="/">
            <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
              Next steps for OpenOxyen
            </a>
          </Link>
        </div>
      </div>
      <Divider className="py-6" />
      <div className="flex flex-col items-center">
        <p className="text-xs leading-5 tracking-wide uppercase text-gray-500 pb-2">
          Defined Tags
        </p>
        <div className="flex flex-wrap">
          {tags.map((i) => (
            <Badge key={i} color={i} className="mr-2 mb-1">
              {i}
            </Badge>
          ))}
        </div>
      </div>
      <Divider className="py-6" />
      <Link href="/blog">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          go back
        </a>
      </Link>
    </div>
  );
};

export default BottomRow;
