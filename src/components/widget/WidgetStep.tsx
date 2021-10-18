import React, { HTMLAttributes } from "react";
import cn from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  steps: number;
  activeStep: number;
}

const WidgetStep = ({ steps, activeStep, className }: Props) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      {[...new Array(steps).fill(0)].map((_, index) => (
        <div
          key={index}
          className={cn(
            "h-1 rounded-md w-9",
            activeStep - 1 === index ? "bg-gray-900" : "bg-gray-300"
          )}
        />
      ))}
    </div>
  );
};

export default WidgetStep;
