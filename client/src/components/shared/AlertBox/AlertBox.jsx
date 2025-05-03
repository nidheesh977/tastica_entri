export const AlertBox = ({ message, onClose }) => {
  return (
    <div
      className={`fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    p-6 rounded-lg shadow-lg z-50 min-w-[300px] text-center bg-tertiary text-black`}
    >
      <p className="mb-4">{message}</p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-secondary text-sm font-semibold rounded text-white hover:bg-opacity-90"
      >
        OK
      </button>
    </div>
  );
};
