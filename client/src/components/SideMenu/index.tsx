import { NavLink } from "react-router-dom";
import ButtonBg from "../../assets/images/ButtonBg.svg";
import { Button } from "../../base-components/Button";
import Logo from "../../base-components/Logo";

import SocailMediaLinks from "../SocailMediaLinks";
import { sideNavigationLinks } from "./navigationLinks";

const SidebarMenu = () => {
  const openNav = () => {
    const sidebar = document.querySelector("aside");
    const maxSidebar = document.querySelector(".max");
    const miniSidebar = document.querySelector(".mini");
    const maxToolbar = document.querySelector(".max-toolbar");
    const logo = document.querySelector(".logo");
    const content = document.querySelector(".content");

    if (sidebar?.classList.contains("-translate-x-48")) {
      // max sidebar
      sidebar.classList.remove("-translate-x-48");
      sidebar.classList.add("translate-x-none");
      maxSidebar?.classList.remove("hidden");
      maxSidebar?.classList.add("flex");
      miniSidebar?.classList.remove("flex");
      miniSidebar?.classList.add("hidden");
      maxToolbar?.classList.add("translate-x-0");
      maxToolbar?.classList.remove("translate-x-24", "scale-x-0");
      logo?.classList.remove("ml-12");
      content?.classList.remove("ml-12");
      content?.classList.add("ml-12", "md:ml-60");
    } else {
      // mini sidebar
      sidebar?.classList.add("-translate-x-48");
      sidebar?.classList.remove("translate-x-none");
      maxSidebar?.classList.add("hidden");
      maxSidebar?.classList.remove("flex");
      miniSidebar?.classList.add("flex");
      miniSidebar?.classList.remove("hidden");
      maxToolbar?.classList.add("translate-x-24", "scale-x-0");
      maxToolbar?.classList.remove("translate-x-0");
      logo?.classList.add("ml-12");
      content?.classList.remove("ml-12", "md:ml-60");
      content?.classList.add("ml-12");
    }
  };
  return (
    <div className="bg-gradient-brown-900">
      <aside className="fixed z-50 flex h-screen w-60 -translate-x-48 transform rounded-r-lg bg-gradient-brown-500 transition duration-1000 ease-in-out">
        {/*  open sidebar button  */}
        <div className="max-toolbar absolute -right-6 top-2 flex h-12 w-full translate-x-24 scale-x-0 transform items-center justify-between rounded-full border-4 border-gradient-brown-900 bg-gradient-brown-500 transition duration-300 ease-in">
          <div
            style={{
              backgroundImage: `url(LKR{ButtonBg})`,
              backgroundSize: "inherit",
            }}
            className="group flex items-center space-x-3 rounded-full bg-gradient-to-r !from-gradient-green-500 !via-gradient-blue-500 !to-gradient-blue-500 py-1  pl-10 pr-2 text-gradient-yellow-500"
          >
            <div className="mr-12 transform duration-300 ease-in-out">
              <div className="flex content-center justify-center">
                <Logo className="m-auto" />
                <div className="m-auto pl-2 text-sm text-gradient-yellow-900">
                  Grand Cafe
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          onClick={() => openNav()}
          className="absolute -right-6 top-2 flex transform rounded-full border-4 border-gradient-brown-900 bg-gradient-brown-500 p-3 text-gradient-yellow-900 transition duration-500 ease-in-out hover:rotate-45 hover:bg-gradient-green-500 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        </div>
        {/*  MAX SIDEBAR */}
        <div className="max mt-20 hidden h-[calc(100vh)] w-full flex-col space-y-2 text-gradient-yellow-500">
          {sideNavigationLinks?.map((linkItem) => (
            <div key={linkItem.title}>
              <Button
                as={NavLink}
                to={linkItem.to}
                generalStylesStatus={false}
                className="flex !w-full transform flex-row items-center space-x-3 rounded-full border-none bg-gradient-brown-500 !p-2 !px-8 text-gradient-yellow-500 shadow-none duration-300 ease-in-out hover:ml-4 hover:!text-gradient-yellow-900"
              >
                <img src={linkItem.icon} className="h-4" alt="" />
                <div>{linkItem.title}</div>
              </Button>
              {(linkItem.title === "Food cart" ||
                linkItem.title === "Settings") && (
                <hr className="!my-3 mx-auto h-[2px] w-[75%] rounded border-0 bg-gradient-yellow-300 opacity-50" />
              )}
            </div>
          ))}
          <div className="absolute bottom-5 w-full">
            <div className="flex justify-center">
              <SocailMediaLinks />
            </div>
          </div>
        </div>
        {/*  MINI SIDEBAR */}
        <div className="mini mt-20 flex h-[calc(100vh)] w-full flex-col space-y-2">
          {sideNavigationLinks?.map((linkItem) => (
            <div key={linkItem.title}>
              <Button
                as={NavLink}
                to={linkItem.to}
                generalStylesStatus={false}
                className="flex !w-full transform justify-end !rounded-full bg-gradient-brown-500 !p-3 !pr-5 text-gradient-yellow-500 duration-300 ease-in-out hover:ml-4 hover:!text-gradient-yellow-900"
              >
                <img src={linkItem.icon} className="h-4" alt="" />
              </Button>
              {(linkItem.title === "Food cart" ||
                linkItem.title === "Settings") && (
                <hr className="!my-3 mx-auto h-[2px] w-[90%] rounded border-0 bg-gradient-yellow-300 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SidebarMenu;
