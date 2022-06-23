import * as React from "react";
import cn from "classnames";
import { StarIcon } from "@heroicons/react/solid";
import Container from "./Container";
import Indicator from "./Indicator";

const Feedback = () => {
  return (
    <Container>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Indicator active={1} />
          <div className="flex space-x-2 items-center">
            <StarIcon className="h-5 w-5 text-green" />
            <p className="text-gray font-medium tracking-wide">Stars</p>
          </div>
        </div>
        <p className="font-medium text-black tracking-wide">
          Anything that can be improved?
        </p>
        <textarea
          className="rounded-md border border-gray-light resize-none w-full"
          placeholder="Your feedback (Optional)"
          rows={3}
          autoFocus
        />
        <div>
          <button className="bg-black text-white px-5 py-2 rounded-md">
            Submit
          </button>
        </div>
      </div>
    </Container>
  );
};

export default Feedback;
