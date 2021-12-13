import { Invite } from ".prisma/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import useOrganization from "@/hooks/useOrganization";
import { creator } from "@/utils/fetcher";
import toasts from "@/utils/toast";
import React from "react";

type CreateInvite = Pick<Invite, "email" | "organizationId" | "dueTo">;

const MemberInvite = () => {
  const { data: organization, mutate } = useOrganization();
  return (
    <form
      className="grid gap-4 md:grid-cols-3"
      onSubmit={async (event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          email: { value: string };
        };
        await toasts.promise(
          creator<CreateInvite>("/api/invite", {
            email: target.email.value,
            organizationId: organization!.id,
            dueTo: new Date(Date.now() + 604800000),
          })
        );
        mutate();
      }}
    >
      <div className="md:col-span-2">
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="college@domain.com"
        />
      </div>
      <div className="md:col-start-1">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

MemberInvite.auth = {};

export default MemberInvite;
