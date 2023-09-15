import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

const sendEmail = (data: any, setPasscodeSent: any) => {
  if (data.subject !== "Reset Password") setPasscodeSent(true);

  let text = "Email sent successfully!";
  if (data.subject !== "Reset Password") {
    text = "A verification code has been sent to your email address.";
  } else {
    text = "Your new password has been sent successfully!";
  }
  const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

  try {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY).then(
      (response) => {
        Swal.fire({
          position: "center",
          icon: "success",
          text: text,
          showConfirmButton: false,
          background: "#2A200A",
          color: "#F19328",
          timer: 3500,
        });
        if (data.subject !== "Reset Password") {
          setTimeout(() => {
            setPasscodeSent(false);
          }, 60000);
        }
      },
      (error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          text: "Failed to send email. Please try again later.",
          showConfirmButton: false,
          background: "#2A200A",
          color: "#F19328",
          timer: 3500,
        });
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    Swal.fire({
      position: "center",
      icon: "error",
      text: "An error occurred while sending the email. Please try again later.",
      showConfirmButton: false,
      background: "#2A200A",
      color: "#F19328",
      timer: 3500,
    });
  }
};

export { sendEmail };
