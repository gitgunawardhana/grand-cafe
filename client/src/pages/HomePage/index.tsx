import Back_01 from "../../assets/images/HomePage/Back_01.svg";
import Back_02 from "../../assets/images/HomePage/Back_02.svg";
import Text_01 from "../../assets/images/HomePage/Text_01.png";
import Text_02 from "../../assets/images/HomePage/Text_02.png";


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
