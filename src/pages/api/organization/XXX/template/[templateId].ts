import { NextApiRequest, NextApiResponse } from "next";
import { getTemplate } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId, templateId } = req.query as {
      organizationId: string;
      templateId: string;
    };
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { template } = (await getTemplate(organizationId, templateId)) || {};
    console.log(template);
    return res.status(200).json({ template });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
