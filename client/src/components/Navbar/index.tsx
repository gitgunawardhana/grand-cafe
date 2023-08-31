import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import NavigationBg from "../../assets/images/NavigationBg.svg";
import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import Logo from "../../base-components/Logo";
import LucideIcon from "../../base-components/LucideIcon";
import { handleLogout } from "../../services/auth";
import { ProviderContext } from "../Provider";
import SocailMediaLinks from "../SocailMediaLinks";
import "./Navbar.css";
import { navigationLinks } from "./navigationLinks";

function Main() {
  const navigate = useNavigate();

  //* Dropdown menu handler - start
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  //* Dropdown menu handler - end

  //* Set class name according to window width - start
  const [clsProfileBtn, setClsProfileBtn] = useState("");
  const { windowSize, axiosJWT } = useContext(ProviderContext);

  useEffect(() => {
    if (windowSize.width < 1200) {
      setClsProfileBtn("fixed right-[29px] top-[38px]");
      setIsDropdownOpen(false);
    } else {
      setClsProfileBtn("");
      setIsDropdownOpen(true);
    }
  }, [windowSize.width, clsProfileBtn]);
  //* Set class name according to window width - end

  return (
    <div>
      <div className="">
        <div className="z-50 flex !justify-end text-right">
          <div className="fixed top-0 z-50 my-2 mr-2">
            {/* {SocailMediaLinks()} */}
            <SocailMediaLinks />
          </div>
        </div>
      </div>

      <nav
        style={{
          backgroundImage: `url(LKR{NavigationBg})`,
          backgroundSize: "cover",
          objectFit: "cover",
        }}
        className={twMerge(
          "fixed left-0 top-0 z-20 w-full border-none backdrop-blur-md "
        )}
      >
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Button
            as={NavLink}
            to="/"
            className="flex items-center !border-none !bg-transparent !shadow-none"
          >
            <Logo className="!h-14 !w-14" />
            <span className="hidden self-center whitespace-nowrap text-2xl font-semibold dark:text-white sm:!block">
              GRAND CAFE
            </span>
          </Button>
          <div className={twMerge(["flex md:order-2", clsProfileBtn])}>
            <Button
              type="button"
              className="inline-flex h-9 w-9 translate-y-0.5 items-center justify-center rounded-full border-2 !border-gradient-yellow-500 !bg-transparent p-2 text-sm !text-gradient-yellow-500 hover:bg-transparent min-[1200px]:hidden"
              aria-expanded="false"
              onClick={handleToggleDropdown}
            >
              <span className="sr-only">Open</span>
              <LucideIcon icon="MoreVertical" strokeWidth={2} />
            </Button>
          </div>
          <div
            className={twMerge([
              "flex md:order-2",
              clsProfileBtn,
              "!hidden min-[1195px]:!block",
            ])}
          >
            <ul
              className="list-style-none ml-auto flex flex-row pl-0 md:pl-4"
              data-te-navbar-nav-ref
            >
              <li className="mt-1 px-2" data-te-nav-item-ref>
                <form className="!my-auto content-center md:flex">
                  <InputField
                    type="search"
                    className="min-w-[210x] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                    placeholder="Search here your favorites"
                  />

                  <span
                    className="input-group-text my-[8px] flex items-center whitespace-nowrap rounded px-3 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                    id="basic-addon2"
                  >
                    <LucideIcon
                      icon="Search"
                      strokeWidth={2}
                      className="text-gradient-yellow-900"
                    />
                  </span>
                </form>
              </li>

              <li className="px-2" data-te-nav-item-ref>
                <Button
                  as={
                    sessionStorage.getItem("accessToken") ? undefined : NavLink
                  }
                  to="/sign-in"
                  className="!rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-10 !py-2 text-sm font-medium uppercase text-black hover:text-black"
                  onClick={
                    sessionStorage.getItem("accessToken")
                      ? (e) => handleLogout(e, axiosJWT, navigate)
                      : undefined
                  }
                >
                  {sessionStorage.getItem("accessToken") ? "Logout" : "Login"}
                </Button>
              </li>
            </ul>
          </div>
          {isDropdownOpen && (
            <div className="ml-0 w-full items-center justify-between  md:order-1 md:flex min-[1200px]:w-auto">
              <ul className="cus-navbar !mt-4 flex w-full  flex-col rounded-lg border border-gradient-yellow-500 p-5 max-[1200px]:border  min-[1200px]:flex-row">
                {navigationLinks?.map((item, id) => (
                  <li key={id}>
                    <Button
                      as={NavLink}
                      to={item.to}
                      className={twMerge([
                        "cus-nav-item mb-6 block border-none !bg-transparent p-0 !px-0 py-0 !pb-[.1] !pt-0 !font-extrabold uppercase !text-gradient-yellow-500 hover:!text-gradient-yellow-900",
                        "shadow-none",
                      ])}
                      aria-current="page"
                    >
                      {item.title}
                    </Button>
                  </li>
                ))}
                <li
                  className="!mb-3 !w-[100%] min-[1195px]:hidden"
                  data-te-nav-item-ref
                >
                  <form className="flex !w-full">
                    <InputField
                      type="search"
                      className="cus-nav-search-bar !w-[100%] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 placeholder-gradient-yellow-500 !placeholder-opacity-25"
                      placeholder="Search here your favorites"
                    />
                    <span
                      className="input-group-text my-[8px] flex items-center whitespace-nowrap rounded px-3 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                      id="basic-addon2"
                    >
                      <LucideIcon
                        icon="Search"
                        strokeWidth={2}
                        className="text-gradient-yellow-900"
                      />
                    </span>
                  </form>
                </li>

                <li className="!-mt-1 min-[1195px]:hidden" data-te-nav-item-ref>
                  <Button className="!rounded-[10px] border-none !bg-gradient-to-b from-gradient-yellow-500 to-gradient-yellow-900 !px-10 !py-2 text-sm font-medium uppercase text-black hover:text-black">
                    {sessionStorage.getItem("accessToken") ? "Logout" : "Login"}
                  </Button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Main;
