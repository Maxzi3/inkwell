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
        <button onClick={onCloseModal} className="btn">
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          className="btn bg-red-600 text-white"
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
