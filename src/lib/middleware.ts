import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "./firebase-admin";
import { getProject } from "./db-admin";

export type NextApiRequestWithToken = NextApiRequest & {
  token: string;
};

export function withProjectAuth(
  handler: (
    req: NextApiRequestWithToken,
    res: NextApiResponse
  ) => void | Promise<void>
) {
  return async (req: NextApiRequestWithToken, res: NextApiResponse) => {
    try {
      const { project } = await getProject(req.query.projectId as string);

      if (project.private) {
        const { uid } = await auth.verifyIdToken(req.headers.token as string);
        if (!uid) {
          return res.status(401).end("Not authenticated");
        }
        if (uid !== project?.authorId) {
          return res.status(401).end("Not authorized");
        }
      }
    } catch (error) {
      return res.status(500).json({ error });
    }

    return handler(req, res);
  };
}
