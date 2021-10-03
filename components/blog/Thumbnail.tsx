import Link from "next/link";
import React, { FC } from "react";
import { format } from "date-fns";
import { Post } from "../../types";
import Badge from "../ui/Badge";
import Heading from "../ui/Heading";
import Divider from "../ui/Divider";

const tags = ["blue", "gray", "red", "pink", "purple"] as const;

interface Props {
  post: Post;
}

const Thumbnail: FC<Props> = ({ post }) => {
  return (
    <article className="rounded-md border hover:border-gray-300 bg-gray-50 dark:bg-gray-900 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-6 py-4">
      <Link href={`/blog/${post.slug}`}>
        <a className="focus:outline-none">
          <div className="md:flex justify-between">
            <Heading as="h3" className="max-w-xl">
              {post.title}
            </Heading>
            <div className="md:text-right">
              <p className="text-gray-600 dark:text-gray-400 pb-1">
                {format(new Date(post.date), "dd.MM.yyyy")}
              </p>
              <div className="flex flex-row md:flex-row-reverse flex-wrap">
                {tags.map((i) => (
                  <Badge
                    key={i}
                    color={i}
                    className="mr-2 md:mr-0 md:ml-2 mb-1"
                  >
                    {i}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {post.excerpt}
          </p>
        </a>
      </Link>
    </article>
  );
};

export default Thumbnail;
