import SpinnerMini from "../ui/SpinnerMini";
type Props = {
  onCloseModal?: () => void;
  title: string;
  message: string;
  onConfirm: () => void;
  isPending: boolean;
};
function ConfirmAction({
  title,
  message,
  onConfirm,
  onCloseModal,
  isPending,
}: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <button
          onClick={onCloseModal}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gray-600 text-white text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-medium hover:bg-red-800 transition disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmAction;
