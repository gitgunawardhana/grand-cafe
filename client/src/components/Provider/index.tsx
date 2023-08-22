import { createContext, useEffect, useState } from "react";
import { getWindowSize } from "../../utils";


export interface Product {
  name: string;
  image: string;
  description: string;
  price: string;
}

// type ProductType = Product;

// type Product = {
//   // Define your product properties
// };

// Define the type for your context value
type ContextValue = {
  windowSize: { width: number; height: number };
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

// export const ProviderContext = createContext({
//   windowSize: {
//     width: 0,
//     height: 0,
//   },
// });

export const ProviderContext = createContext<ContextValue | undefined | any>({
  windowSize: {
    width: 0,
    height: 0,
  }
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

  const contextValue: ContextValue = {
    windowSize,
    products,
    setProducts,
  };

  return (
    
    <ProviderContext.Provider
      value={contextValue}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
