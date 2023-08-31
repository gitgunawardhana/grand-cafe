import Image1 from "../../assets/images/CustomerAccount/user.png"
import edit from "../../assets/images/CustomerView/edit.svg"
import {Link } from "react-router-dom";
const Main = () => {

  return (
    
    <div className="pb-28 ml-[100px]  sm:mr-[100px]  lg:mr-48 mt-0!m-auto flex flex-col justify-center object-cover px-12 text-center md:px-28 lg:px-32">
        
        <div className="  ml-6 col-span-2 mt-5 justify-start text-start font-black text-gradient-yellow-900 sm:text-lg md:text-2xl lg:text-4xl">
            <h1>Account Settings</h1>
        </div>

        <div className="grid grid-flow-row lg:grid-flow-col ">
          <div className="max-sm:pt-5">
            <img 
            className="  ml-[25px] mt-9 lg:w-[154px] w-36 h-36 lg:h-[154px] md:h-36 md:w-36 sm:h-32 sm:w-36 object-cover" src={Image1}>
            </img>
          </div>
          <div className="lg text-gradient-yellow-900 h-40 pt-6 lg:h-72 lg:pt-24 lg:pr-40 md:pt-24 md:pr-40 text-start font-sans">
            <h2 className="text-xl font-extrabold">Nayomi siriwardhna</h2>
            <h4 className="font-bold">Colombo,Srilanka</h4><br/>
            <h5 className="font-mono">New Customer <span><button><Link to="/customer-acc"><img src={edit} alt="edit" /></Link></button></span></h5>
            
          </div>
            
        </div>
        <div className="lg:text-md md:text-md sm:text-sm lg:ml-16 sm:ml-16 pb-4 mb-16 mt-0 grid grid-cols-2 md:grid-rows-2  text-gradient-yellow-900 text-left gap-1 md:mt-0 lg:mt-0">

            {/* <p className="">First Name</p>            
            <p className="">Last Name</p>
            <span className="flex-wrap text-green-400  font-thin"><p>Nayomi</p></span>
            <span className="flex-wrap text-green-400  font-thin"><p>Siriwardhana</p></span>
            
            <hr className="border-green-600" />
            <hr className="border-green-600" /> */}

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>First Name</p></span>
                <span className="flex-wrap text-green-400  "><p>Nayomi</p></span>
              </div>
                <hr className="border-green-600" /> 
            </div>

            
            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>Last Name</p></span>
                <span className="flex-wrap text-green-400  "><p>Siriwardhana</p></span>
              </div>
                <hr className="border-green-600" /> 
            </div>

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>User Name</p></span>
                <span className="flex-wrap text-green-400  "><p>Nayomisiriwardhana_34</p></span>
                </div>
                <hr className="border-green-600" /> 
            </div>

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>E mail</p></span>
                <span className="flex-wrap text-green-400  "><p>Nayomisiriwardhana@gmail.com</p></span>
                </div>
                <hr className="border-green-600" /> 
            </div>

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className="flex-shrink text-start"><p>Mobile</p></span>
                <span className="flex-wrap text-green-400 "><p>+94 769407603</p></span>
                </div>
                <hr className="border-green-600" /> 
            </div>

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>Gender</p></span>
                <span className="flex-wrap text-green-400"><p>Female</p></span>
                </div>
                <hr className="border-green-600 " /> 
            </div>

            <div className="mt-8 grid col-span-2">
              <div className="flex gap-16">
                <span className=" text-start flex-shrink"><p>Residential Address</p></span>
                <span className="flex-wrap text-green-400 "><p>21/32, okandhawatta, Panthiya Mathugama.</p></span>
                </div>
                <hr className="border-green-600" /> 
            </div>

        </div>
 
    </div>
  )
}

export default Main