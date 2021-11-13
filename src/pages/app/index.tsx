import { ArrowRightIcon, PlusIcon } from "@heroicons/react/solid";
import React from "react";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

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
];

const App: ComponentWithAuth = () => {
  return (
    <DefaultLayout>
      <Heading as="h2">Dashboard</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {links.map(({ href, label, description }) => (
          <Link key={href} href="/app/organization">
            <a className="flex items-center justify-between px-3 py-2 rounded-md border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900">
              <div>
                <p>{label}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {description}
                </p>
              </div>
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </a>
          </Link>
        ))}
      </div>
    </DefaultLayout>
  );
};

App.auth = {};

export default App;
