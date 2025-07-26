import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { Hero } from './components/Hero';
import { CourseDetails } from './components/CourseDetails';

function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path=":id" element={<CourseDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
