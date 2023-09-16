import * as Yup from "yup";

export const passwordValidation = Yup.string()
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

export const confirmPasswordValidation = Yup.string()
  .oneOf([Yup.ref("password"), undefined], "Passwords must match")
  .required("Confirm Password is required");

export const emailValidation = Yup.string()
  .email("Invalid email")
  .matches(
    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    "Email must be in the correct email format"
  )
  .required("Email is required");

export const mobileNoValidation = Yup.string()
  .matches(
    /^[0-9]{10}$/, // Modify this regex to match your mobile number format
    "Mobile number must be a valid 10-digit number"
  )
  .required("Mobile number is required");

export const addressValidation = Yup.string().required("Address is required");
export const firstNameValidation = Yup.string().required(
  "First Name is required"
);
export const lastNameValidation = Yup.string().required(
  "Last Name is required"
);
