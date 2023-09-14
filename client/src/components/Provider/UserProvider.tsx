import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ProviderContext } from ".";
import { getCurrentUser } from "../../services/user";

export interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  mobileNo?: string;
  gender?: string;
  address?: string;
  avatar?: string;
}

export interface UserProviderContextInterface {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
}

const defaultState = {
  setUser: (user: User) => {},
} as UserProviderContextInterface;

// Todo: when add new one, change above interface and defaultState

export const UserProviderContext = createContext(defaultState);

interface UserProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const UserProvider = (props: UserProviderProps) => {
  const { axiosJWT } = useContext(ProviderContext);

  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    gender: "",
    address: "",
    avatar: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("accessToken")) {
      getCurrentUser(axiosJWT, user, setUser);
    }
  }, []);

  return (
    <UserProviderContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserProviderContext.Provider>
  );
};

export default UserProvider;
