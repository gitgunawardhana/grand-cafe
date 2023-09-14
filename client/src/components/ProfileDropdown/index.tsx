import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import profileIcon from "../../assets/icons/profileIcon.png";
import { handleLogout } from "../../services/auth";
import { ProviderContext } from "../Provider";
import { UserProviderContext } from "../Provider/UserProvider";

const ProfileDropdwon = () => {
  const { axiosJWT } = useContext(ProviderContext);
  const { user } = useContext(UserProviderContext);
  const navigate = useNavigate();
  return (
    <>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button className="relative flex border-spacing-2 rounded-full border border-[#fff] text-sm">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={user.avatar ? user.avatar : profileIcon}
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-gradient-brown-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/customer-acc"
                  className={twMerge([
                    active ? "bg-[#5037175b]" : "",
                    "block px-4 py-2 text-sm text-gradient-yellow-900",
                  ])}
                >
                  Your Profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/table-booking"
                  className={twMerge([
                    active ? "bg-[#5037175b]" : "",
                    "block px-4 py-2 text-sm text-gradient-yellow-900",
                  ])}
                >
                  Table Booking
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={twMerge([
                    active ? "bg-[#5037175b]" : "",
                    "block w-full px-4 py-2 text-left text-sm text-gradient-yellow-900",
                  ])}
                  onClick={(e) => handleLogout(e, axiosJWT, navigate)}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ProfileDropdwon;
