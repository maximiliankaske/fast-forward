import { useAuth } from "@/lib/auth";
import useSWR from "swr";
import { Organization, WithId } from "@/types/index";
import fetcher from "@/utils/fetcher";

const useOrganization = (name?: string) => {
  const { user, loading } = useAuth();

  const { data, mutate } = useSWR<{
    organization: WithId<Organization> | undefined;
  }>(
    (!loading && name) || user?.customClaims?.organizationId
      ? [
          `/api/organization/${name || user?.customClaims?.organizationId}`,
          user?.token,
        ]
      : null,
    fetcher
  );

  return { loading, data, mutate };
};

export default useOrganization;
