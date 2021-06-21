import { auth } from "../../lib/firebase-admin";
import { getUserSites } from "../../lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

const sitesApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const { sites } = await getUserSites(uid);

    res.status(200).json({ sites });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default sitesApi;
