import React from "react";
import Heading from "../ui/Heading";

// question: Did you have everything needed to accomplish your tasks?

const Question = () => {
  return (
    <div className="border-l-8 pl-4 rounded">
      <Heading as="h2">What was our biggest achievement?</Heading>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        It could be a <b>milestone</b> that was reached, a <b>workshop</b>{" "}
        attembded or a meeting with a collegue where you had a mindblowing{" "}
        <b>experience</b>.
      </p>
    </div>
  );
};

export default Question;
