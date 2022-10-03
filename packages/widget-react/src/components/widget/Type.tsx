import * as React from "react";
import cn from "classnames";
import Container from "./Container";
import Indicator from "./Indicator";
import { Type, types, useFFContext } from "./Provider";
import TypeEmoji from "./TypeEmoji";

const Type = () => {
  const { setState, type, setType, messages } = useFFContext();

  return (
    <Container>
      <div className="space-y-2">
        <Indicator />
        <p className="font-medium text-ff-black tracking-wide text-sm">
          {messages.questions.type}
        </p>
        <div className="flex space-x-4">
          <div className="flex space-x-1">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setState("feedback");
                  // setTimeout(() => setState("feedback"), 1000);
                }}
                className={cn(
                  "border border-ff-gray-light py-1 px-4 rounded-md text-sm",
                  type === t
                    ? "bg-ff-black text-ff-white"
                    : "hover:bg-ff-gray-light/50 text-ff-gray bg-ff-white"
                )}
              >
                <TypeEmoji type={t} className="mr-1" />
                {messages.types[t.toLowerCase() as "issue" | "idea" | "other"]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Type;
