import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

// TODO: add organization

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (!session?.user.id) {
      return res.status(401).end("Not authenticated");
    }
    switch (req.method) {
      case "GET": {
        const entries = await prisma.organization.findMany({
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
        const newEntry = await prisma.organization.create({
          data: {
            userId: session.user.id,
            ...req.body,
          },
        });
        // add to organization members with role SUPERADMIN
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            organizationId: newEntry.id,
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
