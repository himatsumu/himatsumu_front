import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPlaying from "./pages/quest_playing";
import QuestClear from "./pages/quest_clear";
import QuestNo from "./pages/quest_no";
import CharaEvolution from "./pages/chara_evolution";
import "./App.css";
import Quest_create from "./pages/quest_create";
import Quest_create_check from "./pages/quest_create_check";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
