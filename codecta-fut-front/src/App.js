import "./App.css";
import Navbar from "./NavBar/Navbar";
import Players from "./PlayerPage/PlayerPage";
import Teams from "./TeamPage/TeamPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/players" element={<Players />} />
            <Route path="/teams" element={<Teams />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
