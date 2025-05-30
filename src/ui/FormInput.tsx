import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  togglePassword?: boolean;
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, type = "text", togglePassword = false, ...rest }, ref) => {
    const [show, setShow] = useState(false);

    // dynamically change input type if togglePassword is true
    const inputType = togglePassword ? (show ? "text" : "password") : type;

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          id={id}
          type={inputType}
          {...rest}
          className="w-full p-3 border rounded-md border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex mx-auto overflow-hidden focus:outline-0 focus:ring-0 h-full text-base font-normal leading-normal disabled:bg-gray-500"
        />

        {togglePassword && (
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-text-primary focus:outline-none"
            tabIndex={-1}
          >
            {show ? <FaEyeSlash /> : <FaEye />}
          </button>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
export default FormInput;
