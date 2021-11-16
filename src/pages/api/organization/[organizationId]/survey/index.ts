import { auth } from "@/lib/firebase-admin";
import { getOrganizationSurveys } from "@/lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { surveys } = await getOrganizationSurveys(
      req.query.organizationId as string
    );
    res.status(200).json({ surveys });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
