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
          <div className="relative bg-gray-50 border border-gray-100 rounded-md shadow-lg p-4 w-64">
            <button onClick={() => close()} className="absolute right-2 top-2">
              <XIcon className="h-4 w-4 text-gray-500" />
            </button>
            <WidgetForm {...props} />
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Widget;
