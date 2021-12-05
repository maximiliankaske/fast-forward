import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case "GET": {
        const entries = await prisma.feedback.findUnique({
          where: {
            id: String(req.query.feedbackId),
          },
        });
        return res.status(200).json(entries);
      }
      case "PUT": {
        const newEntry = await prisma.feedback.update({
          where: {
            id: String(req.query.feedbackId),
          },
          data: req.body,
        });
        return res.status(200).json(newEntry);
      }
      case "DELETE": {
        const deleteEntry = await prisma.feedback.delete({
          where: {
            id: String(req.query.feedbackId),
          },
        });
        return res.status(200).json(deleteEntry);
      }
      default: {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
