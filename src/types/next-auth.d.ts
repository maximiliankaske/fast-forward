import NextAuth, { DefaultUser, Session as NASession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends NASession {
    user: DefaultUser & {
      id: string;
    };
  }
}
