import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getSession({ req });
    const { projectId } = req.query;

    const entry = await prisma.widgetProject.findUnique({
      where: {
        id: String(projectId),
      },
    });

    if (!session?.user.id && entry?.private) {
      return res.status(401).end("Not authenticated");
    }

    switch (req.method) {
      case "GET": {
        return res.status(200).json(entry);
      }
      default:
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
