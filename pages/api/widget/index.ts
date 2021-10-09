import { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).end(`
    console.log("hello world")
  `);
};

export default handle;
