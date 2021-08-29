import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React from "react";
import markdownToHtml from "../../lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import Header from "../../components/post/Header";
import PostLayout from "../../components/layout/PostLayout";
import LeftCol from "../../components/post/LeftCol";
import Divider from "../../components/ui/Divider";
import BottomRow from "../../components/post/BottomRow";

const Posts = ({ post }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <PostLayout>
      <Head>
        <title>{post.title} | Fast Forward Blog</title>
        <meta property="og:image" content={post.ogImageUrl} />
      </Head>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <Image
              src={post.coverImage}
              height={200}
              width={200}
              alt="cover image"
            />
          </div>
          <Header post={post} />
          <Divider className="py-8" />
          <div className="xl:grid xl:grid-cols-4 xl:gap-x-6">
            <LeftCol post={post} />

            <div className="xl:pb-0 xl:col-span-3 xl:row-span-2">
              <div
                className="prose dark:prose-dark prose-lg max-w-none mx-auto"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </div>
          <BottomRow />
        </div>
      )}
    </PostLayout>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const post = getPostBySlug(params?.slug as string, [
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
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths = async () => {
  const posts = getAllPosts(["slug", "date"]).sort((post1, post2) =>
    post1.date > post2.date ? -1 : 1
  );

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
};

export default Posts;
