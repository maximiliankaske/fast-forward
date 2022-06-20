import type { NextPage } from "next";
import { useState } from "react";
import { ConnectButton } from "@fdbk/widget-react";
import { RadioCard, Heading } from "@fast-forward/ui";
import cn from "classnames";

const config = {
  locale: ["en", "de", "fr"],
  theme: ["theme-light", "theme-dark"],
} as const;

const Home: NextPage = () => {
  const [form, setForm] = useState<{
    locale: typeof config.locale[number];
    theme: typeof config.theme[number];
  }>({
    locale: "en",
    theme: "theme-light",
  });

  return (
    <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
      <div className="space-y-6">
        <div className="flex flex-col items-center">
          <ConnectButton
            projectId={"cl2dnfmpg00788jik7de0lhz2"}
            lang={form.locale}
            theme={form.theme}
            // show locale only if not default
            metadata={
              form.locale !== "en" ? { locale: form.locale } : undefined
            }
            className="bg-indigo-500 rounded-full text-white px-3 py-2"
          >
            feedback
          </ConnectButton>
        </div>
        <form>
          {Object.keys(config).map((c) => {
            return (
              <div key={c}>
                <Heading className="capitalize">{c}</Heading>
                <div className="flex">
                  {config[c as keyof typeof config].map((l) => {
                    const name = c as keyof typeof config;
                    return (
                      <RadioCard
                        key={l}
                        id={l}
                        name={c}
                        onClick={() => setForm((prev) => ({ ...prev, [c]: l }))}
                        className={cn(
                          "mr-2",
                          form[name] === l
                            ? "bg-indigo-500 text-white"
                            : "text-black"
                        )}
                      >
                        {l}
                      </RadioCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </form>
        <div>
          <Heading>TODO: Copy & Paste</Heading>
        </div>
      </div>
    </main>
  );
};

export default Home;
