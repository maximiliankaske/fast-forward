import React, { FC } from "react";
import Widget, { WidgetProps } from "./Widget";
import cn from "classnames";

const WidgetButtonExample: FC<WidgetProps> = ({ children, ...props }) => {
  return (
    <Widget {...props}>
      <button
        className={cn(
          "px-2 py-1 rounded text-indigo-500 dark:text-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        )}
      >
        {children}
      </button>
    </Widget>
  );
};

export default WidgetButtonExample;
