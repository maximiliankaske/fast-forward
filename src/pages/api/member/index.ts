import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const projectsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session?.user.teamId) {
      return res.status(401).end("Not authenticated");
    }

    switch (req.method) {
      case "GET":
        const entries = await prisma.member.findMany({
          where: {
            teamId: session?.user.teamId,
          },
        });
        return res.status(200).json(entries);
      case "POST": {
        const newEntry = await prisma.member.create({
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
};

export default projectsApi;
