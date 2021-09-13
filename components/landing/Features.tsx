import cn from "classnames";
import faker from "faker";
import React from "react";
import { GlobeAltIcon } from "@heroicons/react/outline";
import { CameraIcon, CloudIcon } from "@heroicons/react/solid";
import GitHubIcon from "../icon/GitHub";

const features = [
  {
    name: "Open Source",
    backgroundColor: "bg-black",
    description: faker.lorem.paragraph(),
    icon: GitHubIcon,
  },
  {
    name: "On premises",
    backgroundColor: "bg-indigo-500",
    description: faker.lorem.paragraph(),
    icon: CloudIcon,
  },
  {
    name: "Translation",
    backgroundColor: "bg-green-500",
    description: faker.lorem.paragraph(),
    icon: GlobeAltIcon,
  },
  {
    name: "Screenshots",
    backgroundColor: "bg-yellow-500",
    description: faker.lorem.paragraph(),
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
          <dd className="mt-2 text-base text-gray-500">
            {feature.description}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default Features;
