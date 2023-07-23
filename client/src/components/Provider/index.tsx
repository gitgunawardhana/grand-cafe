import { createContext, useState } from "react";
import { getWindowSize } from "../../utils";

export const ProviderContext = createContext({
  windowSize: {
    width: 0,
    height: 0,
  },
});

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}

const Provider = (props: ProviderProps) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  getWindowSize(setWindowSize);
  return (
    <ProviderContext.Provider
      value={{
        windowSize,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
