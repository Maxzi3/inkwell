import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
    id,
    type = "text",
    value,
    onChange,
    disabled = false,
    placeholder = "",
    ...rest
}) => {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full p-3 border rounded-md border-none border-text-primary bg-input focus:ring-blue-500 transition-all duration-300 placeholder:text-text-primary flex  mx-auto overflow-hidden  focus:outline-0 focus:ring-0 h-full text-base font-normal leading-normal disabled:bg-gray-500 "
            {...rest}
        />
    );
};

export default FormInput;