import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

const Header: FC<Props> = ({ post }) => {
  const { title, authorName, authorPicture } = post;
  return (
    <div className="text-lg mx-auto">
      <h1>
        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          {/* sequence of multiple posts */}
          Introduction
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
          {title}
        </span>
      </h1>
    </div>
  );
};

export default Header;
