import * as React from "react";
import cn from "classnames";

// translation / locale , theme, style, active step...

export const states = ["type", "feedback", "success"] as const;

type State = typeof states[number];

// FIXME: refactor types
interface ContextProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

const Context = React.createContext<ContextProps | null>(null);

export const useFFContext = () => {
  const ctx = React.useContext(Context);
  if (!ctx) {
    throw new Error("Missing Provider");
  }
  return ctx;
};

interface ProviderProps {
  children: React.ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [state, setState] = React.useState<State>("type");
  return (
    <Context.Provider value={{ state, setState }}>{children}</Context.Provider>
  );
};

export default Provider;
