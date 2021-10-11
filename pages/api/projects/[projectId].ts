import { NextApiRequest, NextApiResponse } from "next";
import { getProject } from "../../../lib/db-admin";
import { withProjectAuth } from "../../../lib/middleware";

const projectApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { project } = await getProject(req.query.projectId as string);
    return res.status(200).json({ project });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default withProjectAuth(projectApi);
