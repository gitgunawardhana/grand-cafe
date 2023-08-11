import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import fb from "../../assets/images/HomePage/FB.png";
import insta from "../../assets/images/HomePage/Insta.png";
import tweet from "../../assets/images/HomePage/tweet.png";

interface Person {
  name: string;
  imageId: string;
}

interface ChefDisplayProps {
  person: Person;
}

export default function ChefDisplay({ person }: ChefDisplayProps) {
  return (
    <>
      <div className="m-4 flex h-full flex-col items-center justify-center">
        <img
          className="avatar m-2"
          src={person.imageId}
          alt={person.name}
          width=""
          height=""
        />
        <br />
        <p className="text-[20px] uppercase tracking-widest">{person.name}</p>
        <br />
        <Button
          as={NavLink}
          to="/"
          className={twMerge(
            "  border-none !bg-red-700  px-[30px] py-[15px] text-white   sm:px-[30px] sm:py-[10px]"
          )}
        >
          <span
            className={twMerge(
              " text-[14px] font-[900] uppercase tracking-[6px]  "
            )}
          >
            Follow +
          </span>
        </Button>
        <br />
        <div className="justify-content grid grid-cols-3 items-center">
          <div className="m-2">
            <img src={fb} alt="" className="" />
          </div>
          <div className="m-2">
            <img src={insta} alt="" className="" />
          </div>
          <div className="m-2">
            <img src={tweet} alt="" className="" />
          </div>
        </div>
      </div>
    </>
  );
}
