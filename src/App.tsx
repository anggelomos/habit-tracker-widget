import "./App.css";
import { HabitWidget } from "./components/HabitWidget/HabitWidget";

function App() {
  return (
    <div className="app">
      <div className="app__widget-container">
        <HabitWidget />
      </div>
    </div>
  );
}

export default App;
