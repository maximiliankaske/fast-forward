import { BeakerIcon } from "@heroicons/react/solid";
import React, { FC } from "react";

const Banner: FC = ({ children }) => {
  return (
    <div className="p-2 rounded-lg bg-pink-600 shadow-lg sm:p-3">
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex items-center">
          <span className="flex p-2 rounded-lg bg-pink-800">
            <BeakerIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </span>
          <p className="ml-3 font-medium text-white">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
