import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Footer } from './Footer';
import { BASE_URL } from "../utils/constants";
import { removeUser, addUser } from "../utils/userSlice";
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

export function Home() {
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setDropdown(false);
      toast.success("Logout successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data || "Logout failed");
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err?.response?.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    if (user == null) fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
     
      <div className="w-full shadow-md bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/">
              <div className="text-xl font-bold text-indigo-400 tracking-wide">LEARNIFY</div>
            </Link>

            <div className="flex items-center gap-4">
              {!user && (
                <Link to="/signup">
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-200">
                    Get Started
                  </button>
                </Link>
              )}

              {user && (
                <div className="relative">
                  <img
                    src={user.photoUrl}
                    alt="User"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-indigo-500"
                    onClick={() => setDropdown((prev) => !prev)}
                  />
                  {dropdown && (
                    <div className="absolute right-0 mt-2 w-52 bg-slate-800 rounded-lg shadow-lg py-2 z-50">
                      {user.role === "Educator" && (
                        <>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 text-sm hover:bg-slate-700"
                            onClick={() => setDropdown(false)}
                          >
                            Dashboard
                          </Link>
                          <Link
                            to="/mycourses"
                            className="block px-4 py-2 text-sm hover:bg-slate-700"
                            onClick={() => setDropdown(false)}
                          >
                            My Courses
                          </Link>
                        </>
                      )}
                      {user.role === "Student" && (
                        <Link
                          to="/mycourses"
                          className="block px-4 py-2 text-sm hover:bg-slate-700"
                          onClick={() => setDropdown(false)}
                        >
                          My Courses
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-slate-700"
                        onClick={() => setDropdown(false)}
                      >
                        Edit Profile
                      </Link>
                      <Link
                        to="/changepassword"
                        className="block px-4 py-2 text-sm hover:bg-slate-700"
                        onClick={() => setDropdown(false)}
                      >
                        Change Password
                      </Link>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-700"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
