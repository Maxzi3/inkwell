import { useParams } from "react-router-dom";
import { useState, type FormEvent } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useResetPassword } from "../Authentication/useResetPassword";
import toast from "react-hot-toast";

function ResetPasswordPage() {
  const { token } = useParams<string>();
  const { mutate: reset, isPending } = useResetPassword();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset({ token: token || "", password, passwordConfirm });
  };

  if (password !== passwordConfirm) {
    toast.error("Passwords do not match");
    return;
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 flex-col space-x-4 space-y-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-5 text-center">
          Reset Password
        </h2>

        <span className="block mb-2">
          <label htmlFor="password" className="text-sm">
            New Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded-md"
          />
        </span>

        <span className="block mb-4">
          <label htmlFor="passwordConfirm" className="text-sm">
            Confirm Password
          </label>
          <input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded-md"
          />
        </span>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-black text-white py-2 rounded-md"
        >
          {isPending ? <SpinnerMini /> : "Reset Password"}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
