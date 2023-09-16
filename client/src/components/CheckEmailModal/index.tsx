import { useFormik } from "formik";
import { useEffect } from "react";
import Modal from "react-modal";
import { twMerge } from "tailwind-merge";
import * as Yup from "yup";
import LucideIcon from "../../base-components/LucideIcon";
import { Icons } from "../../constants";
import { emailValidation } from "../../utils/validation";

interface CheckEmailModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setRecoverEmail: (email: string) => void;
  handleCheckEmail: () => Promise<void>;
}

const validationSchema = Yup.object().shape({
  email: emailValidation,
});
interface FormValues {
  email: string;
}

const CheckEmailModal: React.FC<CheckEmailModalProps> = ({
  isModalOpen,
  closeModal,
  setRecoverEmail,
  handleCheckEmail,
}) => {
  const initialValues: FormValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: FormValues) => {
      handleCheckEmail();
    },
  });

  useEffect(() => {
    setRecoverEmail(formik.getFieldProps("email").value);
  }, [formik]);

  return (
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
      <form onSubmit={formik.handleSubmit}>
        <div>
          <p className="my-auto mb-2 !pl-0 pr-2 text-left text-gradient-yellow-900">
            Find Your Account:
          </p>
          <input
            type="text"
            name="email"
            onChange={(e) => {
              formik.handleChange(e);
              setRecoverEmail(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="Email address"
            className="w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gradient-yellow-900 focus:border-gradient-yellow-500 focus:ring-gradient-yellow-500"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="mt-1 text-left text-xs text-red-700">
              {formik.errors.email}
            </div>
          ) : null}
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
            type="submit"
            className={twMerge([
              "rounded-lg bg-gradient-yellow-900 px-5 py-2",
              formik.errors.email || formik.getFieldProps("email").value === ""
                ? "cursor-not-allowed opacity-40"
                : "cursor-pointer",
            ])}
            disabled={
              Boolean(formik.errors.email) ||
              formik.getFieldProps("email").value === ""
            }
          >
            SUBMIT
          </button>
        </div>
      </form>
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
        <LucideIcon icon={Icons.CLOSE} strokeWidth={1.5} color="#FF9224" />
      </button>
    </Modal>
  );
};

export default CheckEmailModal;
