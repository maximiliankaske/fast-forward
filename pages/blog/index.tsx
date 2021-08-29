import { InferGetStaticPropsType } from "next";
import React from "react";
import Thumbnail from "../../components/blog/Thumbnail";
import TimelinePath from "../../components/blog/TimelinePath";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { getAllPosts } from "../../lib/api";

const AllPosts = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps = async () => {
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
