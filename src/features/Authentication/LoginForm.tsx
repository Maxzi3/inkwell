import type { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { useLogin } from "./useLogin";
import { useResendEmail } from "./useResendEmail";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import FormInput from "../../ui/FormInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast from "react-hot-toast";
import Logo from "../../components/Logo";
import { isAxiosError } from "axios";
import DarkModeToggle from "../../ui/DarkModeToggle";

function LoginForm() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const lastTriedEmailRef = useRef("");
  const { mutate: login, isPending, error } = useLogin();
  const { mutate: resend, isPending: isResending } = useResendEmail();
  const handleClick = () => {
    navigate("/");
  };

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (toastShownRef.current) return;

    const isVerified = searchParams.get("verified");
    const alreadyVerified = searchParams.get("alreadyVerified");

    if (isVerified === "true") {
      toast.success("Your email has been verified. You can now log in!");
      toastShownRef.current = true;
    }

    if (alreadyVerified === "true") {
      toast.success("🔒 Email already verified. You can log in.");
      toastShownRef.current = true;
    }
  }, [searchParams]);

  function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !password) return;
    lastTriedEmailRef.current = email;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  function handleResend() {
    if (lastTriedEmailRef.current) resend({ email: lastTriedEmailRef.current });
  }

  const showResend =
    isAxiosError(error) &&
    error.response?.data?.message?.toLowerCase().includes("verify");

  return (
    <div className="min-h-screen flex items-center gap-3.5 px-4 flex-col space-x-4 space-y-4 text-text-primary bg-primary">
      <div className="flex items-center py-4 lg:py-5 gap-2 w-full">
        <button onClick={handleClick}>
          <FaArrowLeftLong className="mt-2" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
          <Logo />
        </h2>
        <DarkModeToggle />
      </div>
      <h2 className=" tracking-light text-[28px] font-bold leading-tight px-4 text-center pt-5">
        Welcome back
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto my-10 md:my-2 flex flex-col justify-center md:p-10 rounded-lg space-y-6 text-sm md:border border-gray-200 lg:w-[30rem] md:w-[40rem] w-[20rem]"
      >
        {/* Email Input */}
        <div className="mb-3 flex flex-col items-center">
          <label
            htmlFor="email"
            className="block text-base font-medium mb-2 self-start"
          >
            Email address
          </label>
          <FormInput
            type="email"
            id="email"
            autoComplete="username"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            disabled={isPending}
          />
        </div>

        {/* Password Input */}
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="password"
            className="block text-base font-medium self-start"
          >
            Password
          </label>
          <Link
            to="/forgotpassword"
            className="flex justify-end hover:text-blue-600"
          >
            Forgot Password?
          </Link>
        </div>
        <div className="mb-3 flex flex-col items-center">
          <FormInput
            type="password"
            id="password"
            togglePassword
            autoComplete="current-password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            disabled={isPending}
          />
        </div>
        {/* Submit Button */}
        <div className="flex flex-col items-center">
          <button
            type="submit"
            disabled={isPending || !email || !password}
            className="w-[150px] mt-7 py-3 rounded-md disabled:bg-input disabled:text-secondary bg-secondary text-primary hover:text-secondary hover:bg-input"
          >
            {isPending ? (
              <div className="flex justify-center">
                <SpinnerMini />
              </div>
            ) : (
              "Login"
            )}
          </button>

          {/* 🔁 Resend Button */}
          {showResend && (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="mt-4 text-blue-600 hover:underline "
            >
              {isResending ? "Resending..." : "Resend Verification Email"}
            </button>
          )}

          <p className="p-4 text-center">
            Need an account?{" "}
            <Link className="hover:text-blue-600" to="/signup">
              SignUp
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
