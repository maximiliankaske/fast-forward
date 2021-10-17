import React from "react";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import Heading from "../ui/Heading";

const features = [
  {
    name: "Open Source",
    active: true,
    description:
      "The entire project can be seen on GitHub. Used stack:<br/><b>Next.js</b> + <b>TailwindCSS</b> + <b>Firebase</b>.",
    href: "https://github.com/maximiliankaske/fast-forward",
  },
  {
    name: "Metadata",
    active: true,
    description:
      "Append any metadata you want to the request send, e.g. <code>lang: 'de'</code>.",
  },
  {
    name: "Screenshots (soon or later)",
    active: false,
    description:
      "Let the user append a browser screenshot with only one click.",
  },
];

const Features = () => {
  return (
    <div className="pb-24">
      <Heading as="h2" className="text-center mb-6">
        Features
      </Heading>
      <dl className="space-y-6 max-w-xl mx-auto">
        {features.map((feature) => (
          <div key={feature.name} className="flex space-x-2">
            {feature.active ? (
              <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0 mt-[2px]" />
            ) : (
              <XIcon className="h-5 w-5 text-red-500 flex-shrink-0 mt-[2px]" />
            )}
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
