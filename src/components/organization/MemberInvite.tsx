import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { createOrganizationInvite } from "@/lib/db";
import React from "react";

interface Props {
  organizationId: string;
}

const MemberInvite = ({ organizationId }: Props) => {
  return (
    <form
      className="grid md:grid-cols-3 gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
          email: { value: string };
        };
        createOrganizationInvite({
          email: target.email.value,
          role: "member",
          organizationId,
        });
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
