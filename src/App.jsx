import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Schedule from "./pages/Schedule";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route index element={<Login />} />
            <Route path="schedule" element={<Schedule />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
