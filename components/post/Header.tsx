import { ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import type { Post } from "../../types";
import Avatar from "../ui/Avatar";

interface Props {
  post: Post;
}

const Header: FC<Props> = ({ post }) => {
  const { title, authorName, authorPicture } = post;
  return (
    <div className="text-lg flex flex-col mx-auto">
      <h1>
        <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
          {/* sequence of multiple posts */}
          Introduction
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 dark:text-gray-300 sm:text-4xl">
          {title}
        </span>
      </h1>
      <div className="pt-1 flex justify-center space-x-1 text-sm text-gray-500">
        <time dateTime="2020-03-16">Mar 16, 2020</time>
        <span aria-hidden="true">&middot;</span>
        <span>6 min read</span>
      </div>
      <Avatar
        imgSrc={post.authorPicture}
        name={post.authorName}
        some="@twitter"
        className="mt-5 self-center block xl:hidden"
      />
    </div>
  );
};

export default Header;
