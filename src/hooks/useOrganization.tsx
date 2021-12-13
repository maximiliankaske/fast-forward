import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useSession } from "next-auth/react";
import { Invite, Member, Organization, Template } from "@prisma/client";

const useOrganization = () => {
  const { data: session } = useSession();

  const { data, mutate } = useSWR<
    Organization & {
      templates: Template[];
      members: Member[];
      invites: Invite[];
    }
  >(`/api/organization/${session?.user.organizationId}`, fetcher);

  return { data, mutate };
};

export default useOrganization;
