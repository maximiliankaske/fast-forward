import { NextApiRequest, NextApiResponse } from "next";
import { getSurveyMemberSession } from "@/lib/db-admin";
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
    const { member } =
      (await getSurveyMemberSession(organizationId, surveyId, uid)) || {};
    return res.status(200).json({ session: member });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
