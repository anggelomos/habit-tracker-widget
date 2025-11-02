import './App.css';
import { HabitWidget } from './components/HabitWidget/HabitWidget';
import { useApp } from './context/AppContext';

function App() {
  const { currentDate, isLoading, error } = useApp();

  if (isLoading && !currentDate) {
    return (
      <div className="app">
        <div className="app__widget-container">
          <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
        </div>
      </div>
    );
  }

  if (error && !currentDate) {
    return (
      <div className="app">
        <div className="app__widget-container">
          <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="app__widget-container">
        <HabitWidget />
      </div>
    </div>
  );
}

export default App;
