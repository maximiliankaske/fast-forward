import { ChevronLeftIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import readingTime from "reading-time";
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import type { Post } from "../../types";
import Divider from "../ui/Divider";

const Header: FC<Post> = ({ title, date, section, content, coverImage }) => {
  return (
    <div className="text-lg flex flex-col mx-auto">
      <div className="text-center text-indigo-500">
        <Image src={coverImage} height={200} width={200} alt="cover image" />
      </div>
      <h1>
        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          {section}
        </span>
        <span className="mt-2 block text-5xl text-center font-extrabold tracking-tight text-gray-900 dark:text-gray-300">
          {title}
        </span>
      </h1>
      <div className="pt-2 flex justify-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
        <time dateTime="2020-03-16">
          {format(new Date(date), "dd.MM.yyyy")}
        </time>
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime(content).text}</span>
      </div>
      <div className="pt-6">
        <Link href="/blog">
          <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
            <ChevronLeftIcon className="h-4 w-4 mr-1" />
            go back
          </a>
        </Link>
        <Divider className="py-6" />
      </div>
    </div>
  );
};

export default Header;
