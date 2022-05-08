import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import React from "react";
import prisma from "@/lib/prisma";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";

const pricing = {
  vercel: {
    href: "vercel.com",
    cost: "free",
  },
  planetscale: {
    href: "planetscale.com",
    cost: "free",
  },
  github: {
    href: "github.com",
    cost: "free",
  },
  domain: {
    href: "vercel.com",
    cost: "$20/year",
  },
  cloudinary: {
    href: "cloudinary.com",
    cost: "free",
  },
  // crisp: {
  //   href: "crisp.chat",
  //   cost: "free",
  // },
  postmarkapp: {
    href: "postmarkapp.com",
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
          {(["projects", "feedbacks", "users", "resets"] as const).map((i) => (
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
                  <a className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
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
  return {
    props: {
      projects: projects.length,
      feedbacks: feedbacks.length,
      users: users.length,
      resets: projects.reduce((prev, curr) => curr.reseted + prev, 0),
    },
  };
};

export default OpenPage;
