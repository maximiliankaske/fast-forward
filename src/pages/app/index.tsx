import { ArrowRightIcon, PlusIcon } from "@heroicons/react/solid";
import React from "react";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import LinkContainer from "@/components/common/LinkContainer";

const links = [
  {
    href: "/app/organization",
    label: "My Organization",
    description: "Manage your organization",
  },
  {
    href: "/app/projects",
    label: "My Projects",
    description: "Check the Feedback Widget",
  },
  {
    href: "/app/templates",
    label: "My Templates",
    description: "Start your team survey",
  },
  {
    href: "/app/all-templates",
    label: "All Templates",
    description: "Duplicate your ideal template",
  },
];

const App: ComponentWithAuth = () => {
  return (
    <DefaultLayout>
      <Heading as="h2">Dashboard</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {links.map(({ href, label, description }) => (
          <LinkContainer key={href} {...{ href, label, description }} />
        ))}
      </div>
    </DefaultLayout>
  );
};

App.auth = {};

export default App;
