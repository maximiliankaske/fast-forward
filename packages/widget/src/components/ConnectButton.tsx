import * as React from "react";
import { FeedbackBase } from "../types";
import Form from "./archive/Form";
import Portal from "./Portal";

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  theme?: string;
}

const ConnectButton = ({
  children,
  onClick,
  className,
  ...props
}: ConnectButtonProps) => {
  const [open, toggle] = React.useReducer((s) => !s, false);

  return (
    <>
      <button
        onClick={(e) => {
          toggle();
          onClick?.();
        }}
        className={className}
      >
        {children}
      </button>
      {open ? (
        <Portal {...{ toggle, open }}>
          <Form close={toggle} {...props} />
        </Portal>
      ) : null}
    </>
  );
};

export default ConnectButton;
