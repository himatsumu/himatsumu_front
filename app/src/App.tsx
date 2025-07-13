import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestPlaying from "./pages/quest_playing";
import QuestClear from "./pages/quest_clear";
import QuestNo from "./pages/quest_no";
import CharaEvolution from "./pages/chara_evolution";
import "./App.css";
import Quest_create from "./pages/quest_create";
import Quest_create_check from "./pages/quest_create_check";
import Quest_theme from "./pages/quest_theme";
import Quest_location from "./pages/quest_location";
import Friend_home from "./pages/friend_home";
import Friend_list from "./pages/friend_list";
import Login from "./pages/login";
import Friend_home_finish from "./pages/friend_home_finish";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuestPlaying />} />
          <Route path="/quest_playing" element={<QuestPlaying />} />
          <Route path="/quest_clear" element={<QuestClear />} />
          <Route path="/chara_evolution" element={<CharaEvolution />} />
          <Route path="/quest_no" element={<QuestNo />} />
          <Route path="/friend-list" element={<Friend_list />} />
          <Route path="/friend-home" element={<Friend_home />} />
          <Route path="/quest-create" element={<Quest_create />} />
          <Route path="/quest-create-check" element={<Quest_create_check />} />
          <Route path="/quest-theme" element={<Quest_theme />} />
          <Route path="/quest-location" element={<Quest_location/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/friend-home-finish" element={<Friend_home_finish />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
