import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  id: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  className,
  id,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm text-label dark:text-labelDark font-medium mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-label dark:border-labelDark placeholder:text-sm placeholder-label dark:placeholder-labelDark bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-textColor dark:focus:ring-textColorDark ${className}`}
      />
    </div>
  );
};

export default InputField;
