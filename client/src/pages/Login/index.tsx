import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Sign_up from "../../assets/images/Sign_up.svg";
import { Button } from "../../base-components/Button";
import Logo from "../../base-components/Logo";
import { handleLogin } from "../../services/auth";

const Main = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginData = {
    email,
    password,
  };
  // const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("http://localhost:8000/api/auth/login", {
  //       email,
  //       password,
  //     });

  //     sessionStorage.setItem("email", res.data.email);
  //     sessionStorage.setItem("accessToken", res.data.accessToken);
  //     sessionStorage.setItem("refreshToken", res.data.refreshToken);

  //     navigate("/home");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${Sign_up})`,
          backgroundSize: "cover",
        }}
        className="w-m flex h-[48rem] flex-col p-5 pt-[80px] text-center  text-slate-900 dark:text-slate-50 sm:h-screen md:h-screen"
      >
        <div className="">
          <div className="grid h-full items-center justify-center lg:grid-cols-5">
            <div className="grid w-full content-center justify-center md:col-span-3">
              <div className="">
                {/*Logo */}
                <div className="grid items-center justify-center">
                  <Logo className="h-24 w-24" />
                </div>

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
                  <form onSubmit={(e) => handleLogin(e, loginData, navigate)}>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="text"
                      className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                      id="email"
                      name="email"
                      placeholder="E-mail Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                    <br></br>
                    <input
                      type="password"
                      className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
                      type="submit"
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
                    {/* Google button*/}
                    <Button
                      as={NavLink}
                      to="/"
                      className={twMerge(
                        "to-geay-600 rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-gradient-to-r from-gray-900 px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
                      )}
                    >
                      <span
                        className={twMerge(
                          "!text-gradient-cyan-500 text-[8px] font-[100] uppercase tracking-[0.5px]"
                        )}
                      >
                        Sign in with google
                      </span>
                    </Button>
                    &nbsp;&nbsp;
                    <Button
                      as={NavLink}
                      to="/"
                      className={twMerge(
                        "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-gradient-to-r from-gray-900 to-gray-600 px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
                      )}
                    >
                      <span
                        className={twMerge(
                          "!text-gradient-cyan-500 text-[8px] font-[100] uppercase tracking-[0.5px]"
                        )}
                      >
                        Sign in with facebook
                      </span>
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
