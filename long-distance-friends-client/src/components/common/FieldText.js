import React from "react";

const FieldText = ({ email, setEmail }) => {
  return (
    <div className="mb-6">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        className="fld-txt"
        placeholder="Email"
        onChange={({ target }) => setEmail(target.value)} required />
    </div>
  )
};

export default FieldText;