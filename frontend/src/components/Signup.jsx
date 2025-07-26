import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import { toast } from 'react-toastify';

export function Signup() {
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "Student"  
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setformData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/signup", formData, { withCredentials: true });
      console.log(res);
      dispatch(addUser(res.data.data));
      toast.success("Signup successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center bg-slate-900 px-4 py-10 min-h-screen">
      <div className="w-full max-w-md bg-slate-800 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={changeHandler}
              className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={changeHandler}
              className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={changeHandler}
              className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={changeHandler}
              className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={changeHandler}
              className="w-full bg-slate-700 text-white border border-slate-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Student">Student</option>
              <option value="Educator">Educator</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-slate-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-fuchsia-400 hover:underline font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
