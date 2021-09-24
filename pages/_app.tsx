import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../lib/auth";
import { Toaster } from "react-hot-toast";
import { NextComponentType, NextPageContext } from "next";
import Auth, { AuthComponentProps } from "../components/auth/Auth";

const components = {
  // img: Image,
  // h1: Heading.H1,
  // h2: Heading.H2,
  // ...
};

export type NextComponentWithAuth = NextComponentType<
  NextPageContext,
  any,
  {}
> &
  Partial<AuthComponentProps>;

type CustomAppProps = Omit<AppProps, "Component"> & {
  Component: NextComponentWithAuth;
};

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <MDXProvider components={components}>
          {Component.auth ? (
            <Auth auth={Component.auth}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster position="top-right" />
        </MDXProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
