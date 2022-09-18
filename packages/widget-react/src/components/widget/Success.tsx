import * as React from "react";
import cn from "classnames";
import Container from "./Container";
import { useFFContext } from "./Provider";
import CheckCircleIcon from "../icons/CheckCircleIcon";

interface Props {
  close: () => void;
}

const Success = ({ close }: Props) => {
  const { setState, setType, messages } = useFFContext();

  React.useEffect(() => {
    let timer: undefined | NodeJS.Timeout;
    timer = setTimeout(() => {
      setState("type");
      setType(undefined);
      close();
    }, 2000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <div className="flex items-center space-x-2">
        <CheckCircleIcon className="h-7 w-7 text-green" />
        <p className="font-medium text-black tracking-wide">
          {messages.submit.state.success}
        </p>
      </div>
    </Container>
  );
};

export default Success;
