import { useEffect, useMemo, useState } from "react";
import "./GridLight.css";

type GridConfig = number[][];
type Coordinate = [number, number];
const DEACTIVATION_INTERVAL = 300;

function GridLight({ GRID_CONFIG }: { GRID_CONFIG: GridConfig }) {
  const [clickedElements, setClickedElements] = useState<GridConfig>(
    GRID_CONFIG.map((row) => [...row])
  );
  const [sequence, setSequence] = useState<Coordinate[]>([]);
  const [count, setCount] = useState<number>(0);
  const getSquareCounts = useMemo(
    () => GRID_CONFIG.flat().reduce((acc, ele) => acc + ele, 0),
    [GRID_CONFIG]
  );

  useEffect(() => {
    if (count === getSquareCounts && sequence.length > 0) {
      const interval = setInterval(() => {
        setSequence((prevSequence) => {
          const updatedSequence = [...prevSequence];
          const lastSquare = updatedSequence.pop();
          if (lastSquare) {
            setClickedElements((prevClickedElements) => {
              const updatedGrid = prevClickedElements.map((row) => [...row]);
              updatedGrid[lastSquare[0]][lastSquare[1]] = 1;
              return updatedGrid;
            });
          }
          if (updatedSequence.length === 0) {
            clearInterval(interval);
            setCount(0);
          }
          return updatedSequence;
        });
      }, DEACTIVATION_INTERVAL);

      return () => clearInterval(interval);
    }
  }, [count, getSquareCounts, sequence]);

  const handleClick = (rowIdx: number, colIdx: number, e: React.MouseEvent) => {
    if (clickedElements[rowIdx][colIdx] === 2) {
      alert("Element Already Clicked");
    } else if (count === getSquareCounts) {
      alert("Chill Out!");
    } else {
      const updatedGrid = clickedElements.map((row) => [...row]);
      const updatedSequence = sequence.map((row) => [...row]);
      updatedGrid[rowIdx][colIdx] = 2;
      updatedSequence.push([rowIdx, colIdx]);
      setCount((count) => count + 1);
      setSequence(updatedSequence);
      setClickedElements(updatedGrid);
    }
  };
  return (
    <div className="grid">
      {clickedElements &&
        clickedElements.map((ele: number[], rowIndex: number) => {
          return (
            <div className="grid-row" key={rowIndex}>
              {ele.map((val: number, colIndex: number) => {
                return val === 1 || val === 2 ? (
                  <div
                    className={`grid-square ${val === 1 ? "green" : "brown"}`}
                    onClick={(e) => handleClick(rowIndex, colIndex, e)}
                    key={colIndex}
                    role="button"
                    aria-pressed={val === 2}
                    tabIndex={0}
                  />
                ) : (
                  <div className="hidden" key={colIndex} />
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default GridLight;
