import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

const LeftCol: FC<Props> = ({ post }) => {
  return (
    // self-start because in flexbox
    <div className="mb-4 lg:sticky top-8 self-start">
      <Link href="/posts">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          go back
        </a>
      </Link>
      <div className="mt-4 flex items-center">
        <div className="flex-shrink-0">
          <span className="sr-only">{post.authorName}</span>
          <Image
            className="h-10 w-10 rounded-full bg-gray-200"
            src={post.authorPicture}
            alt="author picture"
            height={40}
            width={40}
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {post.authorName}
          </p>
          <div className="flex space-x-1 text-sm text-gray-500">
            <time dateTime="2020-03-16">Mar 16, 2020</time>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftCol;
