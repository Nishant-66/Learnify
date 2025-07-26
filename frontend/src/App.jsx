import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Hero } from './components/Hero';
import { CourseDetails } from './components/CourseDetails';
import DashBoard from './components/DashBoard';
import MyCourses from './components/MyCourses';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
      <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path=":id" element={<CourseDetails />} />
            <Route path="dashboard" element={<DashBoard/>} />
            <Route path="mycourses" element={<MyCourses/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="changepassword" element={<ChangePassword/>} />
            

          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    
  );
}

export default App;
