import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { useState } from 'react'
import "./App.css";
import Quest_start from "./pages/quest_start";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quest_start />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
