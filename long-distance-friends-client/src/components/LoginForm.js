import React, { useState } from "react";

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div class="flex flex-col content-center">
      <h2>Login</h2>
      <div class="w-2/5 m-auto content-center">
        <form onSubmit={handleSubmit}>

          <div class="mb-6">
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Username</label>
            <input type="username" id="username" className="fld-txt" placeholder="name@flowbite.com" required />
          </div>
          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input type="password" id="password" className="fld-txt" required />
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;