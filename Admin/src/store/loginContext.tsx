import React, { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

type Dispatch<T> = (action: T) => void;
type TContext = {
  isLogin: boolean;
  toggleLogin: () => void;
  loginUser: any;
  setLoginUser: Dispatch<any>;
};

const LoginContext = React.createContext<TContext>({
  isLogin: false,
  toggleLogin: () => {},
  loginUser: {},
  setLoginUser: () => {},
});

export const LoginContextProvider: React.FC = (props) => {
  const [isLogin, setIsLogin] = useLocalStorage("isLogin", false);
  const [loginUser, setLoginUser] = useState<any>();

  function toggleLogin() {
    setIsLogin((prev) => !prev);
  }

  const loginValue: TContext = {
    isLogin: isLogin,
    toggleLogin: toggleLogin,
    loginUser,
    setLoginUser,
  };

  return (
    <LoginContext.Provider value={loginValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContext;
