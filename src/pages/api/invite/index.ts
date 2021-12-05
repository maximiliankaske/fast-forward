import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/lib/prisma";

const projectsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }

    switch (req.method) {
      case "GET":
        const entries = await prisma.invite.findMany({
          where: {
            // organizationId:
          },
        });
        return res.status(200).json(entries);
      case "POST": {
        const newEntry = await prisma.invite.create({
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
