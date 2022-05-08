import * as React from "react";
import { Popover } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { usePopper } from "react-popper";
import WidgetForm from "./WidgetForm";

interface Props {
  projectId?: string;
  userId?: string;
}

const Widget = ({
  userId,
  projectId = process.env.NEXT_PUBLIC_DEMO_PROJECT_ID,
}: Props) => {
  const [referenceElement, setReferenceElement] =
    React.useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] =
    React.useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    // placement: "top",
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  });
  return (
    <Popover>
      {({ open }) => (
        <>
          <Popover.Button
            as="div"
            className="relative group"
            ref={setReferenceElement}
          >
            <button className="border rounded-md px-2 py-1 hover:border-gray-300 dark:border-gray-800 hover:dark:border-gray-700">
              feedback
            </button>
            {!open ? (
              <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                <span className="animate-ping group-hover:animate-none absolute inline-flex h-full w-full rounded-full bg-gray-700 dark:bg-gray-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-700 dark:bg-gray-300"></span>
              </span>
            ) : null}
          </Popover.Button>
          <Popover.Panel
            ref={setPopperElement}
            id="widget"
            style={styles.popper}
            {...attributes.popper}
            // data-html2canvas-ignore FIXME: back if screenshots are allowed
          >
            {({ close }) => (
              <div className="relative bg-white dark:bg-black border border-gray-100 dark:border-gray-900 rounded-xl shadow-lg m-2 p-3 w-72">
                <button
                  onClick={() => close()}
                  className="absolute right-2 top-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <XIcon className="h-5 w-5 text-gray-500" />
                </button>
                <WidgetForm
                  projectId={projectId}
                  userId={userId}
                  lang="en"
                  closePanel={close}
                />
              </div>
            )}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default Widget;
