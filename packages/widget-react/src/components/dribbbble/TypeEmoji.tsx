import * as React from "react";
import { Type } from "./Provider";

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  type: Type;
}

const TypeEmoji = ({ type, ...props }: Props) => {
  return (
    <span {...props}>
      {(() => {
        switch (type) {
          case "bug":
            return "🐞";
          case "issue":
            return "⚠️";
          case "other":
            return "💬";
          default:
            return "";
        }
      })()}
    </span>
  );
};

export default TypeEmoji;
