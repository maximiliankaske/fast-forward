import { useAuth } from "@/lib/auth";
import { Template } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { WithId } from "../types";

const useTemplate = (id: string) => {
  const { loading, user } = useAuth();
  const { data, mutate } = useSWR<{ template: WithId<Template> }>(
    !loading
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/template/${id}`,
          user?.token,
        ]
      : null,
    fetcher
  );
  return { data, mutate };
};

export default useTemplate;
