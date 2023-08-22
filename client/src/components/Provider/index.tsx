import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { getWindowSize } from "../../utils";
import { Seat } from "../TableBooking/ChairIcon";

type WindowSize = {
  width: number;
  height: number;
};
export interface ProviderContextInterface {
  windowSize: WindowSize;
  seatsInitialState: Seat[];
  setSeatsInitialState: Dispatch<SetStateAction<Seat[]>>;
}

const defaultState = {
  windowSize: {
    width: 0,
    height: 0,
  },
  setSeatsInitialState: (seatsInitialState: Seat[]) => {},
} as ProviderContextInterface;

// when add new one, change above interface and defaultState

export const ProviderContext = createContext(defaultState);

interface ProviderProps {
  children: React.ReactElement | React.ReactElement[];
}

const Provider = (props: ProviderProps) => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [seatsInitialState, setSeatsInitialState] = useState<Seat[]>([]);

  const getAllSeats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/user/get-all-seats"
      );
      console.log(res.data);

      setSeatsInitialState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSeats();
  }, []);

  getWindowSize(setWindowSize);
  return (
    <ProviderContext.Provider
      value={{
        windowSize,
        seatsInitialState,
        setSeatsInitialState,
      }}
    >
      {props.children}
    </ProviderContext.Provider>
  );
};

export default Provider;
