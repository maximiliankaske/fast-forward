import { FastForwardIcon, MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import Link from "../ui/Link";
import NextLink from "next/link";
import Switch from "../ui/Switch";

const Header: FC = () => {
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted && resolvedTheme === "dark";
  return (
    <header className="sticky top-0 z-20 w-full bg-white dark:bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-4xl xl:px-0">
        <div className="h-16 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <NextLink href="/">
              <a className="rounded focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none">
                <FastForwardIcon className="h-8 w-8" />
              </a>
            </NextLink>
            <Link href="/docs">Doc</Link>
            <Link href="/blog">Blog</Link>
            {auth.user && <Link href="/app">App</Link>}
          </div>
          <div className="space-x-8 flex items-center">
            {auth.user ? (
              <Link href="/logout">Logout</Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
            <button
              className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
      </div>
    </header>
  );
};

export default Header;
