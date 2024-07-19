import "./App.css";
import GridLight from "./components/GridLight/GridLight";

function App() {
  const GRID_CONFIG = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];
  return (
    <div className="grid_container">
      <GridLight GRID_CONFIG={GRID_CONFIG} />
    </div>
  );
}

export default App;
