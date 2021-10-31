import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import { createOrganization } from "@/lib/db";
import type { Organization, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import toasts from "@/utils/toast";
import { ExclamationIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

// FIXME: CURRENT STATUS: ONLY CREATES ORGANIZATIONS

const OrganizationPage: ComponentWithAuth = () => {
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { user, loading } = useAuth();

  const { data: organizationData, mutate } = useSWR<{
    organization: WithId<Organization> | undefined;
  }>(
    !loading && name !== ""
      ? [`/api/organization/${name.toLowerCase()}`, user?.token]
      : null,
    fetcher
  );

  useEffect(() => {
    if (name !== "") {
      if (!organizationData?.organization && disabled) {
        setDisabled(false);
      } else if (organizationData?.organization && !disabled) {
        setDisabled(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationData]);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      // REMINDER: firebase.rules tbd
      await toasts.promise(
        createOrganization({
          name: name.toLocaleLowerCase(),
          authorId: user!.uid,
        })
      );
      setName("");
      mutate();
    } catch {
      console.warn("Something went wrong");
    }
  };

  const getInputState = () => {
    if (name === "") {
      return `Enter letters, numbers, "_" or "-"`;
    } else if (!/^[A-Za-z0-9_-]*$/.test(name)) {
      return (
        <>
          <ExclamationIcon className="h-4 w-4 mr-1 text-red-500" />
          {`Only use letters, numbers, "_" or "-"`}
        </>
      );
    } else if (!disabled) {
      return (
        <>
          <CheckIcon className="h-4 w-4 mr-1 text-green-500" />
          Claim the organization name
        </>
      );
    } else {
      return (
        <>
          <XIcon className="h-4 w-4 mr-1 text-red-500" />
          The organization already exists
        </>
      );
    }
  };

  return (
    <DefaultLayout>
      <Heading as="h2">Organization</Heading>
      <form className="grid md:grid-cols-3 gap-4" onSubmit={onSubmit}>
        <div className="md:col-span-2">
          <Input
            label="Name*"
            name="organization"
            placeholder="Acme"
            value={name}
            pattern={"^[A-Za-z0-9_-]*$"}
            onChange={(event) => (
              setName(event.target.value), setDisabled(true)
            )}
          />
          <p className="text-xs font-semibold pt-2 inline-flex">
            {getInputState()}
          </p>
        </div>
        <div className="md:col-start-1 md:col-span-1">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="maximilian@kaske.org"
          />
        </div>
        <div className="md:col-start-1">
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </form>
    </DefaultLayout>
  );
};

OrganizationPage.auth = {};

export default OrganizationPage;
