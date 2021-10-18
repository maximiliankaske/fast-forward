import React, { createContext, FC, useContext, useState } from "react";

type ContextProps = {
  open: boolean;
  toggle: (value?: boolean) => void;
};

const WidgetContext = createContext<ContextProps | null>(null);

const useWidget = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error("Missing Provider");
  }
  return context;
};

const WidgetProvider: FC = ({ children }) => {
  const [open, setOpen] = useState(false);
  const value: ContextProps = {
    open,
    toggle: (value?: boolean) => setOpen(value || !open),
  };
  return (
    <WidgetContext.Provider value={value}>{children}</WidgetContext.Provider>
  );
};

export { useWidget };
export default WidgetProvider;
