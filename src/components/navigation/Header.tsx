import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import Link from "../ui/Link";
import cn from "classnames";
import ProfileMenu from "./ProfileMenu";
import Widget from "../feedback/Widget";

export interface HeaderProps {
  withProfile?: boolean;
}

const Header: FC<HeaderProps> = ({ children, withProfile = false }) => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted && resolvedTheme === "dark";
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
            <Link href="/">🙋‍♂️ fast-forward</Link>
          </div>
          <div className="space-x-5 sm:space-x-6 flex items-center">
            <Widget />
            {withProfile ? (
              <ProfileMenu />
            ) : (
              <Link href="/auth/signin">Login</Link>
            )}
            <button
              className="p-2"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            >
              {isDarkMode ? "🌒" : "🌔"}
            </button>
          </div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </header>
  );
};

export default Header;
