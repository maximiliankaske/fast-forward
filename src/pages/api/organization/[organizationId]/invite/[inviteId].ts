import { NextApiRequest, NextApiResponse } from "next";
import { getOrganizationInvite } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid, email } = await auth.verifyIdToken(
      req.headers.token as string
    );
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { organizationId, inviteId } = req.query as {
      organizationId: string;
      inviteId: string;
    };
    const response = await getOrganizationInvite(organizationId, inviteId);
    if (email === response?.invite.email) {
      return res.status(200).json({ invite: response?.invite });
    }
    return res.status(401).end("Not authorized");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
