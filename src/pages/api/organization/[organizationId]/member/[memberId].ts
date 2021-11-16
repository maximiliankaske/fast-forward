import { NextApiRequest, NextApiResponse } from "next";
import { getOrganizationMember } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId, memberId } = req.query as {
      organizationId: string;
      memberId: string;
    };
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { member } =
      (await getOrganizationMember(organizationId, memberId)) || {};
    if (member) {
      await auth.setCustomUserClaims(uid, {
        role: member.role,
        organizationId: organizationId,
      });
    }
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
