import * as React from "react";
import { FeedbackBase } from "../types";
import Form from "./archive/Form";
import Portal from "./Portal";

const DEMO_PROJECT_ID = "cl2dnfmpg00788jik7de0lhz2";

interface ConnectButtonProps
  extends React.ComponentProps<"button">,
    FeedbackBase {
  theme?: string;
}

const ConnectButton = ({ children, onClick, ...props }: ConnectButtonProps) => {
  const [open, toggle] = React.useReducer((s) => !s, false);

  return (
    <>
      <button
        onClick={(e) => {
          toggle();
          onClick?.(e);
        }}
        {...props}
      >
        {children}
      </button>
      {open ? (
        <Portal {...{ toggle, open }}>
          <Form projectId={DEMO_PROJECT_ID} close={toggle} />
        </Portal>
      ) : null}
    </>
  );
};

export default ConnectButton;
