import React from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  id: string;
  value: string;
  options: { value: string; label: string }[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  disabled: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  id,
  value,
  options,
  className,
  onChange,
  placeholder,
  ...rest 
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm text-label dark:text-labelDark font-medium mb-1"
      >
        {label}
      </label>
      <select
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 border border-label dark:border-labelDark bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-textColor dark:focus:ring-textColorDark ${className}`}
        {...rest} 
      >
        {placeholder && (
          <option value="" disabled className="bg-card dark:bg-cardDark">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-card dark:bg-cardDark">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
