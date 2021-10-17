import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import Heading from "../ui/Heading";

const features = [
  {
    name: "Open Source",
    description:
      "The entire project can be seen on GitHub. Used stack:<br/><b>Next.js</b> + <b>TailwindCSS</b> + <b>Firebase</b>.",
  },
  {
    name: "Translation",
    description:
      "It is very easy to change the language depending on the locales you support. Locales examples: <b>en</b>, <b>de</b>, <b>fr</b>. Create your owns!",
  },
  {
    name: "Metadata",
    description:
      "Append any metadata you want to the request send, e.g. <code>lang: 'de'</code>.",
  },
  {
    name: "Screenshots (soon or later)",
    description:
      "Let the user append a browser screenshot with only one click.",
  },
];

const Features = () => {
  return (
    <div className="pb-16">
      <Heading as="h2" className="text-center mb-6">
        Features
      </Heading>
      <dl className="space-y-6 max-w-xl mx-auto">
        {features.map((feature) => (
          <div key={feature.name} className="flex space-x-2">
            <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-[2px]" />
            <div>
              <dt className="flex ">
                <p className="text-lg leading-6 font-medium">{feature.name}</p>
              </dt>
              <dd
                className="text-sm text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: feature.description }}
              />
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default Features;
