import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { OrganizationMember, WithId } from "../types";

const useOrganizationMembers = () => {
  const { loading, user } = useAuth();
  const { data, mutate } = useSWR<{ members: WithId<OrganizationMember>[] }>(
    !loading && user
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/member`,
          user?.token,
        ]
      : null,
    fetcher
  );
  return { data, mutate };
};

export default useOrganizationMembers;
