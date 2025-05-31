function ConfirmAction({ title, message, onConfirm, onCloseModal }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCloseModal} className="btn">
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onCloseModal();
          }}
          className="btn bg-red-600 text-white"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmAction;
