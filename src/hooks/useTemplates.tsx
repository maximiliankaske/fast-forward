import { useAuth } from "@/lib/auth";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { WithId } from "../types";

const useTemplates = () => {
  const { loading, user } = useAuth();
  const { data, mutate } = useSWR<{ templates: WithId<Template>[] }>(
    !loading && user
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/template`,
          user?.token,
        ]
      : null,
    fetcher
  );
  return { data, mutate };
};

export default useTemplates;
