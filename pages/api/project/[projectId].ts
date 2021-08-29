import { NextApiRequest, NextApiResponse } from "next";
import { getProject } from "../../../lib/db-admin";
import { auth } from "../../../lib/firebase-admin";

const projectApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { projectId } = req.query;
    // TODO: check if uid is allowed to read id
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    //
    const { project } = await getProject(projectId as string);

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default projectApi;
