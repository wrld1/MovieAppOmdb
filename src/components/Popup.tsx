import { FC } from "react";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const Popup: FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="popup-container  overflow-hidden" onClick={onClose}>
      <div
        className="bg-[#202124] rounded-lg p-5 text-center mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-5 text-lg font-bold text-white">{message}</p>
        <button
          onClick={onClose}
          className="bg-[#4B4F76] hover:bg-[#4f5585] font-semibold text-white rounded-lg py-2 px-5 cursor-pointer transition-all "
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
