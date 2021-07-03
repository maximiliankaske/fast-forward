import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";
import Badge from "../ui/Badge";
import Divider from "../ui/Divider";

const tags = ["blue", "gray", "red", "pink", "purple"] as const;

interface Props {
  post: Post;
}

const LeftCol: FC<Props> = ({ post }) => {
  return (
    // self-start because in flexbox
    <div className="mb-4 lg:sticky top-8 self-start">
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
            <span>@celeska</span>
          </div>
        </div>
      </div>
      <Divider className="py-6" />
      <p className="text-xs leading-5 tracking-wide uppercase text-gray-500">
        Previous article
      </p>
      <Link href="/">
        <a className="mb-4 flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          Previous steps for OpenOxyen
        </a>
      </Link>
      <p className="text-xs leading-5 tracking-wide uppercase text-gray-500">
        Next article
      </p>
      <Link href="/">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          Next steps for OpenOxyen
        </a>
      </Link>
      <Divider className="py-6" />
      <p className="text-xs leading-5 tracking-wide uppercase text-gray-500 pb-2">
        Defined Tags
      </p>
      <div className="w-full flex flex-wrap">
        {tags.map((i) => (
          <Badge key={i} color={i} className="mr-2 mb-1">
            {i}
          </Badge>
        ))}
      </div>
      <Divider className="py-6" />
      <Link href="/posts">
        <a className="flex items-center text-gray-500 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-300">
          <ChevronLeftIcon className="h-4 w-4 mr-1" />
          go back
        </a>
      </Link>
    </div>
  );
};

export default LeftCol;
