import * as React from "react";
import Feedback from "./Feedback";
import Success from "./Success";
import Type from "./Type";

const Dribbbble = () => {
  return (
    <div className="space-y-3 mt-6 min-w-[500px]">
      <Type />
      <Feedback />
      <Success />
    </div>
  );
};

export default Dribbbble;
