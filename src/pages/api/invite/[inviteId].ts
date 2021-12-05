import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    return res.status(401).end("Not authorized");
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
