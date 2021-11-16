import { useAuth } from "@/lib/auth";
import { Survey } from "@/types/templates";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { FormSession, WithId } from "../types";

const useSurveyMembers = (surveyId?: string) => {
  const { loading, user } = useAuth();
  const { data, mutate } = useSWR<{ sessions: WithId<FormSession>[] }>(
    !loading && surveyId
      ? [
          `/api/organization/${user?.customClaims?.organizationId}/survey/${surveyId}/members`,
          user?.token,
        ]
      : null,
    fetcher
  );
  return { data, mutate };
};

export default useSurveyMembers;
