import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import React from "react";
import prisma from "@/lib/prisma";
import { InferGetServerSidePropsType } from "next";

const pricing = {
  vercel: "free",
  planetscale: "free",
  github: "free",
  domain: "$20/year",
} as const;

const OpenPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <DefaultLayout className="space-y-3">
      <Heading>Open</Heading>
      <div>
        <Heading as="h3">App</Heading>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {(["projects", "feedbacks"] as const).map((i) => (
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
        <Heading as="h3">Pricing</Heading>
        <ul className="grid grid-cols-2 sm:grid-cols-4">
          {Object.entries(pricing).map(([k, v]) => (
            <li key={k} className="flex items-center space-x-2">
              <Heading as="h4">
                {v}{" "}
                <span className="text-gray-600 dark:text-gray-400">{k}</span>
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
  return {
    props: {
      projects: projects.length,
      feedbacks: feedbacks.length,
    },
  };
};

export default OpenPage;
