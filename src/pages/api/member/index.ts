import { getOrganizationMembers } from "@/lib/db-admin";
import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const projectsApi = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });

    if (!session?.user.organizationId) {
      return res.status(401).end("Not authenticated");
    }
    const entries = await prisma.member.findMany({
      where: {
        organizationId: session?.user.organizationId,
      },
    });

    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default projectsApi;
