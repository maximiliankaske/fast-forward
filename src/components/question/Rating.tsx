import { RadioGroup } from "@headlessui/react";
import React, { useState } from "react";
import cn from "classnames";

const Rating = () => {
  const [value, setValue] = useState<number | undefined>();
  return (
    <RadioGroup value={value} onChange={setValue} className="mt-4">
      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
        {[...new Array(5).fill(0)].map((_, idx) => (
          <RadioGroup.Option
            key={idx}
            value={idx + 1}
            className={({ active }) =>
              cn(
                "bg-gray-100 dark:bg-gray-900 shadow-sm text-gray-900 dark:text-white cursor-pointer group relative border dark:border-gray-700 rounded-md py-3 px-4 flex items-center justify-center text-sm font-extrabold focus:outline-none sm:flex-1 sm:py-6",
                active && "ring-2 ring-indigo-500 dark:ring-pink-500"
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label as="p">{idx + 1}</RadioGroup.Label>
                <div
                  className={cn(
                    active ? "border" : "border-2",
                    checked
                      ? "border-indigo-500 dark:border-pink-500"
                      : "border-transparent",
                    "absolute -inset-px rounded-md pointer-events-none"
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default Rating;
