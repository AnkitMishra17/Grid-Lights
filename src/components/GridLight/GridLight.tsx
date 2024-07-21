import { useEffect, useMemo, useState } from "react";
import "./GridLight.css";

type numberArr = number[];
function GridLight({ GRID_CONFIG }: { GRID_CONFIG: numberArr[] }) {
  const [clickedElements, setClickedElements] = useState<numberArr[]>(
    GRID_CONFIG.map((row) => [...row])
  );
  const [sequence, setSequence] = useState<numberArr[]>([]);
  const [count, setCount] = useState<number>(0);
  const getSquareCounts = useMemo(
    () => GRID_CONFIG.flat().reduce((acc, ele) => acc + ele, 0),
    [GRID_CONFIG]
  );

  useEffect(() => {
    let interval;
    if (count === getSquareCounts) {
      interval = setInterval(() => {
        console.log(sequence, sequence.length);
        if (sequence.length > 0) {
          const resetGrid = clickedElements.map((row) => [...row]);
          const updatedSequence = sequence.map((row) => [...row]);
          const lastSquare = updatedSequence.pop();
          if (lastSquare?.length === 2)
            resetGrid[lastSquare[0]][lastSquare[1]] = 1;
          setSequence(updatedSequence);
          setClickedElements(resetGrid);
        } else {
          setCount(0);
          clearInterval(interval);
        }
      }, 300);
    }
  }, [clickedElements]);
  const handleClick = (rowIdx: number, colIdx: number, e: React.MouseEvent) => {
    if (clickedElements[rowIdx][colIdx] === 2) {
      console.log("Element Already Clicked");
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
        clickedElements.map((ele: numberArr, rowIndex: number) => {
          return (
            <div className="grid-row" key={rowIndex}>
              {ele.map((val: number, colIndex: number) => {
                return val === 1 || val === 2 ? (
                  <div
                    className={`grid-square ${val === 1 ? "green" : "brown"}`}
                    onClick={(e) => handleClick(rowIndex, colIndex, e)}
                    key={colIndex}
                  ></div>
                ) : (
                  <div className="hidden" key={colIndex}></div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default GridLight;
