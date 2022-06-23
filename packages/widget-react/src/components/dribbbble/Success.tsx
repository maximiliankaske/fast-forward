import * as React from "react";
import cn from "classnames";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Container from "./Container";

const Success = () => {
  return (
    <Container>
      <div className="flex items-center space-x-2">
        <CheckCircleIcon className="h-7 w-7 text-green" />
        <p className="font-medium text-black tracking-wide">
          Thanks for the feedback!
        </p>
      </div>
    </Container>
  );
};

export default Success;
