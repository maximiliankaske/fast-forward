import { NextApiRequest, NextApiResponse } from "next";
import { getProjectFeedback } from "../../../lib/db-admin";
import { auth } from "../../../lib/firebase-admin";

const projectApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { projectId } = req.query;
    // const { uid } = await auth.verifyIdToken(req.headers.token as string);
    const { feedbacks } = await getProjectFeedback(projectId as string);

    res.status(200).json({ feedbacks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default projectApi;
