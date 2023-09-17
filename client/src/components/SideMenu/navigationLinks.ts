export interface sideNavigationLinks {
  title: string;
  to: string;
}

import SideCustomerSupport from "../../assets/sidemenuIcon/SideCustomerSupport.svg";
import SideFavorite from "../../assets/sidemenuIcon/SideFavorite.svg";
import SideFoodCart from "../../assets/sidemenuIcon/SideFoodCart.svg";
import SideHome from "../../assets/sidemenuIcon/SideHome.svg";
import SideLogout from "../../assets/sidemenuIcon/SideLogout.svg";
import SideMessage from "../../assets/sidemenuIcon/SideMessage.svg";
import SideOrderMenu from "../../assets/sidemenuIcon/SideOrderMenu.svg";
import SideSettings from "../../assets/sidemenuIcon/SideSettings.svg";

export const sideNavigationLinks = [
  {
    icon: SideHome,
    title: "Home",
    to: "/home",
  },
  {
    icon: SideOrderMenu,
    title: "Order menu",
    to: "/product-page",
  },
  {
    icon: SideFavorite,
    title: "Favorite",
    to: "/favorite",
  },
  {
    icon: SideFoodCart,
    title: "Food cart",
    to: "/cart",
  },
  {
    icon: SideCustomerSupport,
    title: "Contact Us",
    to: "/customer-support",
  },
  {
    icon: SideMessage,
    title: "About Us",
    to: "/message",
  },
  {
    icon: SideSettings,
    title: "Your Profile",
    to: "/customer-acc",
  },
  {
    icon: SideLogout,
    title: sessionStorage.getItem("accessToken") ? "Logout" : "Login",
    to: sessionStorage.getItem("accessToken") ? "" : "/sign-in",
  },
];
