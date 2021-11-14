import React from "react";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import Heading from "@/components/ui/Heading";
import LinkContainer from "@/components/common/LinkContainer";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import useOrganization from "@/hooks/useOrganization";
import Blockquote from "@/components/ui/Blockquote";

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
  const { data } = useOrganization();
  return (
    <DefaultUserLayout>
      <Heading as="h2" className="text-center mb-6">
        Dashboard
      </Heading>
      {/* Reminder to myself when I start a new firebase db */}
      {!data?.organization && (
        <Blockquote>
          You are missing an organization. Please create one before moving
          forward.
        </Blockquote>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {links.map(({ href, label, description }) => (
          <LinkContainer key={href} href={href}>
            <LinkContainer.Title>{label}</LinkContainer.Title>
            <LinkContainer.Description>{description}</LinkContainer.Description>
          </LinkContainer>
        ))}
      </div>
    </DefaultUserLayout>
  );
};

App.auth = {};

export default App;
