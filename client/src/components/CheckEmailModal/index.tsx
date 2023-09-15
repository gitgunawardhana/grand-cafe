import Modal from "react-modal";
import LucideIcon from "../../base-components/LucideIcon";
import { Icons } from "../../constants";

interface CheckEmailModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  setRecoverEmail: (email: string) => void;
  handleCheckEmail: () => Promise<void>;
}

const CheckEmailModal: React.FC<CheckEmailModalProps> = ({
  isModalOpen,
  closeModal,
  setRecoverEmail,
  handleCheckEmail,
}) => {
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
      <div className="">
        <p className="my-auto mb-2 !pl-0 pr-2 text-left text-gradient-yellow-900">
          Find Your Account:
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
        <LucideIcon icon={Icons.CLOSE} strokeWidth={1.5} color="#FF9224" />
      </button>
    </Modal>
  );
};

export default CheckEmailModal;
