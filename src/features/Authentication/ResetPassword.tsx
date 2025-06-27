import { useParams } from "react-router-dom";
import { useState, type FormEvent } from "react";
import SpinnerMini from "../../ui/SpinnerMini";
import { useResetPassword } from "../Authentication/useResetPassword";
import toast from "react-hot-toast";
import FormInput from "../../ui/FormInput";
import Logo from "../../components/Logo";

function ResetPasswordPage() {
  const { token } = useParams<string>();
  const { mutate: reset, isPending } = useResetPassword();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match");
      return;
    }
    reset({ token: token || "", password, passwordConfirm });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 flex-col space-">
      <div className="flex items-center justify-center p-4 lg:p-5 w-full">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto my-10 lg:my-2 flex flex-col justify-center lg:p-10 rounded-lg space-y-6 text-sm lg:border border-gray-200 lg:w-[30rem] w-[20rem]"
      >
        <h2 className="text-xl font-semibold mb-5 text-center">
          Reset Password
        </h2>

        <span className="block mb-2">
          <label htmlFor="password" className="text-sm">
            New Password
          </label>
          <FormInput
            id="password"
            togglePassword
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
          <FormInput
            id="passwordConfirm"
            togglePassword
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
          className="px-4 py-3 w-[150px] rounded-md disabled:bg-input disabled:text-secondary bg-secondary text-primary hover:text-secondary hover:bg-input mx-auto block"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
