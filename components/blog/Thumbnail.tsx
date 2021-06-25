import Link from "next/link";
import React, { FC } from "react";
import { format } from "date-fns";
import { Post } from "../../types";
import Badge from "../ui/Badge";
import { ChevronRightIcon } from "@heroicons/react/solid";

interface Props {
  post: Post;
}

const Thumbnail: FC<Props> = ({ post }) => {
  console.log(post);
  return (
    <div className="flex flex-col md:flex-row overflow-hidden rounded-lg shadow-lg border border-gray-50 dark:border-gray-900 p-4">
      <div className="mr-6 mb-3 w-32 md:w-48">
        <h1>{format(new Date(post.date), "dd.MM.yyyy")}</h1>
        <div>
          <p>{post.authorName}</p>
        </div>
        <div className="flex space-x-2">
          {["asdf", "berlin", "cool", "date"].map((i) => (
            <p key={i}>
              <Badge>{i}</Badge>
            </p>
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-4xl mb-3 font-semibold">{post.slug}</h1>
        <p className="pb-3">{post.excerpt}</p>
        <div className="text-right">
          <Link href={`/posts/${post.slug}`}>
            <a className="inline-flex items-center">
              Read more
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
