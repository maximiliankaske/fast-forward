import React from "react";
import type { ComponentWithAuth } from "@/components/auth/Auth";
import Heading from "@/components/ui/Heading";
import LinkContainer from "@/components/common/LinkContainer";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import useOrganization from "@/hooks/useOrganization";

const links = [
  {
    href: "/app/projects",
    label: "My Projects",
    description: "Check the Feedback Widget",
  },
];

const App: ComponentWithAuth = () => {
  const { data } = useOrganization();
  return (
    <DefaultUserLayout>
      <Heading as="h2">Dashboard</Heading>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
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

// getServerSideProps with organization

export default App;
