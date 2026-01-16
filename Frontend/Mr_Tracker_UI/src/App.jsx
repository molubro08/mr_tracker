import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import DashboardPage from "./DashBoard";
import ChatbotPage from "./ChatBotPage";


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  )
}

export default App
