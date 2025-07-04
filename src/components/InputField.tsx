import React from "react";

export interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  id,
}) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id || name}
        className="block text-sm font-medium text-label dark:text-labelDark"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 text-textColor dark:text-textColorDark bg-input dark:bg-inputDark focus:border-primary dark:focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
};

export default InputField;
