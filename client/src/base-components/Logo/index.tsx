import { twMerge } from "tailwind-merge";
import Logo100percentage from "../../assets/images/logo100percentage.png";

interface LogoProps {
  className?: string;
}
const Logo = (props: LogoProps) => {
  return (
    <>
      <img
        src={Logo100percentage}
        className={twMerge(["mr-3 h-8", props.className])}
        alt="Grand Cafe Logo"
      />
    </>
  );
};

export default Logo;
