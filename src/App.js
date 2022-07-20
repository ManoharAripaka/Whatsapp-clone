import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";
import Home from "./Components/Home/Home";
import { useSelector } from "react-redux";
import Welcome from "./Components/Welcome/Welcome";

export default function App() {
  const { loggedin } = useSelector((state) => state.data);
  return (
    <div>
      <Routes>
        <Route path='/' element={loggedin ? <Navigate to='/home' /> : <Welcome /> } />
        <Route exact path="/home" element={loggedin ? <Home /> : <Navigate to='../' /> } />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </div>
  );
}
