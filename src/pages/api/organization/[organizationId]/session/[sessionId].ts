import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId, sessionId } = req.query as {
      organizationId: string;
      sessionId: string;
    };
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { session } = (await getSession(organizationId, sessionId)) || {};
    console.log(session);
    return res.status(200).json({ session });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
