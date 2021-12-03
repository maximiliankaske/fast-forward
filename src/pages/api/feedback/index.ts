import { NextApiRequest, NextApiResponse } from "next";
import { validate } from "superstruct";
import { createFeedback, getProject } from "@/lib/db-admin";
import { Feedback } from "@/types/superstruct";
import { allowCors } from "@/lib/middleware";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(req.body);
    switch (req.method) {
      case "POST":
        const location = req.headers.referer;
        const userAgent = req.headers["user-agent"];
        const entry = await prisma.feedback.create({
          data: {
            ...req.body,
            ...(location && { location }),
            ...(userAgent && { userAgent }),
          },
        });
        return res.status(200).json(entry);
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// REMINDER: cors api call first creates a "preflight" with method: "OPTIONS"
export default allowCors(handler);
