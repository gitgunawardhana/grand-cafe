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
  category: string;
}
export interface ProviderContextInterface {
  windowSize: WindowSize;
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  axiosJWT: AxiosInstance;
  total: number;
  setTotal: Dispatch<SetStateAction<number>>;
  selectedCategory: string;
  setSelectedCategory: Dispatch<SetStateAction<string>>;
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  userId : string;
  setUserId: Dispatch<SetStateAction<string>>;
  userAddress : string;
  setUserAddress: Dispatch<SetStateAction<string>>;
  addressEntered: boolean;
  setAddressEntered: Dispatch<SetStateAction<boolean>>;
  orderId:string;
  setOrderId:Dispatch<SetStateAction<string>>;
}

const defaultState = {
  windowSize: {
    width: 0,
    height: 0,
  },
  setProducts: (products: Product[]) => {},
  setTotal: (total: number) => {},
  setSelectedCategory: (selectedCategory: string) => {
    "all";
  },
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
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [count, setCount] = useState(1);
  const [userId, setUserId] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [addressEntered, setAddressEntered] = useState(false);
  const [orderId, setOrderId] = useState<string>("");

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/products/product");
      const json = await res.json();
      setProducts(json.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if(sessionStorage.email){
  
    // If email is present, fetch user data based on email and get userCode
    const fetchAllUsers = async () => {
  try {
    // Send a request to fetch all users
    const response = await axios.get("http://localhost:8000/api/user/get-all-users");
    
    if (response.status === 200) {
      // Assuming the response contains an array of user objects
      const allUsers = response.data;
      
      // Filter users based on the session storage email
      const filteredUsers = allUsers.filter((user: { email: any; }) => user.email === sessionStorage.email);
      
      if (filteredUsers.length > 0) {
        // User with matching email found
        const userData = filteredUsers[0]; // Assuming only one user matches
        console.log(userData.userCode);
        setUserId(userData.userCode); // Assign userCode to the user variable
      } else {
        // User with matching email not found
        console.log('User with email not found');
      }
    } else {
      console.log('Failed to fetch all users');
    }
  } catch (error) {
    console.error('Error fetching all users', error);
  } 
};

// Call the fetchAllUsers function to fetch all users and filter by email
fetchAllUsers();
  }

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
        selectedCategory,
        setSelectedCategory,
        modalIsOpen,
        setModalIsOpen,
        count,
        setCount,
        userId,
        setUserId,
        userAddress,
        setUserAddress,
        addressEntered,
        setAddressEntered,
        orderId,
        setOrderId,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
