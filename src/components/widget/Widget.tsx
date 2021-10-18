import React, { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import WidgetForm from "./WidgetForm";
import { LanguageCode } from "./translations";
import { Feedback } from "@/types/index";
import { usePopper } from "react-popper";
import WidgetFormV2 from "./WidgetFormV2";

export interface WidgetProps
  extends Pick<Feedback, "userId" | "projectId" | "metadata"> {
  lang?: LanguageCode;
  domain?: string;
  version?: 1 | 2;
}

const Widget: FC<WidgetProps> = ({ children, version = 1, ...props }) => {
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
              className="absolute right-2 top-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <XIcon className="h-5 w-5 text-gray-500" />
            </button>
            {version === 1 ? (
              <WidgetForm {...props} />
            ) : (
              <WidgetFormV2 {...props} />
            )}
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Widget;
