import * as React from "react";
import cn from "classnames";

// translation / locale , theme, style, active step...

export const states = ["type", "feedback", "success"] as const;
export const types = ["issue", "bug", "other"] as const;

export type State = typeof states[number];
export type Type = typeof types[number] | undefined;

// FIXME: refactor types
interface ContextProps {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  type: Type;
  setType: React.Dispatch<React.SetStateAction<Type>>;
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
  const [type, setType] = React.useState<Type>();
  const value = { state, setState, type, setType };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
