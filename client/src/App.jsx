import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-[var(--richblack-900)] font-[var(--font-inter)]">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
