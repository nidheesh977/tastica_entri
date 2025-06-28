export const PrintDialogueBox = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    p-6 rounded-lg shadow-lg z-50 min-w-[300px] text-center bg-tertiary text-black">
      <p className="mb-6 text-lg font-medium">{message}</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="px-6 py-2 bg-primary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          Print
        </button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-secondary text-sm font-semibold rounded text-white hover:bg-opacity-90"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
