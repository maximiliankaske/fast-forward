import { useAuth } from "@/lib/auth";
import { Survey } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { WithId } from "../types";

const useSurveys = () => {
  const { loading, user } = useAuth();
  const { data, mutate } = useSWR<{ surveys: WithId<Survey>[] }>(
    !loading && user
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/survey`,
          user?.token,
        ]
      : null,
    fetcher
  );
  return { data, mutate };
};

export default useSurveys;
