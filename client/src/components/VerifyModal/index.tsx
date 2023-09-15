import Modal from "react-modal";
import LucideIcon from "../../base-components/LucideIcon";
import { Icons } from "../../constants";
import { formatTime } from "../../utils";

interface VerifyModalProps {
  isModalOpen: boolean;
  closeModal: () => void;
  passcode: string;
  setPasscode: (passcode: string) => void;
  passcodeSent: boolean;
  seconds: number;
  addButton: boolean;
  handlePasscode: () => Promise<void>;
  passcodeErrorMsg: string;
  setPasscodeSent: (sent: boolean) => void;
  reSendPasscode: () => void;
}

const VerifyModal: React.FC<VerifyModalProps> = ({
  isModalOpen,
  closeModal,
  passcode,
  setPasscode,
  passcodeSent,
  seconds,
  addButton,
  handlePasscode,
  passcodeErrorMsg,
  setPasscodeSent,
  reSendPasscode,
}) => {
  return (
    <div>
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
            Verification Code:
          </p>
          <input
            type="text"
            className="w-full rounded-lg border border-gray-300 bg-teal-950 p-2.5 text-sm text-gradient-yellow-900 focus:border-gradient-yellow-500 focus:ring-gradient-yellow-500"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        {passcodeSent && (
          <div className="mt-2 px-0 text-sm text-yellow-50">
            {formatTime(seconds)}
          </div>
        )}
        <div className="mt-5 flex justify-start">
          {!addButton ? (
            <button
              className="rounded-lg bg-gradient-yellow-900 px-5 py-2"
              onClick={handlePasscode}
            >
              SUBMIT
            </button>
          ) : (
            <></>
          )}
        </div>
        {passcodeErrorMsg !== "" && (
          <div>
            <div className="mb-5 mt-6 px-1 text-left text-sm text-red-700">
              {passcodeErrorMsg}
            </div>
          </div>
        )}
        {!passcodeSent ? (
          <button
            className="mt-2 rounded-lg border border-gradient-yellow-900 px-5 py-2 text-gradient-yellow-900"
            onClick={() => {
              setPasscodeSent(false);
              reSendPasscode();
            }}
          >
            RESEND
          </button>
        ) : (
          <></>
        )}
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
    </div>
  );
};

export default VerifyModal;
