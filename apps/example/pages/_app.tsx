import "../styles/globals.css";
// import "../styles/widget.css"; // no need with tailwind v3.1+
import "@fdbk/widget-react/dist/build.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" forcedTheme={"light"}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
