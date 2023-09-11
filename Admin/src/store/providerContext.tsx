import axios, { AxiosInstance } from "axios";
import jwt_decode from "jwt-decode";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export interface Product {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: string;
  rate: number;
  category: string;
}

export interface ProviderContextInterface {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  axiosJWT: AxiosInstance;
}

const defaultState: ProviderContextInterface = {
  products: [],
  setProducts: () => {},
  axiosJWT: axios.create({
    baseURL: "http://localhost:8000/api",
  }),
};

export const ProviderContext = createContext<ProviderContextInterface>(
  defaultState
);

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const Provider = (props: ProviderProps) => {
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

  return (
    <ProviderContext.Provider
      value={{
        products,
        setProducts,
        axiosJWT: defaultState.axiosJWT, // You can provide your axios instance here
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
