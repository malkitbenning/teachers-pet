import "./App.css";
import "./formStyle.css";

import Form from "./components/Form";
import LoginForm from "./components/LoginForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Teachers PET</p>
      </header>
      <LoginForm/>

      <Form />
    </div>
  );
}

export default App;
