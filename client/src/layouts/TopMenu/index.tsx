import { twMerge } from "tailwind-merge";
import LandingNavbar from "../../components/LandingNavbar";
import Navbar from "../../components/Navbar";

interface SideMenuLayoutsProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  landing?: boolean;
}

const Main = (props: SideMenuLayoutsProps) => {
  return (
    <div>
      {props.landing ? <LandingNavbar /> : <Navbar />}
      <div className="h-[136px]"></div>
      <div
        className={twMerge([
          "content transform duration-500 ease-in-out",
          props.className,
        ])}
      >
        {props.children}
      </div>
    </div>
  );
};

Main.defaultProps = {
  landing: false,
};
export default Main;
