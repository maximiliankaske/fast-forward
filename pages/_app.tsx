import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../lib/auth";

const components = {
  // img: Image,
  // h1: Heading.H1,
  // h2: Heading.H2,
  // ...
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class">
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
export default MyApp;
