import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "superstruct";
import { createFeedback } from "../../../lib/db-admin";
import { Feedback } from "../../../types/superstruct";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // REMINDER: cors api call first creates a "preflight" with method: "OPTIONS"
    // if no switch - case, validation will fail
    switch (req.method) {
      case "POST":
        const [error, feedback] = validate(req.body, Feedback);
        if (feedback) {
          const { feedback: f } = await createFeedback(feedback);
          return res.status(200).json({ ...f });
        } else {
          return res.status(422).json({ error });
        }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handle;
