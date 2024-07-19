import { useMemo, useState } from "react";
import "./GridLight.css";

type numberArr = number[];
function GridLight({ GRID_CONFIG }: { GRID_CONFIG: numberArr[] }) {
  const [clickedElements, setClickedElements] = useState<numberArr[]>([]);
  const getSquareCounts = useMemo(
    () => GRID_CONFIG.flat().reduce((acc, ele) => acc + ele, 0),
    [GRID_CONFIG]
  );

  console.log(getSquareCounts);

  const handleClick = (rowIdx: number, colIdx: number) => {
    if (clickedElements[rowIdx][colIdx]) {
    }
  };
  return (
    <div className="grid">
      {GRID_CONFIG &&
        GRID_CONFIG.map((ele: numberArr, rowIndex: number) => {
          return (
            <div className="grid-row" key={rowIndex}>
              {ele.map((val: number, colIndex: number) => {
                return val === 1 ? (
                  <div
                    className="grid-square"
                    onClick={() => handleClick(rowIndex, colIndex)}
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
