import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getWindowSize } from "../../utils";

type WindowSize = {
  width: number;
  height: number;
};

export interface Product {
  name: string;
  image: string;
  description: string;
  price: string;
}
// interface User {
//   email: string;
//   accessToken: string;
//   refreshToken: string;
// }

export interface ProviderContextInterface {
  windowSize: WindowSize;
  // seatsInitialState: Seat[];
  // setSeatsInitialState: Dispatch<SetStateAction<Seat[]>>;
  // user: User | null;
  // setUser: Dispatch<SetStateAction<User | null>>;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  axiosJWT: AxiosInstance;
}

const defaultState = {
  windowSize: {
    width: 0,
    height: 0,
  },
  setProducts: (products: Product[]) => {},
  // setSeatsInitialState: (seatsInitialState: Seat[]) => {},
  // setUser: (user: User) => {},
} as ProviderContextInterface;

// Todo: when add new one, change above interface and defaultState

export const ProviderContext = createContext(defaultState);

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const Provider = (props: ProviderProps) => {
  // const [user, setUser] = useState<User | null>(null);
  // const [seatsInitialState, setSeatsInitialState] = useState<Seat[]>([]);

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/refresh", {
        refreshToken: sessionStorage.getItem("refreshToken"),
      });
      const newTokens = res.data;

      sessionStorage.setItem("accessToken", newTokens.accessToken);
      sessionStorage.setItem("refreshToken", newTokens.refreshToken);
      return newTokens;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const axiosJWT = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  useEffect(() => {
    const handleRequestInterceptor = axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        const accessToken = sessionStorage.getItem("accessToken");

        if (accessToken) {
          const decodedToken = jwt_decode(accessToken) as { exp: number };

          if (decodedToken.exp * 1000 < currentDate.getTime()) {
            try {
              const data = await refreshToken();
              config.headers["authorization"] = "Bearer " + data.accessToken;
            } catch (err) {
              console.log("Token refresh failed:", err);
            }
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosJWT.interceptors.request.eject(handleRequestInterceptor);
    };
  });

  getWindowSize(setWindowSize);

  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products/product");
      const json = await res.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // const contextValue: ContextValue = {
  //   windowSize,
  //   products,
  //   setProducts,
  // };

  return (
    <ProviderContext.Provider
      value={{
        windowSize,
        // seatsInitialState,
        // setSeatsInitialState,
        // user,
        // setUser,
        products,
        setProducts,
        axiosJWT,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
