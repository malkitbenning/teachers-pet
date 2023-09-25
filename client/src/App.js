import "./App.css";
import Questions from "./Questions";
import ServerTest from "./ServerTest";
import QuestionTable from "./QuestionTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Teachers PET</p>
      </header>
      <ServerTest />
      <Questions />
      <QuestionTable/>
    </div>
    
  );
}

export default App;
