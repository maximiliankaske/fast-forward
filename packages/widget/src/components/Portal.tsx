import React from "react";
import ReactDOM from "react-dom";

interface PortalProps extends React.ComponentProps<"div"> {
  open: boolean;
  toggle: () => void;
}

function Portal({ children, toggle, open, ...props }: PortalProps) {
  const protectedAreaRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (overlayRef?.current?.contains(target)) {
        toggle();
      }
    };
    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true }); // DISCUSS: Should the options be added?
    };
  }, [toggle]);

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
      id="widget"
      className="fixed inset-0 z-[99] flex items-center justify-center"
      {...props}
    >
      <div
        ref={overlayRef}
        // onClick={toggle}
        className="fixed inset-0 bg-gray-500 dark:bg-black dark:bg-opacity-75 bg-opacity-75"
      />
      <div ref={protectedAreaRef} className="z-10 max-w-xl m-2">
        {children}
      </div>
    </div>,
    document.body
  );
}

export default Portal;
