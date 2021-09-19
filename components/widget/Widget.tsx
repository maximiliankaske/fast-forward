import React, { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import WidgetForm from "./WidgetForm";
import { LanguageCode } from "./translations";
import { Feedback } from "../../types";
import { usePopper } from "react-popper";

export interface WidgetProps
  extends Pick<Feedback, "userId" | "projectId" | "metadata"> {
  lang?: LanguageCode;
}

const Widget: FC<WidgetProps> = ({ children, ...props }) => {
  let [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(
    null
  );
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    // placement: "top",
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  });
  return (
    <Popover>
      <Popover.Button as="div" ref={setReferenceElement}>
        {children}
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        data-html2canvas-ignore
      >
        {({ close }) => (
          <div className="relative bg-white border border-gray-100 rounded-xl shadow-lg m-2 p-3 w-72">
            <button
              onClick={() => close()}
              className="absolute right-1 top-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XIcon className="h-5 w-5 text-gray-500" />
            </button>
            <WidgetForm {...props} />
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Widget;
