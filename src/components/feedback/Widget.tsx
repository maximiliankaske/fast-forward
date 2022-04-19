import React, { FC, useState } from "react";
import { Popover } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { usePopper } from "react-popper";
import WidgetForm from "./WidgetForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Button from "../ui/Button";

const Widget: FC = () => {
  const router = useRouter();
  const session = useSession();
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    // placement: "top",
    modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
  });
  return (
    <Popover>
      <Popover.Button as="div" ref={setReferenceElement}>
        <Button>Feedback</Button>
      </Popover.Button>
      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        data-html2canvas-ignore
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
              projectId={
                (router.query.projectId as string | undefined) ||
                "cl23u5hpk0299tcikxlmhvrsg"
              }
              userId={session.data?.user.email}
              lang="en"
              closePanel={close}
            />
          </div>
        )}
      </Popover.Panel>
    </Popover>
  );
};

export default Widget;
