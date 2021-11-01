import { NextApiRequest, NextApiResponse } from "next";
import { getInvite } from "@/lib/db-admin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId, inviteId } = req.query;
    const response = await getInvite(inviteId as string);
    // if (response?.invite) {
    //   const { dueTo, expired } = response.invite;
    //   if (dueTo.toDate() < new Date() || expired) {
    //     return res.status(404).end();
    //   }
    // }
    return res.status(200).json({ invite: response?.invite });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
