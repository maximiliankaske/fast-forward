import Link from "next/link";
import React, { FC } from "react";
import { format } from "date-fns";
import { Post } from "../../types";
import Badge from "../ui/Badge";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import Heading from "../ui/Heading";

const tags = ["blue", "gray", "red", "pink", "purple"] as const;

interface Props {
  post: Post;
}

const Thumbnail: FC<Props> = ({ post }) => {
  return (
    <article className="flex flex-col md:flex-row rounded-lg hover:shadow-lg border border-transparent hover:border-gray-50 dark:hover:border-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800  p-4">
      <div className="w-full md:w-48 mr-6 mb-3">
        <h1 className="pb-2">{format(new Date(post.date), "dd.MM.yyyy")}</h1>
        <div className="flex flex-1 items-center space-x-2">
          <div>
            <Image
              className="inline-block h-10 w-10 rounded-full"
              src={post.authorPicture}
              alt="author profile picture"
              width={40}
              height={40}
            />
          </div>
          <div className="text-sm font-medium">
            <p className="text-gray-700 dark:text-gray-300">
              {post.authorName}
            </p>
            <a
              className="text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400"
              href="https://twitter.com/KaskeCelestin"
              target="_blank"
              rel="noreferrer"
            >
              @celeska
            </a>
          </div>
        </div>
        <div className="w-full flex flex-wrap">
          {tags.map((i) => (
            <Badge key={i} color={i} className="mr-2 mb-1">
              {i}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <Heading as="h2">{post.slug}</Heading>
        <p className="pb-2">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}>
          <a className="inline-flex items-center text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
            Read more
            <ChevronRightIcon className="h-4 w-4" />
          </a>
        </Link>
      </div>
    </article>
  );
};

export default Thumbnail;
