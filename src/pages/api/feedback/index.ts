import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "superstruct";
import { createFeedback, getProject } from "@/lib/db-admin";
import { Feedback } from "@/types/superstruct";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // REMINDER: cors api call first creates a "preflight" with method: "OPTIONS"
    // if no switch - case, validation will fail
    console.log(req.headers);
    switch (req.method) {
      case "POST":
        const [feedbackError, feedback] = validate(req.body, Feedback);
        const location = req.headers.referer;
        const userAgent = req.headers["user-agent"];
        if (feedback) {
          // Checking if project is valid otherwise throws error
          const project = await getProject(feedback.projectId);
          // REMINDER: either include location / userAgent in req.body or check server side
          const { feedback: f } = await createFeedback({
            ...(location && { location }),
            ...(userAgent && { userAgent }),
            ...feedback,
          });
          return res.status(200).json({ ...f });
        } else {
          return res.status(422).json({ error: feedbackError });
        }
      case "OPTIONS": {
        res.setHeader(
          "Access-Control-Allow-Methods",
          "PUT, POST, PATCH, DELETE, GET"
        );
        return res.status(204).end();
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handle;
