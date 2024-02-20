import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import TablePlayers from "./pages/TablePlayers";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/table-players" element={<TablePlayers />} />
      </Routes>
    </div>
  );
}

export default App;
