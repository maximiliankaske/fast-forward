import ErrorPage from "next/error";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import React, { FC } from "react";
import MDXLayout from "../../components/layout/MDXLayout";
import markdownToHtml from "../../lib/markdownToHtml";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

const Posts: FC<Props> = ({ post }) => {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <MDXLayout>
      <Head>
        <title>{post.title} | Fast Forward Blog</title>
        <meta property="og:image" content={post.ogImageUrl} />
      </Head>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <div>
          <Image
            src={post.coverImage}
            height={150}
            width={150}
            alt="cover image"
          />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      )}
    </MDXLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = getPostBySlug(params?.slug as string, [
    "title",
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
