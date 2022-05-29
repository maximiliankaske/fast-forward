import type { NextPage } from "next";
import { useState } from "react";
import { ConnectButton } from "@fdbk/widget-react";

// TODO: use ui package instead

const locales = ["en", "de", "fr"] as const;

const Home: NextPage = () => {
  const [locale, setLocale] = useState<typeof locales[number]>("en");
  return (
    <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
      <div className="space-y-6 flex flex-col items-center">
        <ConnectButton
          projectId={"cl2dnfmpg00788jik7de0lhz2"}
          lang={locale}
          // show locale only if not default
          metadata={locale !== "en" ? { locale } : undefined}
          className="bg-indigo-500 rounded-full text-white px-3 py-2"
        >
          feedback
        </ConnectButton>
        <div className="space-x-3">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`rounded-full font-semibold uppercase px-2 py-1 ${
                l === locale ? "bg-indigo-500 text-white" : "text-black"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Home;
