import cn from "classnames";
import React from "react";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import GitHubIcon from "../icon/GitHub";

const features = [
  {
    name: "Open Source",
    backgroundColor: "bg-black",
    description:
      "The entire project can be seen on GitHub. Used stack:<br/><b>Next.js</b> + <b>TailwindCSS</b> + <b>Firebase</b>.",
    icon: GitHubIcon,
    link: {
      label: "Have a look",
      href: "https://github.com/maximiliankaske/fast-feedback",
    },
  },
  {
    name: "Translation",
    backgroundColor: "bg-yellow-400",
    description:
      "It is very easy to change the language depending on the locales you support. Locales supported: <b>en</b>, <b>de</b>, <b>fr</b>.",
    icon: GlobeAltIcon,
  },
  {
    name: "Screenshots",
    backgroundColor: "bg-pink-500",
    description:
      "Let the user append a browser screenshot with only one click.",
    icon: CameraIcon,
  },
];

const Features = () => {
  return (
    <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
      {features.map((feature) => (
        <div key={feature.name}>
          <dt>
            <div
              className={cn(
                "flex items-center justify-center h-10 w-10 rounded-full text-white",
                feature.backgroundColor
              )}
            >
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-5 text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {feature.name}
            </p>
          </dt>
          <dd
            className="mt-2 text-base text-gray-600 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: feature.description }}
          />
        </div>
      ))}
    </dl>
  );
};

export default Features;
