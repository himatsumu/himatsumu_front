import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPlaying from "./pages/quest_playing";
import QuestClear from "./pages/quest_clear";
import CharaEvolution from "./pages/chara_evolution";
//import { useState } from 'react'

import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestPlaying />} />
          <Route path="/quest_clear" element={<QuestClear />} />
          <Route path="/chara_evolution" element={<CharaEvolution />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
