import { useAuth } from "@/lib/auth";
import { OrganizationInvite, OrganizationMember, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";
import React from "react";
import useSWR from "swr";
import Badge from "../ui/Badge";
import Heading from "../ui/Heading";
import cn from "classnames";
import { TrashIcon } from "@heroicons/react/outline";
import { deleteOrganizationInvite } from "@/lib/db";
import toasts from "@/utils/toast";

interface Props {
  organizationId: string;
}

const MemberList = ({ organizationId }: Props) => {
  const { user } = useAuth();
  const { data: membersData, mutate: membersMutate } = useSWR<{
    members: WithId<OrganizationMember>[] | undefined;
  }>(
    user ? [`/api/organization/${organizationId}/member`, user?.token] : null,
    fetcher
  );
  // FIXME: somehow mutate and fetch newest invite after submit
  const { data: invitesData, mutate: invitesMutate } = useSWR<{
    invites: WithId<OrganizationInvite>[] | undefined;
  }>(
    user ? [`/api/organization/${organizationId}/invite`, user?.token] : null,
    fetcher
  );

  const onInviteDelete = async (id: string) => {
    if (confirm("Delete invited member")) {
      await toasts.promise(deleteOrganizationInvite(organizationId, id));
      invitesMutate();
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-200">
      <Heading as="h4">Members</Heading>
      {[...(membersData?.members || []), ...(invitesData?.invites || [])]
        .sort(({ email: a }, { email: b }) => a.localeCompare(b))
        .map(({ id, role, email }) => {
          const isMember = !!membersData?.members?.find((m) => m.id === id);
          return (
            <li
              key={id}
              className={cn("py-4 flex justify-between items-center", {
                "opacity-60": !isMember,
              })}
            >
              <p className="text-gray-600 dark:text-gray-400">
                {email} {!isMember && <Badge className="ml-1">invited</Badge>}
              </p>
              <div className="flex flex-row items-center">
                {!isMember && (
                  <button
                    className="mr-3 p-1"
                    onClick={() => onInviteDelete(id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
                <Badge color={role === "owner" ? "primary" : "secondary"}>
                  {role}
                </Badge>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default MemberList;
