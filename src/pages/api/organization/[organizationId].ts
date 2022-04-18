import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

// TODO: add organization

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { organizationId } = req.query as { organizationId: string };
    const session = await getSession({ req });
    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "GET": {
        const entry = await prisma.organization.findUnique({
          where: {
            id: organizationId,
          },
          include: {
            members: true,
            invites: {
              where: { valid: true },
            },
          },
        });
        return res.status(200).json(entry);
      }
      case "PUT": {
        const entry = await prisma.organization.update({
          where: { id: organizationId },
          data: req.body,
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
