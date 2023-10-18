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
        <h1 className="header--title">Teacher's P.E.T.</h1>
        <p className="header--text">Pupil Evaluation Tool</p>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/form/:pupilId" element={<Form />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
