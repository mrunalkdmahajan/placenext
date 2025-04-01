import React from 'react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-gray-800 text-white p-4 rounded shadow-lg">
      <div>{message}</div>
      <button onClick={onClose} className="mt-2 text-gray-300 hover:text-white">
        Close
      </button>
    </div>
  );
};

export default Toast;