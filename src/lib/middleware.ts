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

export function allowCors(
  handler: (
    req: NextApiRequestWithToken,
    res: NextApiResponse
  ) => void | Promise<void>
) {
  return async (req: NextApiRequestWithToken, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await handler(req, res);
  };
}
