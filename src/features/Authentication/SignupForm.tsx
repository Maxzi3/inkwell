import { useForm } from "react-hook-form";
import { useSignup } from "./useSignup";
import { Link, useNavigate } from "react-router-dom";
import SpinnerMini from "../../ui/SpinnerMini";
import FormInput from "../../ui/FormInput";
import { FaArrowLeftLong } from "react-icons/fa6";
import type { SignupPayload } from "../../services/apiAuth";
import Logo from "../../components/Logo";
import DarkModeToggle from "../../ui/DarkModeToggle";

type SignupFormValues = SignupPayload;

function SignupForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<SignupFormValues>();

  const { mutate: signup, isPending,  } = useSignup();

  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  const onSubmit = (data: SignupFormValues) => {
    signup(data, {
      onSettled: () => reset(),
    });
  };

  return (
    <div className="min-h-screen text-text-primary bg-primary">
      <div className="flex items-center p-4 lg:py-5 gap-2 w-full">
        <button onClick={handleClick}>
          <FaArrowLeftLong className="mt-2" />
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-1">
          <Logo />
        </h2>
        <DarkModeToggle />
      </div>
      <div className=" flex items-center justify-center p-4 flex-col space-x-4 space-y-2 ">
        <h2 className="tracking-light text-[28px] font-bold leading-tight p-4 text-center pt-5">
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center md:p-8 py-8 rounded-lg md:border border-gray-200 text-sm lg:w-[30rem] md:w-[40rem] w-[20rem]"
        >
          {/* Full Name */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="fullName"
              className="block text-base font-medium mb-1 self-start"
            >
              Full name
            </label>
            <FormInput
              type="text"
              id="fullName"
              disabled={isPending}
              placeholder="John Doe"
              {...register("fullName", { required: "This Field is Required" })}
            />
            {errors?.fullName && (
              <span className="text-red-600 text-sm self-start">
                {errors.fullName.message}
              </span>
            )}
          </div>

          {/* Username - optional or for future use */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="username"
              className="block text-base font-medium mb-1 self-start"
            >
              Username
            </label>
            <FormInput
              type="text"
              id="username"
              disabled={isPending}
              placeholder="johndoe"
              {...register("username", { required: "This Field is Required" })}
            />
            {errors?.username && (
              <span className="text-red-600 text-sm self-start">
                {errors.username.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="email"
              className="block text-base font-medium mb-1 self-start"
            >
              Email address
            </label>
            <FormInput
              type="email"
              id="email"
              placeholder="johndoe@email.com"
              disabled={isPending}
              {...register("email", {
                required: "This Field is Required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors?.email && (
              <span className="text-red-600 text-sm self-start">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="phoneNumber"
              className="block text-base font-medium mb-1 self-start"
            >
              Phone Number
            </label>
            <FormInput
              type="text"
              id="phoneNumber"
              placeholder="+1234567890"
              disabled={isPending}
              {...register("phoneNumber", {
                required: "This Field is Required",
              })}
            />
            {errors?.phoneNumber && (
              <span className="text-red-600 text-sm self-start">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="password"
              className="block text-base font-medium mb-1 self-start"
            >
              Password (min 8 characters)
            </label>
            <FormInput
              type="password"
              id="password"
              togglePassword
              disabled={isPending}
              {...register("password", {
                required: "This Field is Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors?.password && (
              <span className="text-red-600 text-sm self-start">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3 flex flex-col items-center">
            <label
              htmlFor="passwordConfirm"
              className="block text-base font-medium mb-1 self-start"
            >
              Repeat password
            </label>
            <FormInput
              type="password"
              id="passwordConfirm"
              togglePassword
              disabled={isPending}
              {...register("passwordConfirm", {
                required: "This Field is Required",
                validate: (value) =>
                  value === getValues().password || "Password needs to match",
              })}
            />
            {errors?.passwordConfirm && (
              <span className="text-red-600 text-sm self-start">
                {errors.passwordConfirm.message}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center pt-2 border-gray-100">
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-3 w-[150px] rounded-md disabled:bg-input disabled:text-secondary bg-secondary text-primary hover:text-secondary hover:bg-input"
            >
              {isPending ? (
                <div className="flex justify-center">
                  <SpinnerMini />
                </div>
              ) : (
                "Signup"
              )}
            </button>
            <p className="py-4 ">
              Have an account?{" "}
              <Link className="hover:text-blue-600" to="/login">
                LogIn
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
