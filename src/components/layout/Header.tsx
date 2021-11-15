import { FastForwardIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import Link from "../ui/Link";
import NextLink from "next/link";
import Badge from "../ui/Badge";
import NavLink from "../navigation/NavLink";
import cn from "classnames";
import ProfileMenu from "../navigation/ProfileMenu";

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
            <NextLink href="/">
              <a className="inline-flex items-center rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none">
                <FastForwardIcon className="h-8 w-8 mr-1" />
                <Badge color="primary" rounded="md">
                  Beta
                </Badge>
              </a>
            </NextLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>
          <div className="space-x-6 sm:space-x-8 flex items-center">
            {withProfile ? <ProfileMenu /> : <Link href="/login">Login</Link>}
            <button
              className="p-2 rounded-md border border-gray-200 dark:border-gray-800 bg-white hover:bg-gray-50 dark:bg-black dark:hover:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-black focus:ring-indigo-500"
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
        {children && <div>{children}</div>}
      </div>
    </header>
  );
};

export default Header;
