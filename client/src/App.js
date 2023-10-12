import "./App.css";
import "./formStyle.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import LoginForm from "./components/LoginForm";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header--text">Teachers PET</h1>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
