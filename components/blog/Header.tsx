import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

const Header: FC<Props> = ({ post }) => {
  const { title, excerpt, authorName, authorPicture } = post;
  return (
    <div className="text-lg max-w-prose mx-auto">
      <Link href="/posts">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          go back
        </a>
      </Link>
      <h1>
        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          {/* sequence of multiple posts */}
          Introduction
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
          {title}
        </span>
      </h1>
      <div className="mt-8 flex items-center">
        <div className="flex-shrink-0">
          <span className="sr-only">{authorName}</span>
          <Image
            className="h-10 w-10 rounded-full bg-gray-200"
            src={authorPicture}
            alt="author picture"
            height={40}
            width={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {authorName}
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime="2020-03-16">Mar 16, 2020</time>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 leading-8">
        {excerpt}
      </p>
    </div>
  );
};

export default Header;
