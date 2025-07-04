import React from "react";

interface DatePickerProps {
  label?: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value,   className,
    onChange }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label className="block text-sm text-label dark:text-labelDark font-medium mb-1">
          {label}
        </label>
      )}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-1.5 border border-label dark:border-labelDark bg-transparent rounded-md focus:outline-none focus:ring-1 focus:ring-textColor dark:focus:ring-textColorDark ${className}`}
      />
    </div>
  );
};

export default DatePicker;
