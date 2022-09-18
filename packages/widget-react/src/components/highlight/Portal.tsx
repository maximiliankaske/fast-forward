import React from "react";
import ReactDOM from "react-dom";
import { toPng } from "html-to-image";

// FIXME: scrolling will only move the page, not the absolute positioned box
// FIXME: mouseover not working on touch devices

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://www.fast-forward.app"
    : "http://localhost:3000";
// TODO: add staging.* domain

interface PortalProps extends React.ComponentProps<"div"> {
  open: boolean;
  toggle: () => void;
}

function Portal({ toggle, open }: PortalProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [element, setElement] = React.useState<Element | null>(null);

  React.useEffect(() => {
    const handleElement = (event: MouseEvent) => {
      setElement(document.elementFromPoint(event.clientX, event.clientY));
    };
    document.addEventListener("mouseover", handleElement);
    return () => {
      document.removeEventListener("mouseover", handleElement); // DISCUSS: Should the options be added?
    };
  }, [toggle]);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (open) {
        event.preventDefault();
        event.stopPropagation();
        const el = (event.target as HTMLElement) || null;
        console.log(el);
        if (el === null) {
          return;
        }
        toPng(el, {
          cacheBust: true,
          style: {
            margin: "0",
          },
        })
          .then((dataUrl) => {
            console.log(dataUrl);
            // TODO: instead of download, upload the image
            // const link = document.createElement("a");
            // link.download = "my-image-name.png";
            // link.href = dataUrl;
            // link.click();
            // fetch(`${BASE_URL}/api/cloudinary`, {
            //   method: "POST",
            //   body: JSON.stringify({ screenshot: dataUrl }),
            // });
            toggle();
          })
          .catch((err) => {
            console.log(err);
            toggle();
          });
      }
    };
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [open, toggle]);

  const rect = element?.getBoundingClientRect();

  return ReactDOM.createPortal(
    <>
      {open ? (
        <>
          {/* <div
            ref={ref}
            style={{
              pointerEvents: "none",
              zIndex: 100000,
              position: "fixed",
              top: rect?.top,
              bottom: rect?.bottom,
              left: rect?.left,
              right: rect?.right,
              height: rect?.height,
              width: rect?.width,
              // backgroundColor: "rgb(154 0 197 / 100%)",
              border: "3px solid rgb(154 0 197 / 100%)",
              opacity: 0.5,
            }}
          /> */}
          <div
            style={
              {
                "--windowposition-x": `${rect?.left}px`,
                "--windowposition-y": `${rect?.top}px`,
                "--windowposition-height": `${rect?.height}px`,
                "--windowposition-width": `${rect?.width}px`,
                pointerEvents: "none",
                zIndex: 1000,
                inset: 0,
                position: "fixed",
                backgroundColor: "black",
                opacity: 0.5,
                clipPath:
                  "polygon(0% 0%, 0% 100%, var(--windowposition-x) 100%, var(--windowposition-x) var(--windowposition-y), calc(var(--windowposition-x) + var(--windowposition-width)) var(--windowposition-y), calc(var(--windowposition-x) + var(--windowposition-width)) calc(var(--windowposition-y) + var(--windowposition-height)), var(--windowposition-x) calc(var(--windowposition-y) + var(--windowposition-height)), var(--windowposition-x) 100%, 100% 100%, 100% 0%)",
              } as React.CSSProperties
            }
          />
        </>
      ) : undefined}
    </>,
    document.body
  );
}

export default Portal;
