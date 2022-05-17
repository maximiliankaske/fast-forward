import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import React from "react";
import prisma from "@/lib/prisma";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import fetcher from "@/utils/fetcher";

const pricing = {
  vercel: {
    href: "https://vercel.com",
    cost: "free",
  },
  planetscale: {
    href: "https://planetscale.com",
    cost: "free",
  },
  github: {
    href: "https://github.com",
    cost: "free",
  },
  domain: {
    href: "https://vercel.com",
    cost: "$20/year",
  },
  cloudinary: {
    href: "https://cloudinary.com",
    cost: "free",
  },
  // crisp: {
  //   href: "crisp.chat",
  //   cost: "free",
  // },
  postmarkapp: {
    href: "https://postmarkapp.com",
    cost: "free",
  },
} as const;

const OpenPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <DefaultLayout className="space-y-3">
      <Heading>Open</Heading>
      <div>
        <Heading as="h3">Data</Heading>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {Object.keys(props).map((i) => (
            <li key={i} className="flex items-end space-x-2">
              <Heading as="h4">
                {props[i]}{" "}
                <span className="text-gray-600 dark:text-gray-400">{i}</span>
              </Heading>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Heading as="h3">Costs</Heading>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {Object.entries(pricing).map(([k, v]) => (
            <li key={k} className="flex items-center space-x-2">
              <Heading as="h4">
                {`${v.cost} `}
                <Link href={v.href}>
                  <a
                    target="_blank"
                    rel="noopener"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {k}
                  </a>
                </Link>
              </Heading>
            </li>
          ))}
        </ul>
      </div>
    </DefaultLayout>
  );
};

export const getServerSideProps = async () => {
  const projects = await prisma.project.findMany();
  const feedbacks = await prisma.feedback.findMany();
  const users = await prisma.user.findMany();

  const BASE_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL}`;

  const screenshots = await fetcher(`${BASE_URL}/api/cloudinary`);
  return {
    props: {
      projects: projects.length,
      feedbacks: feedbacks.length,
      users: users.length,
      resets: projects.reduce((prev, curr) => curr.reseted + prev, 0),
      screenshots: screenshots as number,
    },
  };
};

export default OpenPage;
