import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: string;
  gender: string;
  email: string;
  mobileNo: string;
}

export interface Booking {
  _id: string;
  user: User;
  inDateTime: Date;
  outDateTime: Date;
  generatedRecipe: boolean;
}

const Main = () => {
  const [generatedRecipe, setgeneratedRecipe] = useState();

  const getRecipe = async (seatBookingId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/user/get-recipe-by-seat-booking-id?seatBookingId=${seatBookingId}`
      );
      const json = await res.json();

      setgeneratedRecipe(json.recipe);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal: any = (seatBookingId: string) => {
    getRecipe(seatBookingId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const printRecipe = async () => {
    const result = await Swal.fire({
      title: `Are you sure you want to print this recipe?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "#A96C07",
      color: "#fff",
      confirmButtonColor: "#198754",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Recipe printed successfully",
        background: "#A96C07",
        color: "#fff",
        showConfirmButton: false,
        timer: 5000,
      });
    }
    setIsModalOpen(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [booking, setBooking] = useState<Booking[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch(
        "http://localhost:8000/api/user/get-all-seat-booking"
      );
      const json = await res.json();

      setBooking(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = booking.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteSeatBooking = async (SeatBookingId: string) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to delete this seat booking?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        background: "#A96C07",
        color: "#fff",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        // Send a DELETE request
        axios
          .delete(
            `http://localhost:8000/api/user/delete-seats-booking/${SeatBookingId}`
          )
          .then((response) => {
            // Handle success
            console.log("User deleted successfully:", response.data);
          })
          .then(() => {
            setBooking((prevUsers) =>
              prevUsers.filter((booking) => booking._id !== SeatBookingId)
            );
            Swal.fire({
              position: "center",
              icon: "success",
              text: "Seat booking deleted successfully",
              background: "#A96C07",
              color: "#fff",
              showConfirmButton: false,
              timer: 5000,
            });
          })
          .catch((error) => {
            // Handle error
            console.error("Error deleting seat booking:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Error deleting seat booking. Please try again later.",
              background: "#A96C07",
              color: "#fff",
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    } catch (error) {
      console.error("Error deleting seat booking:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        text: "Server Error. Please try again later.",
        background: "#A96C07",
        color: "#fff",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* <div></div>
        <div>
          <Button to="/addproduct">Add items</Button>
        </div> */}
      </div>
      <br />
      <div className="w-full flex justify-center items-stretch bg-gray-200 p-10 rounded-3xl">
        <table className="p-8 w-full max-w-screen-xl rounded-xl shadow-2xl">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                In-Date&Time
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Out-Date&Time
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Generated Recipe
              </th>
              <th className="px-6 py-3 bg-amber-500 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {booking &&
              currentItems?.map((bookingItem: Booking) => (
                <tr key={bookingItem._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {bookingItem._id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {bookingItem.user.firstName} {bookingItem.user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {bookingItem.user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {bookingItem.inDateTime.toString().split("T")[0]}
                    {" | "}
                    {
                      bookingItem.inDateTime
                        .toString()
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {bookingItem.outDateTime.toString().split("T")[0]}
                    {" | "}
                    {
                      bookingItem.outDateTime
                        .toString()
                        .split("T")[1]
                        .split(".")[0]
                    }
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    <button
                      className={twMerge([
                        "bg-green-600 px-4 py-2 rounded-lg",
                        !bookingItem.generatedRecipe && "opacity-60",
                      ])}
                      disabled={!bookingItem.generatedRecipe}
                      onClick={() => openModal(bookingItem._id)}
                    >
                      show
                    </button>
                  </td>
                  <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                    <div className="px-4">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          deleteSeatBooking(bookingItem._id);
                        }}
                      >
                        <Icon
                          style={{ color: "red" }}
                          icon="fluent:delete-24-regular"
                          width="24"
                          className="hover:scale-125 cursor-pointer"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "1000px",
            height: "auto",
            margin: "auto",
            borderRadius: "20px",
            backgroundColor: "#E4E6EA",
          },
        }}
      >
        <div className="">
          <br />
          <br />
          <h2 className="w-full bg-orange-400 px-4 py-2 rounded-t-xl">
            Generated Recipe
          </h2>
          <hr />
          <div
            style={{
              width: "958px",
              height: "650px",
              overflow: "auto",
              padding: "20px",
              border: "1px solid #ccc",
              overflowWrap: "inherit",
            }}
          >
            <pre
              style={{
                lineHeight: "1.6" /* Adjust line height for readability */,
              }}
            >
              {generatedRecipe}
            </pre>
          </div>
          <div
            style={{
              width: "958px",
              overflow: "auto",
              paddingTop: "20px",
              textAlign: "right",
              overflowWrap: "inherit",
            }}
          >
            <button
              className="bg-orange-500 rounded-lg px-4 py-2"
              onClick={printRecipe}
            >
              <div className="flex">
                PRINT&nbsp;
                <Icon icon="ion:print" width="24" className="cursor-pointer" />
              </div>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "5px",
            right: "10px",
            padding: "2px",
            backgroundColor: "transparent",
          }}
        >
          <Icon
            icon="material-symbols:close"
            width="24"
            className="cursor-pointer"
          />
        </button>
      </Modal>
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {Array(Math.ceil(booking.length / itemsPerPage))
            .fill(null)
            .map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300"
                  } px-3 py-1 mx-1 rounded cursor-pointer`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Main;
