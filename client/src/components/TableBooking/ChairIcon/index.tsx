import { twMerge } from "tailwind-merge";
import LucideIcon from "../../../base-components/LucideIcon";
import { Icons } from "../../../constants";

export interface Seat {
  number: string;
  available: boolean;
}

const Main = ({
  handleCurrentSeatsBooking,
  handleSeatAvailableClick,
  getSeatByNumber,
  seats,
  seatsInitialState,
  seatNumber,
  rotateClass,
}: {
  handleCurrentSeatsBooking: (seatNumber: string) => void;
  handleSeatAvailableClick: (seatNumber: string) => void;
  getSeatByNumber: (seatList: Seat[], seatNumber: string) => Seat | undefined;
  seats: Seat[];
  seatsInitialState: Seat[];
  seatNumber: string;
  rotateClass: string;
}) => {
  return (
    <p
      className="m-auto"
      onClick={() => {
        handleCurrentSeatsBooking(seatNumber);
        handleSeatAvailableClick(seatNumber);
      }}
    >
      <LucideIcon
        icon={Icons.ARMCHAIR}
        width={30}
        height={30}
        strokeWidth={3}
        className={twMerge([
          "w-5 cursor-pointer font-extrabold md:w-fit",
          rotateClass,
          getSeatByNumber(seats, seatNumber)?.available
            ? "text-gradient-green-400"
            : "text-gradient-yellow-900",
          !getSeatByNumber(seatsInitialState, seatNumber)?.available &&
            "cursor-not-allowed text-red-700 opacity-50",
        ])}
      />
    </p>
  );
};

export default Main;
