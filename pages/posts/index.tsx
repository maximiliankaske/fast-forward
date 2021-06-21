import { GetStaticProps } from "next";
import React, { FC } from "react";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Link from "../../components/ui/Link";
import { getAllPosts } from "../../lib/api";
import { Post } from "../../types";

interface Props {
  posts: Record<keyof Pick<Post, "slug" | "authorName">, string>[];
}

const AllPosts: FC<Props> = ({ posts }) => {
  return (
    <DefaultLayout>
      {posts.map((post) => (
        <div key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <p>{post.slug}</p>
          </Link>
          <p>{post.authorName}</p>
        </div>
      ))}
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
