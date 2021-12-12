import React from "react";
import templates from "@/config/templates";
import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import Thumbnail from "@/components/template/Thumbnail";
import Link from "@/components/ui/Link";
import { ArrowRightIcon } from "@heroicons/react/solid";

// THIS PAGE IS NOT PROTECTED

const AllTemplates: ComponentWithAuth = () => {
  return (
    <DefaultUserLayout>
      <div className="pb-6">
        <Link href="/app/templates" className="inline-flex items-center">
          My Templates
          <ArrowRightIcon className="w-4 h-4 ml-1" />
        </Link>
      </div>
      <ul className="space-y-4">
        {Object.keys(templates).map((key) => {
          const template = templates[key as keyof typeof templates];
          return (
            <li key={key}>
              <Thumbnail {...template} />
            </li>
          );
        })}
      </ul>
    </DefaultUserLayout>
  );
};

export default AllTemplates;
