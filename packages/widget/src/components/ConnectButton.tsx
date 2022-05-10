import * as React from "react";
import { FeedbackBase } from "../types";
import Form from "./archive/Form";
import Portal from "./Portal";

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  as: React.ElementType;
  onClick?: () => void;
  className?: string;
  theme?: string;
}

const ConnectButton = ({
  children,
  onClick,
  as = "button",
  className,
  ...props
}: ConnectButtonProps) => {
  const [open, toggle] = React.useReducer((s) => !s, false);
  const Element = (props: React.HTMLAttributes<HTMLButtonElement>) =>
    React.createElement(as, props, children);

  return (
    <>
      <Element
        onClick={(e) => {
          toggle();
          onClick?.();
        }}
        className={className}
        // TODO: add more props
      />
      {open ? (
        <Portal {...{ toggle, open }}>
          <Form close={toggle} {...props} />
        </Portal>
      ) : null}
    </>
  );
};

export default ConnectButton;
