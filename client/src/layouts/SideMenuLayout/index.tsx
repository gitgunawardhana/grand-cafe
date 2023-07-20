import { twMerge } from "tailwind-merge";
import SideMenu from "../../components/SideMenu";
interface SideMenuLayoutsProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}
const Main = (props: SideMenuLayoutsProps) => {
  return (
    <>
      <SideMenu />
      <div
        className={twMerge([
          "content ml-12 transform px-2 pb-4 duration-500 ease-in-out md:px-5",
          props.className,
          // "pt-20",
        ])}
      >
        {props.children}
      </div>
    </>
  );
};

export default Main;
