import * as Yup from "yup";

function generateRandomPassword(length: number) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";

  const allChars = uppercaseChars + lowercaseChars + numbers + specialChars;

  let password = "";

  // Create a validation schema for password
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

  do {
    password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars[randomIndex];
    }
  } while (!passwordValidation.isValidSync(password)); // Validate the generated password

  return password;
}

export { generateRandomPassword };
