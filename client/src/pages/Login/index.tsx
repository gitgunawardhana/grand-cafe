import Sign_up from "../../assets/images/Sign_up.svg";
import Logo from "../../base-components/Logo";
import { twMerge } from "tailwind-merge";
import { Button } from "../../base-components/Button";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${Sign_up})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-screen flex-col p-5 pt-[25px] text-center text-slate-900  dark:text-slate-50"
      >
        <div className="grid grid-cols-2 ">
          <div className="grid h-screen justify-center ">
            <div className="justify-center">
              {/*Logo */}
              {<Logo className="h-24 w-24" />}

              {/*Text fields */}
              <span
                className={twMerge(
                  "text-[24px] font-[500] tracking-[1.226px] !text-gradient-yellow-500"
                )}
              >
                Welcome Back
              </span>
              <br></br>
              <span
                className={twMerge(
                  "text-[18px] font-[500]  tracking-[1.226px] !text-gradient-yellow-500"
                )}
              >
                Enter your details to access your account
              </span>
              <br></br>
              <br></br>
              {/*Form */}
              <div>
                <form>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                    id="email"
                    name="email"
                    placeholder="E-mail Address"
                  ></input>
                  <br></br>

                  <input
                    type="password"
                    className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                    id="password"
                    name="password"
                    placeholder="Password"
                  ></input>
                  <br></br>

                  <input
                    type="password-confirm"
                    className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="Confirm Password"
                  ></input>
                  <br></br>
                  <div className="place-items-start">
                    <input
                      type="checkbox"
                      id="vehicle1"
                      name="vehicle1"
                      value="Bike"
                      className=" bg-transparent focus:border-blue-500 focus:ring-blue-500"
                    />
                    <label
                      className={twMerge(
                        "text-[12px] font-[500] tracking-[1.226px] !text-gradient-yellow-500"
                      )}
                    >
                      {" "}
                      Accept terms & conditions
                    </label>
                    <br></br>
                  </div>
                  
                  <Button
                    as={NavLink}
                    to="/"
                    className={twMerge(
                      "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                      )}
                    >
                      Sign Up
                    </span>
                  </Button>
                  <br></br>
                  <span
                      className={twMerge(
                        "text-[10px] font-[500]  tracking-[1.226px] !text-gradient-yellow-500"
                      )}
                    >
                      Or sign in with
                    </span>
<br></br>
                    {/* Google button*/ }
                    <Button
                    as={NavLink}
                    to="/"
                    className={twMerge(
                      "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                      )}
                    >
                      Sign Up
                    </span>
                    
                  </Button>
                          
                  <Button
                    as={NavLink}
                    to="/"
                    className={twMerge(
                      "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
                    )}
                  >
                    <span
                      className={twMerge(
                        "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                      )}
                    >
                      <img src="https://icons8.com/icon/17949/google" alt="google"/>
                    </span>
                  </Button>

                </form>
              </div>
            </div>

            <div></div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Main;
