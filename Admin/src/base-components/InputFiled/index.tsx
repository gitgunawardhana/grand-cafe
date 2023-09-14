import React from "react";
interface InputFieldProps {
    id: string;
    label?: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
    
  }
  
  const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    type,
    placeholder,
    value,
    onChange,
    
  }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        id={id}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
    
      />
    </div>
  );
};

export default InputField;