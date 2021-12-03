import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const { projectId } = req.query as { projectId: string };

    const entry = await prisma.widgetProject.findUnique({
      where: {
        id: String(projectId),
      },
      include: {
        feedbacks: true,
      },
    });

    if (!session?.user.id && entry?.private) {
      return res.status(401).end("Not authenticated");
    }

    switch (req.method) {
      case "GET": {
        return res.status(200).json(entry);
      }
      case "PUT": {
        const newEntry = await prisma.widgetProject.update({
          where: {
            id: projectId,
          },
          data: req.body,
        });
        return res.status(200).json(newEntry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
