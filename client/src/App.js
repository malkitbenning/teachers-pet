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
        <h1 className="teacherpet-header">Teachers PET</h1>
        <p className="pet-header"> (Pupil Evaluation tool)</p>
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
