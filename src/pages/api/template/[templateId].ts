import { NextApiRequest, NextApiResponse } from "next";
import { getTemplate } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { templateId } = req.query as { templateId: string };
    const session = await getSession({ req });
    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "GET": {
        const entry = await prisma.template.findUnique({
          where: {
            id: templateId,
          },
          include: {
            questions: true,
          },
        });
        return res.status(200).json(entry);
      }
      case "DELETE": {
        const entry = await prisma.template.delete({
          where: {
            id: templateId,
          },
        });
        return res.status(200).json(entry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
