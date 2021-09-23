import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "superstruct";
import { createFeedback } from "../../../lib/db-admin";
import { Feedback } from "../../../types/superstruct";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    const [error, feedback] = validate(req.body, Feedback);
    console.log(feedback, error);
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
