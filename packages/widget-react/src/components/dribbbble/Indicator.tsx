import * as React from "react";
import cn from "classnames";

const steps = [0, 1];

const Indicator = ({ active }: { active: typeof steps[number] }) => {
  return (
    <div className="flex space-x-1">
      {steps.map((_, i) => (
        <div
          key={i}
          className={cn(
            "rounded-full h-[5px]",
            i === active ? "bg-black w-16" : "bg-gray-light w-12"
          )}
        />
      ))}
    </div>
  );
};

export default Indicator;
