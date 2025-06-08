import { useState } from "react";
import type { FormEvent } from "react";
import { useForgotPassword } from "./useForgotPassword";
import { Link, useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import FormInput from "../../ui/FormInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import Logo from "../../components/Logo";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { mutate: sendResetEmail, isPending } = useForgotPassword();
  const handleClick = () => {
    navigate(-1); // go back
  };

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    sendResetEmail(
      { email },
      {
        onSettled: () => {
          setEmail("");
        },
      }
    );
  }

  return (
    <div className="min-h-screen flex items-center gap-3.5 px-4 flex-col space-x-4 space-y-4 text-text-primary bg-primary">
         <div className="flex items-center p-4 md:p-5 gap-18 w-full">
              <button onClick={handleClick}>
                <FaArrowLeftLong className="mt-2" />
              </button>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
                <Logo />
              </h2>
            </div>
      <div className="flex items-center p-4 justify-between w-full">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
          Forgot Password
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 flex flex-col justify-center md:p-10 rounded-lg space-y-6 text-sm md:border border-gray-200 md:w-[30rem] w-[20rem]"
      >
        {/* Email Input */}
        <div className="mb-3">
          <label htmlFor="email" className="block text-base font-medium mb-2">
            Email address
          </label>
          <FormInput
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isPending || !email}
            className="w-[150px] block mx-auto mt-2 py-3 rounded-md disabled:bg-input bg-secondary text-primary hover:text-secondary hover:bg-input"
          >
            {isPending ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Send Reset Email"
            )}
          </button>

          <p className="p-4 text-center">
            Need an account?{" "}
            <Link className="hover:text-blue-600" to="/signup">
              SignUp
            </Link>
          </p>
          <p className="text-center">
            Login?{" "}
            <Link className="hover:text-blue-600" to="/login">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default ForgotPasswordForm;
