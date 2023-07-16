import Back_01 from "../../assets/images/HomePage/Back_01.svg";
import Back_02 from "../../assets/images/HomePage/Back_02.svg";
import Text_01 from "../../assets/images/HomePage/Text_01.png";
import Text_02 from "../../assets/images/HomePage/Text_02.png";
import Text_03 from "../../assets/images/HomePage/Text_03.png";
import Text_04 from "../../assets/images/HomePage/Text_04.png";
import Text_05 from "../../assets/images/HomePage/Text_05.png";
import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";



const Main = () => {
  return (
    <div>
        <div
            style={{
                backgroundImage: `url(${Back_01})`,
                backgroundSize: "cover",
          
            }}
            className="w-m flex flex-col p-5 pt-[80px] text-center text-slate-900  dark:text-slate-50 h-screen md:h-screen sm:h-screen"
        >
            <div className="grid grid-cols-3 p-5 items-center h-screen ">
                <div className="flex justify-center items-center flex-col">
                    <img src={Text_03} alt=""/>
                    <br></br>
                    <img src={Text_04} alt=""/>
                    <br></br>
                    <img src={Text_05} alt=""/>
                    <br></br>
                    <br></br>
                    <div className="grid grid-cols-2">
                        <div>
                        <Button
                    as={NavLink}
                    to="/"
                    className={twMerge(
                      "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[20px] py-[10px] lg:px-[50px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "text-[14px] font-[900] uppercase tracking-[0px] !text-#FFE353 hover:scale-110"
                      )}
                    >
                      Book A Table
                    </span>
                  </Button>
                        </div>
                        <div>
                            
                        </div>
                   

                    </div>
                </div>
                <div></div>
                <div></div>
                
            </div>
            

        </div>
        <div
            style={{
                backgroundImage: `url(${Back_02})`,
                backgroundSize: "cover",
          
            }}
            className="w-m flex flex-col p-5 pt-[80px] text-center text-slate-900  dark:text-slate-50 h-screen md:h-screen sm:h-screen"
        >
            <div className="flex justify-center items-center flex-col">
                <img src={Text_01} alt=""/>
                <br></br>
                <img className="jsutify-center" src={Text_02} alt=""/>


            </div>
        </div>
      
    </div>
  )
}

export default Main
