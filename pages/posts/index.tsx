import { GetStaticProps } from "next";
import Link from "next/link";
import React, { FC } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { getAllPosts } from "../../lib/api";
import { Post } from "../../types";

interface Props {
  posts: Record<keyof Pick<Post, "slug" | "authorName">, string>[];
}

const AllPosts: FC<Props> = ({ posts }) => {
  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center space-y-8">
        {posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a className="text-xl font-semibold text-gray-900 dark:text-gray-300">
                {post.slug}
              </a>
            </Link>
            <p className="text-base text-gray-500">{post.authorName}</p>
          </div>
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts(["slug", "authorName"]);
  return {
    props: {
      posts,
    },
  };
};

export default AllPosts;
