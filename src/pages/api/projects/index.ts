import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }

    switch (req.method) {
      case "GET": {
        const entries = await prisma.widgetProject.findMany({
          where: {
            userId: session?.user.id,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        return res.status(200).json(entries);
      }
      case "POST": {
        const newEntry = await prisma.widgetProject.create({
          data: {
            userId: session.user.id,
            name: req.body.name || "",
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
