import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import TableBookingHeadingTitle from "../../assets/images/tableBookingHeadingTitle.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import MuiDateTimePicker from "../../components/MuiDateTimePicker";
import { ProviderContext, refreshToken } from "../../components/Provider";
import ChairIcon, { Seat } from "../../components/TableBooking/ChairIcon";
import TableNumber from "../../components/TableBooking/TableNumber";
import { AlignmentTypes } from "../../constants";

// const seatsInitialState: Seat[] = seatsBackend;

const Main = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const [selectedInDate, setSelectedInDate] = useState<any>(dayjs());
  const [selectedInTime, setSelectedInTime] = useState<any>(dayjs());
  const [selectedOutDate, setSelectedOutDate] = useState<any>(dayjs());
  const [selectedOutTime, setSelectedOutTime] = useState<any>(dayjs());

  // Handle the in-date change
  const handleInDateChange = (date: any) => {
    setSelectedInDate(date);
  };

  // Handle the in-time change
  const handleInTimeChange = (time: any) => {
    setSelectedInTime(time);
  };

  // Handle the out-date change
  const handleOutDateChange = (date: any) => {
    setSelectedOutDate(date);
  };

  // Handle the out-time change
  const handleOutTimeChange = (time: any) => {
    setSelectedOutTime(time);
  };

  console.log(
    "in-time ",
    dayjs(selectedInTime).add(1, "minute").format("HH:mm:ss")
  );
  console.log(
    "out-time ",
    dayjs(selectedOutTime).subtract(1, "minute").format("HH:mm:ss")
  );
  console.log("in-date ", dayjs(selectedInDate).format("YYYY-MM-DD"));
  console.log("out-date ", dayjs(selectedOutDate).format("YYYY-MM-DD"));

  const [seatsInitialState, setSeatsInitialState] = useState<Seat[]>([]);
  const getAllSeats = async () => {
    try {
      refreshToken();
      const res = await axiosJWT.get("user/get-available-seats", {
        params: {
          inDateTime: `${dayjs(selectedInDate).format("YYYY-MM-DD")}T${dayjs(
            selectedInTime
          )
            .add(1, "minute")
            .format("HH:mm:ss")}Z`,
          outDateTime: `${dayjs(selectedOutDate).format("YYYY-MM-DD")}T${dayjs(
            selectedOutTime
          )
            .subtract(1, "minute")
            .format("HH:mm:ss")}Z`,
        },
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });
      setSeatsInitialState(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllSeats();
  }, [
    sessionStorage.getItem("accessToken"),
    sessionStorage.getItem("refreshToken"),
    selectedInDate,
    selectedInTime,
    selectedOutDate,
    selectedOutTime,
  ]);

  const seatsBackend = seatsInitialState;

  const [commentState, setCommentState] = useState<boolean>(false);
  const [seats, setSeats] = useState<Seat[]>(seatsBackend);

  useEffect(() => {
    setSeats(seatsBackend);
  }, [seatsInitialState, seatsBackend]);

  const [currentSeatsBooking, setCurrentSeatsBooking] = useState<string[]>([]);
  const [currentUserSeatsBooking, setUserCurrentSeatsBooking] = useState<
    string[]
  >([]);

  const getBookingSeatNumbersByUserId = async () => {
    try {
      const res = await axiosJWT.get(
        "user/get-all-pending-seat-booking-by-user?snumber=true",
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );
      if (res.data.flat().length === 0) {
        sessionStorage.removeItem("seatBookingId");
      }
      setUserCurrentSeatsBooking(res.data.flat());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBookingSeatNumbersByUserId();
  }, [seatsInitialState]);

  const getSeatByNumber = (seatList: Seat[], seatNumber: string) => {
    return seatList.find((seat) => seat.number === seatNumber);
  };

  const handleSeatAvailableClick = (seatNumber: string) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.number === seatNumber &&
        getSeatByNumber(seatsInitialState, seatNumber)?.available === true
          ? { ...seat, available: !seat.available }
          : seat
      )
    );
  };

  const handleCurrentSeatsBooking = (seatNumber: string) => {
    if (currentSeatsBooking.includes(seatNumber)) {
      // Remove seatNumber if it's already present
      setCurrentSeatsBooking(
        currentSeatsBooking.filter((seat) => seat !== seatNumber)
      );
    } else {
      // Add seatNumber if it's not already present
      getSeatByNumber(seatsInitialState, seatNumber)?.available &&
        setCurrentSeatsBooking([...currentSeatsBooking, seatNumber]);
    }
  };
  // console.log("currentSeatsBooking ", currentSeatsBooking);

  return (
    <div className="-mb-5 min-h-screen select-none !bg-transparent">
      <div className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text pt-10 text-center text-[20px] font-extrabold uppercase text-transparent sm:text-[25px] md:text-[30px] lg:text-[45px]">
        {/* <h1>TABLE BOOKING</h1> */}
        <img
          className="m-auto mb-10 mt-4 w-96 px-5"
          src={TableBookingHeadingTitle}
          alt="TABLE BOOKING"
        />
      </div>
      <div className="flex justify-center">
        <div className="py-10">
          <div className="grid grid-cols-1 justify-center text-white lg:grid-cols-1">
            <div className="lg:order-0 order-1 col-span-3 mx-auto mt-10 flex max-w-[400px] rounded-lg bg-[#151515] px-3 pt-10 lg:col-start-2 lg:mr-8 lg:mt-0">
              {tableBookingForm(
                currentSeatsBooking,
                setCommentState,
                commentState,
                currentUserSeatsBooking,
                selectedInDate,
                selectedInTime,
                handleInDateChange,
                handleInTimeChange,
                selectedOutDate,
                selectedOutTime,
                handleOutDateChange,
                handleOutTimeChange
              )}
            </div>
            {/* second column */}
            <div className="order-0 col-span-9 mx-auto rounded-3xl border border-yellow-400 !py-0 lg:order-1 lg:col-start-5 lg:!max-h-[666px] lg:min-w-[860px]">
              {RestaurantMap(
                handleCurrentSeatsBooking,
                handleSeatAvailableClick,
                getSeatByNumber,
                seats,
                seatsInitialState
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

function tableBookingForm(
  currentSeatsBooking: string[],
  setCommentState: (value: boolean) => void,
  commentState: boolean,
  currentUserSeatsBooking: string[],
  selectedInDate: any,
  selectedInTime: any,
  handleInDateChange: any,
  handleInTimeChange: any,
  selectedOutDate: any,
  selectedOutTime: any,
  handleOutDateChange: any,
  handleOutTimeChange: any
) {
  const { axiosJWT } = useContext(ProviderContext);

  const createSeatBooking = async () => {
    try {
      const res = await axiosJWT.post(
        "user/create-seat-booking",
        {
          inDateTime: `${dayjs(selectedInDate).format("YYYY-MM-DD")}T${dayjs(
            selectedInTime
          ).format("HH:mm:ss")}Z`,
          outDateTime: `${dayjs(selectedOutDate).format("YYYY-MM-DD")}T${dayjs(
            selectedOutTime
          ).format("HH:mm:ss")}Z`,
          bookingSeats: currentSeatsBooking,
        },
        {
          headers: {
            authorization: "Bearer " + sessionStorage.getItem("accessToken"),
          },
        }
      );

      sessionStorage.setItem("seatBookingId", res.data._id);

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Your table has been successfully booked. We look forward to serving you.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Sorry, we couldn't book your table at this time. Please try again or contact us for assistance.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const deleteSeatBookingByUser = async () => {
    try {
      const res = await axiosJWT.delete("user/delete-seats-booking-by-user", {
        headers: {
          authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
      });

      sessionStorage.removeItem("seatBookingId");

      Swal.fire({
        position: "center",
        icon: "success",
        text: "Your reservation has been successfully canceled. We hope to see you again soon!",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => {
        location.reload();
      }, 500);
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Sorry, we couldn't cancel your reservation at this time. Please try again or contact us for assistance.",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  // console.log("time ", dayjs(selectedInTime).format("HH:mm:ss"));
  // console.log("date ", dayjs(selectedInDate).format("YYYY-MM-DD"));

  return (
    <div className="m-auto flex px-2 pb-20">
      <div className="mx-auto">
        <h1 className="mx-auto mb-3 !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-center text-2xl font-extrabold uppercase text-transparent">
          Book Your Table
        </h1>
        <hr className="mx-auto !mb-14 !mt-3 h-[2px] rounded border-0 bg-gradient-yellow-900 opacity-50" />
        <div className="flex gap-2">
          <div className="">
            <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base">
              Booking in-date
            </h2>
            <MuiDateTimePicker
              variant="desktop"
              time={false}
              onDateChange={handleInDateChange}
            />
          </div>
          <div className="">
            <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base">
              In-time
            </h2>
            <MuiDateTimePicker
              variant="desktop"
              date={false}
              onTimeChange={handleInTimeChange}
            />
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <div className="">
            <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base">
              Booking out-date
            </h2>
            <MuiDateTimePicker
              variant="desktop"
              time={false}
              onDateChange={handleOutDateChange}
            />
          </div>
          <div className="">
            <h2 className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base">
              Out-time
            </h2>
            <MuiDateTimePicker
              variant="desktop"
              date={false}
              onTimeChange={handleOutTimeChange}
            />
          </div>
        </div>
        <br />
        <div className="">
          <>
            <p className="!bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base">
              Seat number
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                ...new Set([
                  ...currentSeatsBooking,
                  ...currentUserSeatsBooking,
                ]),
              ]?.map((item) => (
                <div
                  key={item}
                  className="m-0 !mb-2 !mt-1 !rounded-md border-none !bg-opacity-20 !bg-gradient-to-b from-gradient-yellow-900-6 to-gradient-yellow-900-2 !px-2 !py-2 text-xs font-semibold uppercase md:!px-2 md:py-2 md:text-sm"
                >
                  <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </>
          <br />
          <div>
            <p
              onClick={() => {
                setCommentState(!commentState);
              }}
              className="cursor-pointer select-none !bg-gradient-to-r from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text !text-sm font-extrabold text-transparent md:!text-base"
            >
              + Add comment
            </p>

            <div
              className={`transform transition-transform duration-500 ${
                commentState ? "translate-y-0" : "translate-y-1"
              }`}
            >
              <InputField
                className={twMerge([
                  "border !border-gradient-yellow-900 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25 ",
                  commentState ? "block" : "hidden ",
                ])}
                placeholder="Add comment (Optional)"
                labelAlignment={AlignmentTypes.BLOCK}
              />
            </div>
          </div>
          <div
            className={`!mb-5 flex transform transition-transform duration-500 ${
              commentState ? "translate-y-full" : "translate-y-2"
            }`}
          >
            {!Boolean(sessionStorage.getItem("seatBookingId")) ? (
              <Button
                className={twMerge([
                  "m-0 !mx-auto min-w-[300px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-16 !py-4 text-xs font-semibold uppercase text-black hover:text-black md:!px-20 md:!py-5 md:text-sm",
                  currentSeatsBooking.length === 0 &&
                    "cursor-not-allowed opacity-40",
                ])}
                onClick={createSeatBooking}
                disabled={currentSeatsBooking.length === 0}
              >
                <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                  Make Reservation
                </p>
              </Button>
            ) : (
              <Button
                as={Link}
                to="/recipe-generator"
                className={twMerge([
                  "m-0 !mx-auto min-w-[300px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-gradient-green-400 !bg-opacity-20 !px-16 !py-4 text-xs font-semibold uppercase text-black hover:text-black md:!px-20 md:!py-5 md:text-sm",
                ])}
              >
                <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                  Generate Recipe
                </p>
              </Button>
            )}
          </div>
          <div
            className={`flex transform transition-transform duration-500 ${
              commentState ? "translate-y-full" : "translate-y-2"
            }`}
          >
            <Button
              className={twMerge([
                "m-0 !mx-auto min-w-[300px] !rounded-[10px] border border-gradient-yellow-100-15 !bg-transparent !bg-opacity-20 !px-16 !py-4 text-xs font-semibold uppercase text-black hover:text-black hover:shadow-[0_4px_18px_0_rgba(212,71,0,0.2)] md:!px-20 md:!py-5 md:text-sm",
                currentUserSeatsBooking.length === 0 &&
                  "cursor-not-allowed opacity-40",
              ])}
              onClick={deleteSeatBookingByUser}
              disabled={currentUserSeatsBooking.length === 0}
            >
              <p className="!bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 bg-clip-text text-transparent">
                Delete Reservation
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RestaurantMap(
  handleCurrentSeatsBooking: (seatNumber: string) => void,
  handleSeatAvailableClick: (seatNumber: string) => void,
  getSeatByNumber: (seatList: Seat[], seatNumber: string) => Seat | undefined,
  seats: Seat[],
  seatsInitialState: Seat[]
) {
  return (
    <div className="grid select-none grid-cols-8">
      <div className="col-span-2 grid h-[663px]">
        <div
          id="table-01-main"
          className="flex border-b-[1px] border-r-[1px] border-dashed border-yellow-400"
        >
          <div id="table-01" className="m-auto">
            <div className="grid grid-cols-2">
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T1S1"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T1S2"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div
                className={twMerge([
                  "col-span-2 col-start-1 row-start-2 flex",
                  "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                ])}
              >
                <TableNumber tNum={1} />
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T1S3"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T1S4"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="table-02-main"
          className="flex border-b-[1px] border-r-[1px] border-dashed border-yellow-400"
        >
          <div id="table-02" className="m-auto">
            <div className="grid grid-cols-2">
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T2S1"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T2S2"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div
                className={twMerge([
                  "col-span-2 col-start-1 flex",
                  "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                ])}
              >
                <TableNumber tNum={2} />
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T2S3"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T2S4"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="table-03-main"
          className="flex border-r-[1px] border-dashed border-yellow-400"
        >
          <div id="table-03" className="m-auto">
            <div className="grid grid-cols-2 ">
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T3S1"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T3S2"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div
                className={twMerge([
                  "col-span-2 col-start-1 row-start-2 flex",
                  "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                ])}
              >
                <TableNumber tNum={3} />
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T3S3"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
              <div className="flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T3S4"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <div className="grid translate-y-7 grid-cols-2 grid-rows-2">
          <div id="table-04-main" className="col-start-1 row-start-1 flex">
            <div id="table-04" className="m-auto">
              <div className="grid grid-cols-1 grid-rows-3">
                <div className="flex">
                  <div className="m-auto translate-y-[5px] md:translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T4S1"}
                      rotateClass={"rotate-0"}
                    />
                  </div>
                </div>
                <div
                  className={twMerge([
                    "flex",
                    "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                  ])}
                >
                  <TableNumber tNum={4} />
                </div>
                <div className="flex">
                  <div className="m-auto -translate-y-[5px] md:-translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T4S2"}
                      rotateClass={"rotate-180"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="table-05-main" className="col-start-2 row-start-1 flex">
            <div id="table-05" className="m-auto">
              <div className="grid grid-cols-1 grid-rows-3">
                <div className="flex">
                  <div className="m-auto translate-y-[5px] md:translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T5S1"}
                      rotateClass={"rotate-0"}
                    />
                  </div>
                </div>
                <div
                  className={twMerge([
                    "flex",
                    "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                  ])}
                >
                  <TableNumber tNum={5} />
                </div>
                <div className="flex">
                  <div className="m-auto -translate-y-[5px] md:-translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T5S2"}
                      rotateClass={"rotate-180"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="table-06-main" className="col-span-2 row-start-2 flex">
            <div id="table-06" className="m-auto">
              <div className="grid grid-cols-1 grid-rows-3">
                <div className="flex">
                  <div className="m-auto translate-y-[5px] md:translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T6S1"}
                      rotateClass={"rotate-0"}
                    />
                  </div>
                </div>
                <div
                  className={twMerge([
                    "flex",
                    "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                  ])}
                >
                  <TableNumber tNum={6} />
                </div>
                <div className="flex">
                  <div className="m-auto -translate-y-[5px] md:-translate-y-[13px]">
                    <ChairIcon
                      handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                      handleSeatAvailableClick={handleSeatAvailableClick}
                      getSeatByNumber={getSeatByNumber}
                      seats={seats}
                      seatsInitialState={seatsInitialState}
                      seatNumber={"T6S2"}
                      rotateClass={"rotate-180"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 grid translate-x-0 grid-rows-3">
        <div
          id="table-07-main"
          className="row-span-2 flex h-auto border-b-[1px] border-l-[1px] border-dashed border-yellow-400"
        >
          <div
            id="table-07"
            className="m-auto -translate-x-5 md:-translate-x-8"
          >
            <div className="grid grid-cols-2 grid-rows-1">
              <div className="col-start-2 flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S1"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-6">
              <div className="flex justify-end">
                <div className="translate-y-2 pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S2"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="translate-y-0 pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S3"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="translate-y-2 pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S4"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S5"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="translate-y-3 pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S6"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <div className="translate-y-1 pr-2">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S7"}
                    rotateClass={"-rotate-90"}
                  />
                </div>
              </div>
              <div
                className={twMerge([
                  "col-start-2 row-span-6 row-start-1 h-[270px] w-fit",
                  "flex !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                ])}
              >
                <TableNumber tNum={7} />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-1">
              <div className="col-start-2 flex">
                <div className="m-auto">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T7S8"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="table-08-main"
          className="row-span-1 flex  border-l-[1px] border-dashed border-yellow-400"
        >
          <div
            id="table-08"
            className="m-auto -translate-x-5 md:-translate-x-8"
          >
            <div className="grid grid-cols-2 grid-rows-3">
              <div className="col-start-2 flex">
                <div className="m-auto translate-y-[10px] md:translate-y-[13px]">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T8S1"}
                    rotateClass={"rotate-0"}
                  />
                </div>
              </div>
              <div
                className={twMerge([
                  "col-start-2 flex",
                  "flex w-fit !rounded-md border-none !bg-opacity-20 !bg-gradient-to-r from-gradient-yellow-300 to-gradient-brown-500 px-2 text-xs",
                ])}
              >
                <TableNumber tNum={8} />
              </div>
              <div className="col-start-2 flex">
                <div className="m-auto -translate-y-[10px] md:-translate-y-[13px]">
                  <ChairIcon
                    handleCurrentSeatsBooking={handleCurrentSeatsBooking}
                    handleSeatAvailableClick={handleSeatAvailableClick}
                    getSeatByNumber={getSeatByNumber}
                    seats={seats}
                    seatsInitialState={seatsInitialState}
                    seatNumber={"T8S2"}
                    rotateClass={"rotate-180"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
