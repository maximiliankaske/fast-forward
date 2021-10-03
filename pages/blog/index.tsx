import { InferGetStaticPropsType } from "next";
import React from "react";
import Thumbnail from "../../components/blog/Thumbnail";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Heading from "../../components/ui/Heading";
import WidgetFABExample from "../../components/widget/WidgetFABExample";
import { getAllPosts } from "../../lib/api";

const AllPosts = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <DefaultLayout>
      <Heading>Blog</Heading>
      <p className="text-gray-600 dark:text-gray-400 mb-10">
        All the latest Fast Forward news, straight from the team.
      </p>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Thumbnail post={post} />
          </li>
        ))}
      </ul>
      <WidgetFABExample />
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
