import { ComponentWithAuth } from "@/components/auth/Auth";
import DefaultLayout from "@/components/layout/DefaultLayout";
import MemberList from "@/components/organization/MemberList";
import Button from "@/components/ui/Button";
import Divider from "@/components/ui/Divider";
import Heading from "@/components/ui/Heading";
import Input from "@/components/ui/Input";
import { useAuth } from "@/lib/auth";
import {
  createOrganization,
  createOrganizationInvite,
  createOrganizationMember,
} from "@/lib/db";
import type { Organization, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import toasts from "@/utils/toast";
import { ExclamationIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import React, { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";

// FIXME: CURRENT STATUS: ONLY CREATES ORGANIZATIONS
// TODO: refactor organization to use firebase ID!!!!! Otherwise, to change the name of an organization
// I have to duplicate every doc with all the sub collections. Not very convienient

const OrganizationPage: ComponentWithAuth = () => {
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { user, loading, refreshToken } = useAuth();

  const { data: organizationData, mutate } = useSWR<{
    organization: WithId<Organization> | undefined;
  }>(
    !loading && (name !== "" || user?.customClaims?.organizationId)
      ? [
          `/api/organization/${
            name.toLowerCase() || user?.customClaims?.organizationId
          }`,
          user?.token,
        ]
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
    } else {
      if (organizationData?.organization) {
        setName(organizationData?.organization.name);
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
        }).then(() =>
          createOrganizationMember({
            role: "owner",
            organizationId: name.toLocaleLowerCase(),
            userId: user?.uid,
            email: user?.email || "",
          })
            .then(() =>
              fetcher(
                `/api/organization/${name.toLocaleLowerCase()}/member/${
                  user!.uid
                }`,
                user!.token
              )
            )
            .then(() => refreshToken())
        )
      );
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
          <ExclamationIcon className="h-3 w-3 mr-1 text-red-500" />
          {`Only use letters, numbers, "_" or "-"`}
        </>
      );
    } else if (!disabled) {
      return (
        <>
          <CheckIcon className="h-3 w-3 mr-1 text-green-500" />
          Claim the organization name
        </>
      );
    } else {
      return (
        <>
          <XIcon className="h-3 w-3 mr-1 text-red-500" />
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
          <p className="text-sm font-semibold pt-2 inline-flex items-center">
            {getInputState()}
          </p>
        </div>
        <div className="md:col-start-1">
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </form>
      <Divider className="py-6" />
      {organizationData?.organization &&
        organizationData?.organization.authorId === user?.uid && (
          <form
            className="grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              const target = event.target as typeof event.target & {
                email: { value: string };
              };
              createOrganizationInvite({
                email: target.email.value,
                role: "member",
                organizationId: organizationData.organization!.id,
              });
            }}
          >
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="college@domain.com"
            />
            <Button type="submit">Submit</Button>
          </form>
        )}
      <Divider className="py-8" />
      {organizationData?.organization && (
        <MemberList organizationId={organizationData.organization.id} />
      )}
    </DefaultLayout>
  );
};

OrganizationPage.auth = {};

export default OrganizationPage;
