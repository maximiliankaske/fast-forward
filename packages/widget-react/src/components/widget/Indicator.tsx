import * as React from "react";
import cn from "classnames";
import { useFFContext } from "./Provider";

// TODO: allow button clicks!

const styles = {
  base: "rounded-full h-[5px]",
  active: "bg-ff-black w-16",
  inactive: "bg-ff-gray-light w-12",
};

const Indicator = () => {
  const { state, reset } = useFFContext();
  return (
    <div className="flex space-x-1">
      <button
        className={cn(
          styles.base,
          state === "type" ? styles.active : styles.inactive
        )}
        onClick={reset}
        disabled={state === "type"}
      />
      <div
        className={cn(
          styles.base,
          state === "feedback" ? styles.active : styles.inactive
        )}
      />
    </div>
  );
};

export default Indicator;
