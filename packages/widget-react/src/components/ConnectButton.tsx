import * as React from "react";
import { Themes } from "../themes";
import { FeedbackBase } from "../types";
import Form from "./Form";
import Portal from "./Portal";
import cn from "classnames";

interface ConnectButtonProps extends FeedbackBase {
  children: React.ReactNode;
  as?: React.ElementType;
  onClick?: () => void;
  className?: string;
  theme?: Themes;
  onSubmit?: () => void;
}

const ConnectButton = ({
  children,
  onClick,
  as = "button",
  className,
  theme,
  ...props
}: ConnectButtonProps) => {
  const [open, toggle] = React.useReducer((s) => !s, false);
  const Element = (props: React.HTMLAttributes<HTMLButtonElement>) =>
    React.createElement(as, props, children);

  return (
    <>
      <Element
        id="widget-connect-button"
        onClick={(e) => {
          toggle();
          onClick?.();
        }}
        className={className}
        // TODO: add more props
      />
      {open ? (
        <Portal {...{ toggle, open, theme }}>
          <Form close={toggle} {...props} />
        </Portal>
      ) : null}
    </>
  );
};

export default ConnectButton;
