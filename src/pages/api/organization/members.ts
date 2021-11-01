import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "@/lib/firebase-admin";

const members = [
  "max@precycle.today",
  "maximilian@kaske.org",
  "kaske.maximilian@gmail.com",
];

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string);
    if (!uid) {
      return res.status(401).end("Not authenticated");
    }
    members.map((member) => {
      auth
        .generateSignInWithEmailLink(member, { url: "http://localhost:3000" })
        .then((link) => {
          console.log(member, link);
        })
        .catch((error) => {
          console.log(error);
        }); // url := continueURL
    });
    return res.status(200).json({});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default handler;
