import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "GET": {
        const entries = await prisma.template.findMany({
          where: {
            organizationId: session.user.organizationId,
          },
        });
        return res.status(200).json(entries);
      }
      case "POST": {
        const { questions, ...props } = req.body;
        const newEntry = await prisma.template.create({
          data: {
            organizationId: session.user.organizationId,
            ...props,
            questions: {
              create: questions,
            },
          },
        });
        return res.status(200).json(newEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default handler;
