import { GetStaticProps } from "next";
import React, { FC } from "react";
import Thumbnail from "../../components/blog/Thumbnail";
import TimelinePath from "../../components/blog/TimelinePath";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { getAllPosts } from "../../lib/api";
import { Post } from "../../types";

interface Props {
  posts: Post[];
}

const AllPosts: FC<Props> = ({ posts }) => {
  return (
    <DefaultLayout>
      <ul>
        {posts.map((post, idx) => (
          <li key={post.slug} className="p-5 overflow-hidden">
            <div className="flex group">
              <TimelinePath
                first={idx === 0}
                className="group-hover:text-indigo-500"
              />
              <div className="ml-4">
                <Thumbnail post={post} />
              </div>
            </div>
          </li>
        ))}
      </ul>
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
