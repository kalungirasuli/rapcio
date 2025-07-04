import React from "react";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card dark:bg-cardDark p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-[12px] bg-muted dark:bg-mutedDark"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded text-[12px] bg-red-500 text-white hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
