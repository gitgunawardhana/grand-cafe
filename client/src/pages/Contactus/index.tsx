import Back_07 from "../../assets/images/HomePage/AboutUs.svg";



const Main = () => {
  return (
    <div
        style={{
          backgroundImage: `url(${Back_07})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-full flex-col bg-repeat p-5 pt-[80px]  text-center text-slate-900 dark:text-slate-50 sm:h-full md:h-screen"
      >
        <div className="font-extrabold text-6xl text-gradient-yellow-900 flex h-1/5 flex-col items-center justify-center">
          Contact us
          <br /><br/>
          
        </div>
       
        <div>
          <div className="pr-10">
            
            {/* <p className="text-gradient-yellow-900 text-2xl pl-20 font-bold">Hi! We are Grand Cafe restaurant</p> */}
            <br/>
            <br/>
            <div className="flex">
              <div className="max-w-sm mx-auto pr-10 pl-10 pb-20 pt-10   bg-slate-900 shadow-md rounded-md overflow-hidden">
            <p className="text-gradient-yellow-900 text-2xl font-semibold"> Address</p><br/>

            Grand Cafe Restaurant,<br/>
            Main Street,<br/> Badalkumbura<br/>
            </div>
            <div  className="max-w-sm mx-auto  pr-10 pl-10 pb-20 pt-10 bg-slate-900 shadow-md rounded-md overflow-hidden">

            <p className="text-gradient-yellow-900 text-2xl">Email</p><br/>

            grandcafe@cafe.com<br/>
            </div>
            <div className="max-w-sm mx-auto  px-20 pb-20 pt-10 bg-slate-900 shadow-md rounded-md overflow-hidden">
            <p className="text-gradient-yellow-900 text-2xl">Telephone</p><br/>
            
            055 222 22 22<br/>
            </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Main