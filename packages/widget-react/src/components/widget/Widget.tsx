import * as React from "react";
import { FeedbackBase } from "../../types";
import Feedback from "./Feedback";
import PoweredBy from "./PoweredBy";
import Provider, { useFFContext } from "./Provider";
import Success from "./Success";
import Type from "./Type";

interface PopupProps {
  close: () => void;
}

interface Props extends FeedbackBase, PopupProps {}

const Widget = ({ close, ...props }: Props) => {
  return (
    <Provider {...props}>
      <Content close={close} />
    </Provider>
  );
};

const Content = ({ close }: PopupProps) => {
  const {
    state,
    widgetProps: { themeColors },
  } = useFFContext();
  return (
    <div className="min-w-[300px]" style={themeColors as React.CSSProperties}>
      {state === "type" ? <Type /> : undefined}
      {state === "feedback" ? <Feedback /> : undefined}
      {state === "success" ? <Success close={close} /> : undefined}
    </div>
  );
};

export default Widget;
