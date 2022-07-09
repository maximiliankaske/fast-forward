import * as React from "react";
import cn from "classnames";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Container from "./Container";
import { useFFContext } from "./Provider";

const Success = () => {
  const { setState } = useFFContext();

  React.useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    timer = setTimeout(() => setState("type"), 2000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
