import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
     
      alert("User Registered Successfully!!");
    } catch (error) {
      console.log(error.message);
      alert("User Registeration Unsuccessfull");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Sign Up</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">First name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Last name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600 text-center">
        Already registered? <a href="/login" className="text-blue-600 hover:text-blue-500">Login</a>
      </p>
    </form>
  );
}

export default Register;
