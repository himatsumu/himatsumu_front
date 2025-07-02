import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPlaying from "./pages/quest_playing";
import QuestClear from "./pages/quest_clear";
import QuestNo from "./pages/quest_no";
import CharaEvolution from "./pages/chara_evolution";
import "./App.css";
import Quest_create from "./pages/quest_create";
import Quest_create_check from "./pages/quest_create_check";
import Quest_theme from "./pages/quest_theme";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestPlaying />} />
          <Route path="/quest_clear" element={<QuestClear />} />
          <Route path="/chara_evolution" element={<CharaEvolution />} />
          <Route path="/quest_no" element={<QuestNo />} />
          <Route path="/quest-create" element={<Quest_create />} />
          <Route path="/quest-create-check" element={<Quest_create_check />} />
          <Route path="/quest-theme" element={<Quest_theme/>} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
