import React from 'react';

const RadioButton = ({ id, name, value, checked, onChange, children }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-2 cursor-pointer mb-2">
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="appearance-none w-5 h-5 border-2 border-gray-300 rounded-full 
                  checked:border-teal-500 relative
                  before:content-[''] before:block before:absolute before:w-3 before:h-3 
                  before:rounded-full before:top-1/2 before:left-1/2 before:-translate-x-1/2 
                  before:-translate-y-1/2 checked:before:bg-teal-500"
      />
      <span>{children}</span>
    </label>
  );
};

export default RadioButton;