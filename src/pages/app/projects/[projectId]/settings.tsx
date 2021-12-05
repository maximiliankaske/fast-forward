import { useRouter } from "next/router";
import React, { useCallback, FormEvent } from "react";
import useSWR from "swr";
import DefaultUserLayout from "@/components/layout/DefaultUserLayout";
import fetcher, { deletor, updator } from "@/utils/fetcher";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Switch from "@/components/ui/Switch";
import toasts from "@/utils/toast";
import { ComponentWithAuth } from "@/components/auth/Auth";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import prisma from "@/lib/prisma";
import { Feedback, WidgetProject } from ".prisma/client";

// TODO: remove publically as state - use the data.project.private boolean
// Problem: on first render of the Switch Component - it will have no data and so the wrong value
// Create Indicator and fetch dat first

const Settings: ComponentWithAuth = ({
  fallbackData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { projectId } = router.query;

  const { data, mutate } = useSWR<WidgetProject & { feedbacks: Feedback[] }>(
    `/api/projects/${projectId}`,
    fetcher,
    { fallbackData }
  );

  const update = useCallback(
    async (data: Partial<WidgetProject>) => {
      toasts.promise(
        updator(`/api/projects/${projectId}`, data).then(() => mutate())
      );
    },
    [mutate, projectId]
  );

  const _delete = useCallback(() => {
    toasts.promise(
      deletor(`/api/projects/${projectId}`).then(() =>
        router.replace("/app/projects")
      )
    );
  }, [projectId, router]);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const target = event.target as typeof event.target & {
        name: { value: string };
      };
      await update({ name: target.name.value });
    },
    [update]
  );

  const handleDelete = useCallback(async () => {
    const res = confirm("Delete?");
    if (res) _delete();
  }, [_delete]);

  const handleReset = useCallback(() => {
    const res = confirm("Reset");
    if (res) {
      toasts.promise(
        Promise.all(
          data?.feedbacks.map(async (feedback) => {
            await deletor(`/api/feedback/${feedback.id}`);
          }) || []
        )
      );
    }
  }, [data?.feedbacks]);

  return (
    <DefaultUserLayout>
      <div className="pt-6 space-y-8">
        <form
          className="overflow-hidden border border-gray-200 rounded-md dark:border-gray-800"
          onSubmit={onSubmit}
        >
          <div className="p-5 space-y-1">
            <h2 className="text-lg font-medium leading-6">Project settings</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Update your billing information. Please note that updating your
              location could affect your tax rates.
            </p>
            <Input name="name" label="Name" defaultValue={data?.name} />
          </div>
          <div className="px-5 py-3 text-right border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <Button
              type="submit"
              // disabled={data?.project.name === name}
              reverse
            >
              Save
            </Button>
          </div>
        </form>
        <div className="px-5 py-3 space-y-3 border border-indigo-500 divide-y rounded-md dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium leading-6">
                Project Accessibility
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your project is currently set to:{" "}
                <span className="font-medium text-gray-900 dark:text-white">
                  {!data?.private
                    ? "public (everyone with the link can access it)"
                    : "private (only you have access)"}
                </span>
              </p>
            </div>
            <Switch
              checked={!!data?.private}
              onChange={() => update({ private: !data?.private })}
              label="Enable public project"
            />
          </div>
        </div>
        <div className="px-5 py-3 space-y-3 border border-red-500 divide-y divide-gray-200 rounded-md dark:bg-gray-900 dark:divide-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium leading-6">Reset Project</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Removes all feedbacks but keeps the configuration.
              </p>
            </div>
            <Button onClick={handleReset} deconstruct>
              Reset
            </Button>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div>
              <h2 className="text-lg font-medium leading-6">Delete Project</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please note that this is not reversable. Be certain.
              </p>
            </div>
            <Button onClick={handleDelete} deconstruct reverse>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </DefaultUserLayout>
  );
};

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ projectId: string }>) => {
  const entry = await prisma.widgetProject.findUnique({
    where: {
      id: params?.projectId,
    },
    include: {
      feedbacks: true,
    },
  });

  return {
    props: {
      fallbackData: entry || undefined,
    },
  };
};

// Settings.auth = {};

export default Settings;
