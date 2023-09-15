import CryptoJS from "crypto-js";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
import Sign_up from "../../assets/images/Sign_up.svg";
import { Button } from "../../base-components/Button";
import Logo from "../../base-components/Logo";
import LucideIcon from "../../base-components/LucideIcon";
import { Icons } from "../../constants";
import { handleRegistration } from "../../services/auth";
import { generateRandomCode } from "../../utils";

// Secret key for encryption (you should keep this secret)
const secretKey = "mySecretKey123";

// Encrypt the passcode
function encryptPasscode(passcode: string) {
  const encrypted = CryptoJS.AES.encrypt(passcode, secretKey).toString();
  return encrypted;
}

// Decrypt the passcode
function decryptPasscode(encryptedPasscode: string) {
  const decrypted = CryptoJS.AES.decrypt(encryptedPasscode, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  return decrypted;
}

// ---------------------
const passwordValidation = Yup.string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .test(
    "lowercase",
    "Password must contain at least 1 lowercase letter",
    (value) => /[a-z]/.test(value)
  )
  .test(
    "uppercase",
    "Password must contain at least 1 uppercase letter",
    (value) => /[A-Z]/.test(value)
  )
  .test("numbers", "Password must contain at least 1 number", (value) =>
    /[0-9]/.test(value)
  )
  .test(
    "symbols",
    "Password must contain at least 1 special character",
    (value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)
  );

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .matches(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Email must be in the correct email format"
    )
    .required("Email is required"),
  password: passwordValidation,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Main = () => {
  const navigate = useNavigate();

  // Retrieve the generatedPasscode from sessionStorage, or generate a new one
  const [passcode, setPasscode] = useState<string>("");

  let generatedPC: string;
  if (sessionStorage.getItem("generatedPasscode")) {
    generatedPC = decryptPasscode(sessionStorage.getItem("generatedPasscode")!);
  } else {
    generatedPC = generateRandomCode();
  }

  const [generatedPasscode, setGeneratedPasscode] =
    useState<string>(generatedPC);

  useEffect(() => {
    // Store the generatedPasscode in sessionStorage
    sessionStorage.setItem(
      "generatedPasscode",
      encryptPasscode(generatedPasscode)
    );

    const intervalId = setInterval(() => {
      // Clear the passcode after 10 minutes
      console.log("Code has been deleted after 10 seconds.");
      sessionStorage.removeItem("generatedPasscode");
      setGeneratedPasscode(generatedPC);
    }, 10000); // 10 minutes in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [generatedPasscode]); // Run this effect when generatedPasscode changes

  console.log(generatedPasscode);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal: any = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const checkMatchPassocde = () => {
    if (passcode === generatedPasscode) return true;
    return false;
  };

  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      openModal();
      if (false) {
        handleRegistration(values, navigate);
      }
    },
  });

  // const [data, setData] = useState("6596");

  // const handleSubmit = () => {
  //   // event.preventDefault();

  //   const SERVICE_ID = "service_a2gpwdj";
  //   const TEMPLATE_ID = "template_4mco4be";
  //   const PUBLIC_KEY = "LkmQnioW2G00XCCVN";

  //   emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY).then(
  //     (response) => {
  //       console.log("SUCCESS!", response.status, response.text);
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         text: "Email sent successfully!",
  //         showConfirmButton: false,
  //         timer: 3500,
  //       });
  //       setData("");
  //       // event.target.reset();
  //     },
  //     (error) => {
  //       console.log("FAILED...", error);
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         text: "Failed to send email. Please try again later.",
  //         showConfirmButton: false,
  //         timer: 3500,
  //       });
  //       setData("");
  //       // event.target.reset();
  //     }
  //   );
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
                  <Link to={"/"}>
                    <Logo className="h-24 w-24" />
                  </Link>
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
                  <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      type="text"
                      {...formik.getFieldProps("email")}
                      className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                      id="email"
                      name="email"
                      placeholder="E-mail Address"
                    ></input>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="mt-1 text-left text-xs text-red-700">
                        {formik.errors.email}
                      </div>
                    ) : null}
                    <br></br>
                    <div className="relative">
                      <input
                        type={passwordShown ? "text" : "password"}
                        {...formik.getFieldProps("password")}
                        className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                        id="password"
                        name="password"
                        placeholder="Password"
                      ></input>{" "}
                      <span
                        onClick={() => setPasswordShown(!passwordShown)}
                        className="absolute right-2 top-[9px] cursor-pointer opacity-50"
                      >
                        <LucideIcon
                          icon={passwordShown ? Icons.EYEOFF : Icons.EYE}
                          strokeWidth={1.5}
                          color="#FF9224"
                        />
                      </span>
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="mt-1 text-left text-xs text-red-700">
                        {formik.errors.password}
                      </div>
                    ) : null}
                    <br></br>
                    <div className="relative">
                      <input
                        type={confirmPasswordShown ? "text" : "password"}
                        {...formik.getFieldProps("confirmPassword")}
                        className="block w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-yellow-200 dark:bg-teal-950 dark:text-white dark:placeholder-gray-400 dark:focus:border-gradient-yellow-500 dark:focus:ring-gradient-yellow-500"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                      ></input>
                      <span
                        onClick={() =>
                          setConfirmPasswordShown(!confirmPasswordShown)
                        }
                        className="absolute right-2 top-[9px] cursor-pointer opacity-50"
                      >
                        <LucideIcon
                          icon={confirmPasswordShown ? Icons.EYEOFF : Icons.EYE}
                          strokeWidth={1.5}
                          color="#FF9224"
                        />
                      </span>
                    </div>
                    {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword ? (
                      <div className="mt-1 text-left text-xs text-red-700">
                        {formik.errors.confirmPassword}
                      </div>
                    ) : null}
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
                    <div className="flex justify-center gap-2">
                      <div>
                        <Button
                          type="submit"
                          className={twMerge([
                            "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]",
                            formik.errors.email ||
                            formik.errors.password ||
                            formik.errors.confirmPassword
                              ? "cursor-not-allowed opacity-40"
                              : "cursor-pointer",
                          ])}
                          disabled={
                            Boolean(formik.errors.email) ||
                            Boolean(formik.errors.password) ||
                            Boolean(formik.errors.confirmPassword)
                          }
                        >
                          <span
                            className={twMerge(
                              "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                            )}
                          >
                            Sign Up
                          </span>
                        </Button>
                      </div>
                      <div>
                        <Button
                          as={NavLink}
                          to="/sign-in"
                          className={twMerge([
                            "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]",
                          ])}
                        >
                          <span
                            className={twMerge(
                              "text-[18px] font-[500] uppercase tracking-[1.226px] !text-gradient-yellow-500"
                            )}
                          >
                            Sign In
                          </span>
                        </Button>
                      </div>
                    </div>
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
                        "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-gradient-to-r from-gray-900 to-gray-600 px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]"
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
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  style={{
                    content: {
                      width: "500px",
                      height: "auto",
                      margin: "auto",
                      borderRadius: "20px",
                      backgroundColor: "#E4E6EA",
                    },
                  }}
                >
                  <div className="">
                    ID:
                    <input
                      type="text"
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                    />
                    <button onSubmit={checkMatchPassocde}>Submit</button>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "10px",
                      padding: "2px",
                      backgroundColor: "transparent",
                    }}
                  >
                    close
                  </button>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
