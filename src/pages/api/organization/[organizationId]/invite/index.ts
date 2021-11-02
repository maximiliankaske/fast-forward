import { auth } from "@/lib/firebase-admin";
import { getOrganizationInvites } from "@/lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

const projectsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    const { invites } = await getOrganizationInvites(
      req.query.organizationId as string
    );
    res.status(200).json({ invites });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default projectsApi;
