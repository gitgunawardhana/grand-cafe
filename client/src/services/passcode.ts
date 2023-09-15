import axios from "axios";
import Swal from "sweetalert2";
import { decryptPasscode, encryptPasscode } from "../utils";

export const checkExpiration = async (passcode: string) => {
  try {
    if (passcode === decryptPasscode(sessionStorage.getItem("temp")!)) {
      const res = await axios.get(
        `http://localhost:8000/api/passcode/check-expiration/${passcode}`
      );
      if (!res.data.expired) {
        return "success";
      } else {
        return "expired";
      }
    } else {
      return "passcode not matching";
    }
  } catch (err) {
    return "server error";
  }
};

export const createPasscode = async (data: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/passcode/create",
      data
    );
    console.log("data.passcode ", data.passcode);

    sessionStorage.setItem("temp", encryptPasscode(data.passcode));
  } catch (err) {
    console.log(err);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "Sorry, we couldn't update your profile details due to a server error. Please try again later or contact us for assistance.",
      background: "#2A200A",
      color: "#F19328",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};
