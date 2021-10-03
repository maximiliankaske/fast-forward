import { auth } from "../../lib/firebase-admin";
import { getUserProjects } from "../../lib/db-admin";
import { NextApiRequest, NextApiResponse } from "next";

const projectsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const { projects } = await getUserProjects(uid);

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default projectsApi;
