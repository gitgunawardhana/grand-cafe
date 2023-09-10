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
  _id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  rate: number;
}
export interface ProviderContextInterface {
  windowSize: WindowSize;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  axiosJWT: AxiosInstance;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
}

const defaultState = {
  windowSize: {
    width: 0,
    height: 0,
  },
  setProducts: (products: Product[]) => {},
  setTotal: (total: number) => {},
} as ProviderContextInterface;

// Todo: when add new one, change above interface and defaultState

export const ProviderContext = createContext(defaultState);

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

export const refreshToken = async () => {
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

const Provider = (props: ProviderProps) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

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
  const [total, setTotal] = useState<number>(0);

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

  return (
    <ProviderContext.Provider
      value={{
        windowSize,
        products,
        setProducts,
        axiosJWT,
        total,
        setTotal,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
