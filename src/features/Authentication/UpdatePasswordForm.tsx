import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";
import SpinnerMini from "../../ui/SpinnerMini";
import FormInput from "../../ui/FormInput";
import type { PasswordUpdatePayload } from "../../services/apiAuth";

type PasswordUpdateValues = PasswordUpdatePayload;

function UpdatePasswordForm() {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<PasswordUpdateValues>();

  const { mutate: updatePassword, isPending} = useUpdatePassword();


  const onSubmit = (data: PasswordUpdateValues) => {
    updatePassword(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="lg:w-[600px] w-full md:px-15 mx-auto flex flex-col justify-center p-8 rounded-lg space-y-6 text-sm lg:border border-gray-200"
    >
      {/* Current Password */}
      <div>
        <label htmlFor="passwordCurrent" className="block font-medium mb-1">
          Current Password (min 8 characters)
        </label>
        <FormInput
          type="password"
          id="passwordCurrent"
          togglePassword
          disabled={isPending}
          {...register("passwordCurrent", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors?.passwordCurrent && (
          <p className="text-red-600 text-sm">
            {errors.passwordCurrent.message}
          </p>
        )}
      </div>

      {/* New Password */}
      <div>
        <label htmlFor="password" className="block font-medium mb-1">
          New Password
        </label>
        <FormInput
          type="password"
          id="password"
          togglePassword
          disabled={isPending}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
        {errors?.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="passwordConfirm" className="block font-medium mb-1">
          Repeat Password
        </label>
        <FormInput
          type="password"
          id="passwordConfirm"
          togglePassword
          disabled={isPending}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: {
              matchesPreviousPassword: (value) =>
                value === getValues("password") || "Passwords must match",
            },
          })}
        />
        {errors?.passwordConfirm && (
          <p className="text-red-600 text-sm">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isPending}
          className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-200 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className=" py-3 w-[150px] rounded-md disabled:bg-input bg-secondary text-primary hover:text-secondary hover:bg-input"
        >
          {isPending ? (
            <div className="flex justify-center">
              <SpinnerMini />
            </div>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </form>
  );
}
  

export default UpdatePasswordForm;
