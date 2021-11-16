import { NextApiRequest, NextApiResponse } from "next";
import { getOrganization } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const response = await getOrganization(req.query.organizationId as string);
    return res.status(200).json({ organization: response?.organization });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
