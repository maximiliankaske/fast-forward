import React, { Fragment, FC } from "react";
import { Transition, Popover } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import WidgetForm from "./WidgetForm";
import { LanguageCode } from "./translations";
import { Feedback } from "../../types";

export interface WidgetProps
  extends Pick<Feedback, "userId" | "projectId" | "metadata"> {
  lang?: LanguageCode;
}

const Widget: FC<WidgetProps> = ({ children, ...props }) => {
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button as={Fragment}>{children}</Popover.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              static
              className="absolute z-10 pt-2"
              data-html2canvas-ignore
            >
              {({ close }) => (
                <div className="relative bg-gray-50 border border-gray-100 rounded-md shadow-lg p-4 w-64">
                  <button
                    onClick={() => close()}
                    className="absolute right-2 top-2"
                  >
                    <XIcon className="h-4 w-4 text-gray-500" />
                  </button>
                  <WidgetForm {...props} />
                </div>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Widget;
