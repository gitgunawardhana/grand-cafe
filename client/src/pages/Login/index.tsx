import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
import Sign_up from "../../assets/images/Sign_up.svg";
import { Button } from "../../base-components/Button";
import Logo from "../../base-components/Logo";
import LucideIcon from "../../base-components/LucideIcon";
import VerifyModal from "../../components/VerifyModal";
import { Icons } from "../../constants";
import { handleLogin } from "../../services/auth";
import { checkExpiration, createPasscode } from "../../services/passcode";
import { checkIfEmailExists, updatePassword } from "../../services/user";
import {
  generateRandomCode,
  generateRandomPassword,
  sendEmail,
} from "../../utils";

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
});

// Define a TypeScript interface for your form values
interface FormValues {
  email: string;
  password: string;
}

const Main = () => {
  const [seconds, setSeconds] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);

  const startTimer = () => {
    setSeconds(60);
    setIsActive(true);
  };

  useEffect(() => {
    let interval: any;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState("");
  const [passcodeSent, setPasscodeSent] = useState(false);

  const navigate = useNavigate();

  const [passcode, setPasscode] = useState<string>("");

  const [generatedPasscode, setGeneratedPasscode] =
    useState<string>(generateRandomCode);

  const [passwordShown, setPasswordShown] = useState(false);

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      handleLogin(values, navigate);
    },
  });

  const [recoverEmail, setRecoverEmail] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openVerifyModal = () => {
    setPasscodeErrorMsg("");
    setPasscode("");
    setIsVerifyModalOpen(true);
    createPasscode({
      passcode: generatedPasscode,
      expiresInMinutes: 1,
    });

    if (!passcodeSent) {
      sendEmail(
        {
          toName: "Grand cafe new user",
          toEmail: recoverEmail,
          fromName: "Grand Cafe",
          fromEmail: "resturent@grandcafe.com",
          subject: "Verify email",
          message: `Verification Code: ${generatedPasscode}`,
        },
        setPasscodeSent
      );
      startTimer();
    }
  };

  const closeVerifyModal = () => {
    setIsVerifyModalOpen(false);
  };

  const handleCheckEmail = async () => {
    const result = await checkIfEmailExists(recoverEmail, setIsValidEmail);
    if (result) {
      closeModal();
      openVerifyModal();
    }
    console.log(result);
  };

  const [registrationState, setRegistrationState] = useState(false);
  const [addButton, setAddButton] = useState(false);

  const reSendPasscode = () => {
    setAddButton(false);
    setPasscodeErrorMsg("");
    console.log(passcodeSent);

    if (!passcodeSent) {
      createPasscode({
        passcode: generatedPasscode,
        expiresInMinutes: 1,
      });
      sendEmail(
        {
          toName: "Grand cafe new user",
          toEmail: recoverEmail,
          fromName: "Grand Cafe",
          fromEmail: "resturent@grandcafe.com",
          subject: "Verify email",
          message: `Verification Code: ${generatedPasscode}`,
        },
        setPasscodeSent
      );
      startTimer();
    }
    setPasscode("");
  };

  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);

  const handlePasscode = async () => {
    const result = await checkExpiration(passcode);
    if (result === "expired") {
      setPasscodeErrorMsg("Verification code is expired!");
      sessionStorage.removeItem("temp");
      setGeneratedPasscode(generateRandomCode);
      createPasscode({
        passcode: generatedPasscode,
        expiresInMinutes: 1,
      });
      setAddButton(true);
    }
    if (result === "passcode not matching") {
      setPasscodeErrorMsg("Verification code is invalid!");
    }

    if (result === "success") {
      setRegistrationState(true);
      Swal.fire({
        position: "center",
        icon: "success",
        text: "Verification Success!",
        background: "#2A200A",
        color: "#F19328",
        showConfirmButton: false,
        timer: 2000,
      });
      const newPassword = generateRandomPassword(12);
      const result = await updatePassword(recoverEmail, newPassword);
      if (result) {
        sendEmail(
          {
            toName: "Grand cafe new user",
            toEmail: recoverEmail,
            fromName: "Grand Cafe",
            fromEmail: "resturent@grandcafe.com",
            subject: "Reset Password",
            message: `Your temporary password is: ${newPassword}
            You can use this password to log in to your Grand Cafe account. We recommend changing your password after logging in for security.`,
          },
          setPasscodeSent
        );
        closeVerifyModal();
      }
    }
  };

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
                    <div className="place-items-start">
                      <label
                        className={twMerge(
                          "cursor-pointer text-[12px] font-[500] tracking-[1.226px] !text-gradient-yellow-500"
                        )}
                        onClick={openModal}
                      >
                        {" "}
                        Forgotten password?
                      </label>
                      <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={{
                          content: {
                            width: "300px",
                            height: "350px",
                            margin: "auto",
                            borderRadius: "20px",
                            backgroundColor: "#362B19",
                          },
                        }}
                      >
                        <br />
                        <br />
                        <div className="">
                          <p className="my-auto mb-2 !pl-0 pr-2 text-left text-gradient-yellow-900">
                            Find You Account:
                          </p>
                          <input
                            type="text"
                            placeholder="Email address"
                            onChange={(e) => setRecoverEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gradient-yellow-900 focus:border-gradient-yellow-500 focus:ring-gradient-yellow-500"
                          />
                        </div>
                        <div className="mt-5 flex justify-start">
                          <button
                            className="rounded-lg border border-gradient-yellow-900 bg-gradient-yellow-900 bg-opacity-60  px-5 py-2"
                            onClick={closeModal}
                          >
                            CANCEL
                          </button>
                          &nbsp;
                          <button
                            className="rounded-lg bg-gradient-yellow-900 px-5 py-2"
                            onClick={handleCheckEmail}
                          >
                            SUBMIT
                          </button>
                        </div>
                        <div></div>
                        <button
                          type="button"
                          onClick={closeModal}
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "20px",
                            padding: "2px",
                            backgroundColor: "transparent",
                          }}
                        >
                          <LucideIcon
                            icon={Icons.CLOSE}
                            strokeWidth={1.5}
                            color="#FF9224"
                          />
                        </button>
                      </Modal>
                      <VerifyModal
                        isModalOpen={isVerifyModalOpen}
                        closeModal={closeVerifyModal}
                        passcode={passcode}
                        setPasscode={setPasscode}
                        passcodeSent={passcodeSent}
                        seconds={seconds}
                        addButton={addButton}
                        handlePasscode={handlePasscode}
                        passcodeErrorMsg={passcodeErrorMsg}
                        setPasscodeSent={setPasscodeSent}
                        reSendPasscode={reSendPasscode}
                      />
                      <br></br>
                    </div>
                    <div className="flex justify-center gap-2">
                      <div>
                        <Button
                          type="submit"
                          className={twMerge([
                            "rounded-[10px] border-2 border-solid border-gradient-yellow-300 !bg-transparent px-[25px] py-[15.141px] lg:px-[60px] lg:py-[10.141px]",
                            formik.errors.email || formik.errors.password
                              ? "cursor-not-allowed opacity-40"
                              : "cursor-pointer",
                          ])}
                          disabled={
                            Boolean(formik.errors.email) ||
                            Boolean(formik.errors.password)
                          }
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
                      <div>
                        <Button
                          as={NavLink}
                          to="/sign-up"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
