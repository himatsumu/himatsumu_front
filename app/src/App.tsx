import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPlaying from "./pages/quest_playing";
import QuestClear from "./pages/quest_clear";
import QuestNo from "./pages/quest_no";
import CharaEvolution from "./pages/chara_evolution";
//import { useState } from 'react'
import "./App.css";
import Quest_start from "./pages/quest_start";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestPlaying />} />
          <Route path="/quest_clear" element={<QuestClear />} />
          <Route path="/chara_evolution" element={<CharaEvolution />} />
          <Route path="/quest_no" element={<QuestNo />} />
          <Route path="/" element={<Quest_start />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
