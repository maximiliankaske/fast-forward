import { NextApiRequest, NextApiResponse } from "next";
import { getSurveyMemberSessions } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId, surveyId } = req.query as {
      organizationId: string;
      surveyId: string;
    };
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { members } =
      (await getSurveyMemberSessions(organizationId, surveyId)) || {};
    return res.status(200).json({ sessions: members });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
