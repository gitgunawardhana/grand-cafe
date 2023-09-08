import { Button } from "../../base-components/Button";
import InputField from "../../base-components/FormElements/InputElement";
import CheckBoxSetResponsive from "../../components/CheckBoxSetResponsive";
import TextArea from "../../components/TextArea";
import Image1 from "../../assets/images/CustomerAccount/user.png"
import cam from "../../assets/images/CustomerAccount/vector3.svg"


const gender = [
  
  {
    id: "male",
    label: "Male",
    value: "male",
  },
  {
    id: "female",
    label: "Female",
    value: "female",
  },

];

const Main = () => {
  return (
    <>  
      <div className="ml-[100px] mr-52 mt-0!m-auto flex flex-col justify-center object-cover px-12 text-center text-gradient-yellow-300 md:px-28 lg:px-32">
        
        <div className="ml-6 col-span-2 mt-5 justify-start text-start text-[20px] font-black text-gradient-yellow-900 sm:text-[20px] md:text-[30px] lg:text-[40px]">
            <h1>Account Settings</h1>
        </div>

        <div className="flex flex-col ">
          <div className="flex-1 pt-5">
            <img 
            className="absolute ml-[25px] mt-9 w-[154px] h-[154px] object-cover" src={Image1}>
            </img>
          </div>
          <div className="flex-shrink" >
            
              <button className="pt-3 pr-[670px] h-0 ">
              <input type="file"  className="w-5
            
               mr-36 bg-yellow-300 rounded-full mt-32 opacity-100"/>
                <img src={cam} className="overflow-auto ml-36 bg-yellow-300 rounded-full px-1 py-1 mt-32 opacity-70 mb-0"></img>
              </button>
          <div className="flex-row">
            <span>
              <Button className="bg-gradient-to-b from-yellow-500 to-yellow-300 hover:bg-gradient-yellow-900 hover:text-none justify-items-start border !border-gradient-yellow-900 text-sm mt-0 ml-0 px-4 py-2 text-black ">Update Now</Button>
            </span>
            <span>
              <Button className=" bg-black hover:text-none justify-items-start border hover:bg-inherit !border-gradient-yellow-900 text-sm mt-0 ml-7 px-4 py-2 text-gradient-yellow-900 ">Delete Avatar</Button>
            </span>
          </div>
          </div>  
        </div> 
       
        <div className="pb-4 mb-10 mt-0 grid grid-cols-2  items-center justify-start gap-1 md:mt-0 lg:mt-0 lg:flex-row">
        

          <div className="mt-20 ml-20 col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px] text-gradient-yellow-900">First Name <span className="text-red-600">*</span></label>
                <InputField
                  className="mt-[10px] placeholder-gradient-yellow-500] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 !placeholder-opacity-25"
                  placeholder="Nayomi"
                />
          </div>
          <div className="mt-20 ml-20 col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px] text-gradient-yellow-900">Last Name <span className="text-red-600">*</span></label>
                <InputField
                  className="mt-[10px] placeholder-gradient-yellow-500] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 !placeholder-opacity-25"
                  placeholder="Siriwardhna"
                />
          </div>
          <div className="mt-20 ml-20 col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px] text-gradient-yellow-900">User Name</label>
                <InputField
                  className="mt-[10px] placeholder-gradient-yellow-500] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 !placeholder-opacity-25"
                  placeholder="Nayomisiriwardhana_34"
                />
          </div>
          <div className="mt-20 ml-20 col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px] text-gradient-yellow-900">E mail</label>
                <InputField
                  className="mt-[10px] placeholder-gradient-yellow-500] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 !placeholder-opacity-25"
                  placeholder="nayomisiriwardhana@gmail.com"
                />
          </div>

          <div className="mt-[70px] ml-20  col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px]  text-gradient-yellow-900">Gender</label>
                <CheckBoxSetResponsive
                  className="mt-2 pl-5"
                  dataset={gender}
                  type="radio"
                  name="gender"
                />
          </div>
          
          <div className="mt-3 ml-20 col-span-2 justify-start text-start sm:col-span-1">
            <label className="pb-[20px] text-gradient-yellow-900">Phone Number</label>
                <InputField
                  className="mt-[10px] placeholder-gradient-yellow-500] border !border-gradient-yellow-900 pb-2 !text-sm !text-gradient-yellow-900 !placeholder-opacity-25"
                  placeholder="+94765254352"
                />
          </div>
          <div className="mt-10 ml-20 text-start">
            <label className="pb-[20px] my-10 text-gradient-yellow-900">Redential Address </label>
              <TextArea/>
          </div>

          <div>
            <Button className="bg-gradient-to-b from-yellow-500 to-yellow-300 hover:bg-gradient-yellow-900 hover:text-none justify-items-start border !border-gradient-yellow-900 text-sm mt-28 ml-0 px-10 py-3 text-black ">Save Changes</Button>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Main