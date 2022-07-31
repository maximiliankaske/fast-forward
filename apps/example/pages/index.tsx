import type { NextPage } from "next";
import React, { useState } from "react";
import { DribbbbleConnectButton } from "@fdbk/widget-react";
import { RadioCard, Heading, Label } from "@fast-forward/ui";
import cn from "classnames";

// TODO: Make it automatically visible
// No need to press the button to toggle modal box

const config = {
  locale: ["en", "de", "fr"],
  theme: ["light", "dark"],
} as const;

const Home: NextPage = () => {
  const [form, setForm] = useState<{
    locale: typeof config.locale[number];
    theme: typeof config.theme[number];
  }>({
    locale: "en",
    theme: "light",
  });
  return (
    <main className="flex flex-col min-h-screen min-w-screen justify-center items-center">
      <Heading as="h4" className="text-center mb-4">
        Playground
      </Heading>
      <div className="grid md:grid-cols-2 gap-8">
        <form className="space-y-3">
          {Object.keys(config).map((c) => {
            return (
              <div key={c}>
                <Label className="capitalize">{c}</Label>
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
                          "mr-2 rounded-full uppercase font-medium",
                          form[name] === l
                            ? "bg-black text-white"
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
        <div className="flex items-center justify-center">
          <DribbbbleConnectButton
            projectId={process.env.NEXT_PUBLIC_DEMO_PROJECT_ID!}
            domain={
              process.env.NODE_ENV === "development"
                ? "http://localhost:3000"
                : undefined
            }
            lang={form.locale}
            metadata={
              form.locale !== "en" ? { locale: form.locale } : undefined
            }
            buttonProps={{
              className: `bg-black rounded-full text-white px-3 py-2`,
            }}
            themeColors={
              form.theme === "dark"
                ? {
                    "--ff-black": "255 255 255",
                    "--ff-white": "0 0 0",
                    "--ff-gray": "229 231 235",
                    "--ff-gray-light": "55 65 81",
                    "--ff-primary": "0 243 177",
                  }
                : undefined
            }
          >
            Click Me!
          </DribbbbleConnectButton>
        </div>
      </div>
    </main>
  );
};

export default Home;
