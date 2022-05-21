import { Heading, Text } from "@fast-forward/ui";
import Link from "next/link";
import React from "react";
import IconBg from "../ui/IconBg";

const features = [
  {
    icon: "⚡️",
    title: "Fast Integration",
    // TODO: change copy
    description:
      "Less than 5 lines of code. Choose a button and we'll make it collect feedback.",
  },
  {
    icon: "📱",
    title: "Device Data",
    description:
      "Available data as location and user agent are collected automatically within the feedback.",
  },
  {
    icon: "💽",
    title: "Custom Metadata",
    description: "Append any information you want to the feedback. ",
  },
  {
    icon: "📸",
    title: "Browser Screenshots",
    description:
      "Use the built-in screenshot option to see the what your user sees.",
  },
  {
    icon: "🌍",
    title: "Select language",
    description: "",
  },
  {
    icon: "💅",
    title: "Customizable",
    description:
      "Not interested in the widget? Create your own form and use the API to send the feedback from wherever you want.",
  },
];

const Features = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {features.map(({ icon, title, description }) => (
        <Link key={title} href="/">
          <a className="p-3 -mx-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black focus:ring-indigo-500">
            <IconBg>{icon}</IconBg>
            <Heading as="h3">{title}</Heading>
            <Text variant="description">{description}</Text>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Features;
