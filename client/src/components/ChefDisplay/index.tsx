
import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

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
     <div className="flex flex-col justify-center items-center h-full m-4">
                <img
                className="avatar m-2"
                src={person.imageId}
                alt={person.name}
                width=''
                height=''
            /><br/>
      <p className="uppercase tracking-widest text-[20px]">{person.name}</p><br/>
      <Button
                  as={NavLink}
                  to="/"
                  className={twMerge(
                    "  border-none text-white  !bg-red-700 px-[30px] py-[15px]   sm:px-[25px] sm:py-[10px]"
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
      </div>
      </>
        
     
    );
  }