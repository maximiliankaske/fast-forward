import { NextApiRequest, NextApiResponse } from "next";
import { getProjectFeedback } from "@/lib/db-admin";
import { withProjectAuth } from "@/lib/middleware";

const projectApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { feedbacks } = await getProjectFeedback(
      req.query.projectId as string
    );
    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default withProjectAuth(projectApi);
