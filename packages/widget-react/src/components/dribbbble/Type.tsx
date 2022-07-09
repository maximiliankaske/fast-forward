import * as React from "react";
import cn from "classnames";
import { StarIcon } from "@heroicons/react/solid";
import Container from "./Container";
import Indicator from "./Indicator";
import { useFFContext } from "./Provider";

const Type = () => {
  const [active, setActive] = React.useState<number>();
  const { setState } = useFFContext();

  const handleClick = () => {
    setActive(active);
    setTimeout(() => setState("feedback"), 500);
  };

  return (
    <Container>
      <div className="space-y-3">
        <Indicator />
        <p className="font-medium text-black tracking-wide">
          Rate your experience with our product...
        </p>
        <div className="flex space-x-4">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={handleClick}
                className={cn(
                  "border border-gray-light py-2 px-4 rounded-md",
                  active === star
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white text-gray bg-white" // active => bg-primary
                )}
              >
                {star}
              </button>
            ))}
          </div>
          <div className="flex space-x-2 items-center">
            <StarIcon className="h-5 w-5 text-green" />
            <p className="text-gray font-medium tracking-wide">Stars</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Type;
