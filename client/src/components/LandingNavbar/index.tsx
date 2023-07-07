import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "../../base-components/Button";
import Logo from "../../base-components/Logo";
import LucideIcon from "../../base-components/LucideIcon";
import { CSSClasses } from "../../constants";
import getWindowSize from "../../utils/getWindowSize";
import ProfileOptions from "../ProfileOptions";
import { navigationLinks } from "./navigationLinks";

function Main() {
  //* Dropdown menu handler - start
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    console.log("first " + isDropdownOpen);
  };
  //* Dropdown menu handler - end

  //* Set class name according to window width - start
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [clsProfileBtn, setClsProfileBtn] = useState("");

  useEffect(() => {
    if (windowSize.width < 768) {
      setClsProfileBtn("fixed right-[29px] top-[38px]");
      setIsDropdownOpen(false);
    } else {
      setClsProfileBtn("");
      setIsDropdownOpen(true);
    }
  }, [windowSize.width, clsProfileBtn]);

  getWindowSize(setWindowSize);
  //* Set class name according to window width - end

  return (
    <div>
      <nav
        className={twMerge(
          "fixed left-0 top-0 z-20 w-full border-none !bg-transparent backdrop-blur-md dark:bg-gray-900"
        )}
      >
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Button
            as="a"
            href="/"
            className="flex items-center !border-none !bg-transparent !shadow-none"
          >
            <Logo className="!h-14 !w-14" />
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              GRAND CAFE
            </span>
          </Button>
          <div className={twMerge(["flex md:order-2", clsProfileBtn])}>
            {/* <Button type="button" className={CSSClasses.NAVBARICON}>
            </Button> */}
            <ProfileOptions className={CSSClasses.NAVBARICON} />
            <Button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex h-9 w-9 translate-y-0.5 items-center justify-center rounded-full border-2 !border-gradient-yellow-500 !bg-transparent p-2 text-sm !text-gradient-yellow-500 hover:bg-transparent md:hidden"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={handleToggleDropdown}
            >
              <span className="sr-only">Open</span>
              <LucideIcon icon="MoreVertical" strokeWidth={2} />
            </Button>
          </div>
          {isDropdownOpen && (
            <div
              className="w-full items-center justify-between md:order-1 md:flex md:w-auto"
              id="navbar-sticky"
            >
              <ul className="mt-4 flex flex-col rounded-lg border border-gradient-yellow-500 !bg-transparent bg-gray-50 p-4 font-medium backdrop-blur-md md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0">
                {navigationLinks?.map((item, id) => (
                  <li key={id}>
                    <Button
                      as={NavLink}
                      to={item.to}
                      className={twMerge([
                        "mb-6 block border-none !bg-transparent !px-0 py-0 !pb-[.1] !pt-0 uppercase !text-gradient-yellow-500 hover:!text-gradient-yellow-900 md:p-0",
                      ])}
                      aria-current="page"
                    >
                      {item.title}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Main;
