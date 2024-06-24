import "./App.css";
import Column from "./components/Column";

function App() {
  return (
    <div className="App">
      <Column state="DONE" />
      <Column state="ONGOING" />
      <Column state="STATUS" />
    </div>
  );
}

export default App;
