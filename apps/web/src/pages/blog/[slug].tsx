import ErrorPage from "next/error";
import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React from "react";
import Header from "@/components/post/Header";
import PostLayout from "@/components/layout/PostLayout";
import { NextSeo } from "next-seo";
import { allPosts } from "contentlayer/generated";

const Posts = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PostLayout>
      <NextSeo
        title={`Fast Forward - ${post.title}`}
        description={post.excerpt}
      />
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <Header {...post} />
          <div
            className="prose dark:prose-dark prose-lg mx-auto pb-12"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </>
      )}
    </PostLayout>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  console.log(params);
  return { props: { post } };
};

export const getStaticPaths = async () => {
  const paths = allPosts.map((post) => post.url);
  return {
    paths,
    fallback: false,
  };
};

export default Posts;
