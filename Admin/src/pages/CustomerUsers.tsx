import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

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

const Main = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [users, setUsers] = useState<User[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/get-all-users");
      const json = await res.json();

      setUsers(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (emailToDelete: string) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to delete this user?`,
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
            `http://localhost:8000/api/user/delete-user-by-email?email=${emailToDelete}`
          )
          .then((response) => {
            // Handle success
            console.log("User deleted successfully:", response.data);
          })
          .then(() => {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.email !== emailToDelete)
            );
            Swal.fire({
              position: "center",
              icon: "success",
              text: "User deleted successfully",
              background: "#A96C07",
              color: "#fff",
              showConfirmButton: false,
              timer: 5000,
            });
          })
          .catch((error) => {
            // Handle error
            console.error("Error deleting user:", error);
            Swal.fire({
              position: "center",
              icon: "error",
              text: "Error deleting user. Please try again later.",
              background: "#A96C07",
              color: "#fff",
              showConfirmButton: false,
              timer: 3000,
            });
          });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
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
                Avatar
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Mobile Number
              </th>
              <th className="px-6 py-3 bg-amber-500 text-left text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 bg-amber-500 text-xs leading-4 font-semibold text-gray-600 uppercase tracking-wider justify-center text-center">
                Actions
              </th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {users &&
              currentItems.map((user: User) => (
                <tr key={user.email} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    <img
                      className="h-12 w-12 rounded-full object-cover"
                      src={user.avatar}
                      alt="user avatar"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {user.mobileNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800">
                    {user.address}
                  </td>
                  <td className="flex px-6 py-4 whitespace-nowrap text-sm leading-5 text-gray-800 justify-center items-center">
                    <div className="px-4">
                      <Link to={`/customer-user/${user._id}`}>
                        <Icon
                          style={{ color: "green" }}
                          icon="fluent:edit-16-regular"
                          width="24"
                          className="hover:scale-125 cursor-pointer"
                        />
                      </Link>
                    </div>
                    <div className="px-4">
                      <button
                        className="cursor-pointer"
                        onClick={() => {
                          deleteUser(user.email);
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
                  {/* Add more cells with product data as needed */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <ul className="flex">
          {Array(Math.ceil(users.length / itemsPerPage))
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
