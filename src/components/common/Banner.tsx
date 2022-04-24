import React from "react";
import { XIcon } from "@heroicons/react/outline";
import Button from "../ui/Button";
import Text from "../ui/Text";
import cn from "classnames";

interface Base {
  children?: React.ReactNode;
}

interface Props extends Base {
  className?: string;
  id: string;
}

const Banner = ({ children, className }: Props) => {
  // TODO: check localStorage for id and display Banner based on value
  return (
    <div
      className={cn(
        "p-2 rounded-lg border border-gray-200 dark:border-gray-800",
        className
      )}
    >
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex flex-col justify-center">
          {children}
        </div>
        <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-2">
          <Button type="button" variant="none">
            <XIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Title = ({ children }: Base) => {
  // truncate
  return <Text className="ml-2 font-medium mb-0">{children}</Text>;
};
const Description = ({ children }: Base) => {
  return (
    <Text className="ml-2 mb-0" variant="description">
      {children}
    </Text>
  );
};

Banner.Title = Title;
Banner.Description = Description;

export default Banner;
