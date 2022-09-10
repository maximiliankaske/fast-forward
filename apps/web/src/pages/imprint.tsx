import MDXLayout from "@/components/layout/MDXLayout";
import { Heading, Link, Text } from "@fast-forward/ui";
import React from "react";

const contacts = {
  twitter: {
    label: "@mxkaske",
    url: "https://twitter.com/mxkaske",
  },
  linkedin: {
    label: "mxkaske",
    url: "https://www.linkedin.com/in/mxkaske/",
  },
  email: {
    label: "maximilian@kaske.org",
    url: "mailto:maximilian@kaske.org",
  },
  phone: {
    label: "+4915773121555",
    url: "tel:+4915773121555",
  },
} as const;

const ImprintPage = () => {
  return (
    <MDXLayout>
      <Heading>Imprint</Heading>
      <Text>Fast Forward is developed by Maximilian Kaske</Text>
      <Text variant="description">
        This is an experimental project. The usage is free of charge and without
        warranty.
      </Text>
      <ul>
        {Object.entries(contacts).map(([key, value]) => {
          return (
            <li key={key}>
              {key}:{" "}
              <Link href={value.url} target="_blank">
                {value.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </MDXLayout>
  );
};

export default ImprintPage;
