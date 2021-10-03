import React, { FC } from "react";
import Widget, { WidgetProps } from "./Widget";
import cn from "classnames";

interface Props extends WidgetProps {
  reverse?: boolean;
}

const WidgetButtonExample: FC<Props> = ({ reverse, children, ...props }) => {
  return (
    <Widget {...props}>
      <button
        className={cn("px-2 py-1", {
          "text-indigo-500 hover:text-indigo-600": !reverse,
          "text-white hover:text-gray-100": reverse,
        })}
      >
        {children}
      </button>
    </Widget>
  );
};

export default WidgetButtonExample;
