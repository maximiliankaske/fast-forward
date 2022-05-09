import React, { FC } from "react";
import Link from "../ui/Link";
import cn from "classnames";
import ProfileMenu from "./ProfileMenu";
import { useSession } from "next-auth/react";
import { ConnectButton } from "widget";

const Header: FC = ({ children }) => {
  const session = useSession();
  return (
    <header
      className={cn(
        "sticky z-20 w-full bg-white dark:bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg",
        children ? "-top-12" : "top-0"
      )}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0 py-3 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-6 sm:space-x-8">
            <Link href="/">fast-forward</Link>
          </div>
          <div className="space-x-5 sm:space-x-6 flex items-center">
            <Link href="/docs">docs</Link>
            <div className="relative group">
              <ConnectButton
                projectId={process.env.NEXT_PUBLIC_DEMO_PROJECT_ID}
                userId={session?.data?.user.email}
                className="border rounded-md px-2 py-1 hover:border-gray-300 dark:border-gray-800 hover:dark:border-gray-700"
              >
                feedback
              </ConnectButton>
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping group-hover:animate-none absolute inline-flex h-full w-full rounded-full bg-gray-700 dark:bg-gray-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-700 dark:bg-gray-300"></span>
              </span>
            </div>
            {session.data?.user.id ? (
              <ProfileMenu />
            ) : (
              <Link href="/auth/signin">login</Link>
            )}
          </div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </header>
  );
};

export default Header;
