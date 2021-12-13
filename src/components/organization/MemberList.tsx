import { deletor } from "@/utils/fetcher";
import React from "react";
import Badge from "../ui/Badge";
import { TrashIcon } from "@heroicons/react/outline";
import toasts from "@/utils/toast";
import useOrganization from "@/hooks/useOrganization";

const MemberList = () => {
  const { data: organization, mutate } = useOrganization();
  const members = organization?.members || [];
  const invites = organization?.invites || [];
  const onInviteDelete = async (id: string) => {
    if (confirm("Delete invited member")) {
      await toasts.promise(deletor(`/api/invite/${id}`));
      mutate();
    }
  };

  return (
    <ul role="list" className="divide-y divide-gray-200">
      {[...members, ...invites]
        .sort(({ email: a }, { email: b }) => a.localeCompare(b))
        .map(({ id, role, email }) => {
          const isMember = !!members?.find((m) => m.id === id);
          return (
            <li key={id} className={"py-4 flex justify-between items-center"}>
              <p className="text-gray-600 dark:text-gray-400">
                {email} {!isMember && <Badge className="ml-1">invited</Badge>}
              </p>
              <div className="flex flex-row items-center">
                {!isMember && (
                  <button
                    className="p-1 mr-3"
                    onClick={() => onInviteDelete(id)}
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
                <Badge
                  color={role === "OWNER" ? "primary" : "secondary"}
                  className={!isMember ? "opacity-60" : ""}
                >
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
