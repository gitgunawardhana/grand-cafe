import { twMerge } from "tailwind-merge";
import Footer from "../../components/Footer";
import SideMenu from "../../components/SideMenu";
interface SideMenuLayoutsProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  footer?: boolean;
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
        {props.footer && (
          <div className="-mx-5 -mb-5 mt-10">
            <Footer />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
