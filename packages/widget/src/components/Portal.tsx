import React from "react";
import ReactDOM from "react-dom";

interface PortalProps extends React.ComponentProps<"div"> {
  open: boolean;
  toggle: () => void;
}

function Portal({ children, toggle, open, ...props }: PortalProps) {
  const protectedAreaRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // FIXME: close and screenshot button are not working
      if (protectedAreaRef?.current?.contains(event.target as HTMLElement)) {
        event.stopPropagation();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
    };
  }, []);
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (open && event.key === "Escape") {
        toggle();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, toggle]);

  return ReactDOM.createPortal(
    <div
      id="portal"
      className="fixed inset-0 z-[99]"
      onClick={toggle}
      {...props}
    >
      <div className="fixed inset-0 bg-gray-500 dark:bg-black dark:bg-opacity-75 bg-opacity-75" />
      <div className="z-10 fixed inset-0 overflow-y-auto flex items-center justify-center">
        <div ref={protectedAreaRef} className="max-w-xl m-2">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Portal;
