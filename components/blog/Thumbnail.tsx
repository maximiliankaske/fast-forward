import Link from "next/link";
import React, { FC } from "react";
import { format } from "date-fns";
import { Post } from "../../types";
import Badge from "../ui/Badge";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Image from "next/image";

const tags = ["blue", "gray", "red", "pink"] as const;

interface Props {
  post: Post;
}

const Thumbnail: FC<Props> = ({ post }) => {
  console.log(post);
  return (
    <article className="flex flex-col md:flex-row rounded-lg hover:shadow-lg border border-transparent hover:border-gray-50 p-4">
      <div className="flex-1 mr-6 mb-3 w-32 md:w-48">
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
        <div className="flex space-x-2">
          {tags.map((i) => (
            <p key={i}>
              <Badge color={i}>{i}</Badge>
            </p>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl mb-3 font-semibold">{post.slug}</h1>
        <p className="pb-3">{post.excerpt}</p>
        <div className="text-right">
          <Link href={`/posts/${post.slug}`}>
            <a className="inline-flex items-center text-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              Read more
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Thumbnail;
