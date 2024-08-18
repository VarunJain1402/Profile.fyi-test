import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
      alert("Wrong Password/Username")
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold mb-6 text-center">Login</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-600 text-center">
        New user? <Link to="/register" className="text-blue-600 hover:text-blue-500">Register Here</Link>
      </p>
    </form>
  );
}

export default Login;
