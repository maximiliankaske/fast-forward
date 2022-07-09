import * as React from "react";
import Feedback from "./Feedback";
import Provider, { useFFContext } from "./Provider";
import Success from "./Success";
import Type from "./Type";

const Dribbbble = () => {
  return (
    <Provider>
      <Content />
    </Provider>
  );
};

const Content = () => {
  const { state } = useFFContext();
  return (
    <div className="space-y-3 mt-6 min-w-[500px]">
      {state === "type" ? <Type /> : undefined}
      {state === "feedback" ? <Feedback /> : undefined}
      {state === "success" ? <Success /> : undefined}
    </div>
  );
};

export default Dribbbble;
