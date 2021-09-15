import { Switch } from "@headlessui/react";
import { CubeIcon } from "@heroicons/react/outline";
import cn from "classnames";
import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { useAuth } from "../../lib/auth";
import Link from "../ui/Link";

const Header: FC = () => {
  const auth = useAuth();
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const isDarkMode = mounted && resolvedTheme === "dark";
  return (
    <header className="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="h-16 flex justify-between items-center">
        <Link href="/">
          <CubeIcon className="h-8 w-8 text-indigo-500" />
        </Link>
        <div className="space-x-4">
          <Link href="/docs">Docs</Link>
          <Link href="/blog">Blog</Link>
          {auth.user ? (
            <>
              <Link href="/app">App</Link>
              <Link href="/logout">Logout</Link>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
          <Switch
            checked={isDarkMode}
            onChange={() => setTheme(isDarkMode ? "light" : "dark")}
            className={cn(
              "relative inline-flex items-center h-6 rounded-full w-11",
              {
                "bg-indigo-600": isDarkMode,
                "bg-gray-200": !isDarkMode,
              }
            )}
          >
            <span className="sr-only">Enable Dark Mode</span>
            <span
              className={cn(
                "inline-block w-4 h-4 transform bg-white rounded-full",
                {
                  "translate-x-6": isDarkMode,
                  "translate-x-1": !isDarkMode,
                }
              )}
            />
          </Switch>
        </div>
      </div>
    </header>
  );
};

export default Header;
