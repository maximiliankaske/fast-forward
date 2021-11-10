import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import IconButton from "@/components/ui/IconButton";
import Input from "@/components/ui/Input";
import Link from "@/components/ui/Link";
import { useAuth } from "@/lib/auth";
import { updateTemplate } from "@/lib/db";
import { ArrowRightIcon } from "@heroicons/react/solid";
import { TrashIcon, BellIcon, ClockIcon } from "@heroicons/react/outline";
import React from "react";
import useTemplates from "src/hooks/useTemplates";

const Templates: ComponentWithAuth = () => {
  const { user } = useAuth();
  const { data, mutate } = useTemplates();

  return (
    <DefaultLayout>
      <div className="text-right mb-8">
        <Link href="app/all-templates" className="inline-flex items-center">
          Duplicate Template
          <ArrowRightIcon className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <ul className="space-y-6">
        {data?.templates.map((template) => {
          const organizationId = user!.customClaims!.organizationId;
          return (
            <li
              key={template.id}
              className="rounded-md overflow-hidden border border-gray-100 dark:border-gray-900"
            >
              <div className="flex items-center justify-between px-3 py-3">
                <p className="text-lg font-semibold">
                  {template.label}
                  <span className="ml-2 text-sm font-extrabold">
                    #{template.questions.length}
                  </span>
                </p>
                <TrashIcon className="h-4 w-4 text-red-500" />
              </div>
              <div className="px-3 py-4 bg-gray-100 dark:bg-gray-900 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between md:space-x-4 space-y-3 md:space-y-0">
                  <div className="flex-1 w-full md:max-w-md">
                    <Input
                      variant="sm"
                      label="Name"
                      name="name"
                      placeholder="Name your survey"
                      srOnly
                    />
                  </div>
                  <div className="flex-1 w-full flex space-x-4">
                    <div className="flex-1 flex space-x-4">
                      <IconButton
                        className="h-[30px] w-[30px]"
                        active={template.notifications}
                        onClick={async () => {
                          await updateTemplate({
                            organizationId,
                            ...template,
                            notifications: !template.notifications,
                          });
                          mutate();
                        }}
                      >
                        <BellIcon className="h-6 w-6" />
                      </IconButton>
                      <IconButton
                        active={!!template.dueTo}
                        className="h-[30px] w-[30px]"
                      >
                        <ClockIcon
                          className="h-6 w-6"
                          onClick={async () => {
                            const date = new Date(
                              Date.now() + 7 * 24 * 60 * 60 * 1000 // in 7 days
                            );
                            const dueTo = template.dueTo
                              ? null
                              : date.toUTCString();
                            await updateTemplate({
                              organizationId,
                              ...template,
                              dueTo,
                            });
                            mutate();
                          }}
                        />
                      </IconButton>
                    </div>
                    <button className="inline-flex items-center text-sm">
                      Start survey
                      <ArrowRightIcon className="h-3 w-3 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </DefaultLayout>
  );
};

Templates.auth = {};

export default Templates;
