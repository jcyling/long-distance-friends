import React from "react";

const FieldTextWithLabel = ({ name, text, variable, setFunction }) => {
  return (
    <div className="mb-6">
      <label htmlFor={name.toLowerCase()} className="block mb-2 text-sm font-medium text-gray-900">
        { text ? text: name }
      </label>
      <input
        require="true"
        className="fld-txt"
        type={name.toLowerCase()}
        id={name.toLowerCase()}
        value={variable}
        placeholder={name}
        onChange={({ target }) => setFunction(target.value)} required />
    </div>
  );
};

export default FieldTextWithLabel;