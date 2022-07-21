import * as React from "react";
import cn from "classnames";
import { StarIcon } from "@heroicons/react/solid";
import Container from "./Container";
import Indicator from "./Indicator";
import { useFFContext } from "./Provider";
import TypeEmoji from "./TypeEmoji";

const Feedback = () => {
  const { setState, type } = useFFContext();

  const handleClick = () => {
    setState("success");
  };

  console.log(type);
  return (
    <Container>
      <div className="space-y-2">
        <div className="flex items-center justify-between relative">
          <Indicator />
          {/* TODO: missing bg-gray-lightest color */}
          <button
            onClick={() => setState("type")}
            className="rounded-full p-1 absolute right-0 -top-1 hover:bg-gray-light/20"
          >
            <TypeEmoji className="" type={type} />
          </button>
        </div>
        <p className="font-medium text-black tracking-wide">
          Anything that can be improved?
        </p>
        <textarea
          className="rounded-md border border-gray-light resize-none w-full"
          placeholder="Tell us about..."
          rows={3}
          required
          autoFocus
        />
        <button
          onClick={handleClick}
          className="bg-black text-white px-5 py-2 rounded-md !mt-0"
        >
          Submit
        </button>
      </div>
    </Container>
  );
};

export default Feedback;
