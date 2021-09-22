import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "superstruct";
import { createFeedback } from "../../../lib/db-admin";
import { Feedback } from "../../../types/superstruct";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [error, feedback] = validate(req.body, Feedback);
    if (feedback) {
      const { feedback: f } = await createFeedback(feedback);
      return res.status(200).json({ ...f });
    } else {
      return res.status(422).json({ error });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handle;
