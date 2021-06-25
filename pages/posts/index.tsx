import { GetStaticProps } from "next";
import React, { FC } from "react";
import Thumbnail from "../../components/blog/Thumbnail";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { getAllPosts } from "../../lib/api";
import { Post } from "../../types";

interface Props {
  posts: Post[];
}

const AllPosts: FC<Props> = ({ posts }) => {
  return (
    <DefaultLayout>
      <div className="flex flex-col justify-center space-y-8">
        {posts.map((post) => (
          <Thumbnail key={post.slug} post={post} />
        ))}
      </div>
    </DefaultLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getAllPosts([
    "title",
    "excerpt",
    "date",
    "slug",
    "authorName",
    "authorPicture",
    "content",
    "ogImageUrl",
    "coverImage",
  ]);
  return {
    props: {
      posts,
    },
  };
};

export default AllPosts;
