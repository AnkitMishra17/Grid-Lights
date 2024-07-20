import { useEffect, useMemo, useState } from "react";
import "./GridLight.css";

type numberArr = number[];
interface ClickedSquares {
  rowIdx: number;
  colIdx: number;
}
function GridLight({ GRID_CONFIG }: { GRID_CONFIG: numberArr[] }) {
  const [clickedElements, setClickedElements] = useState<ClickedSquares[]>([]);
  const getSquareCounts = useMemo(
    () => GRID_CONFIG.flat().reduce((acc, ele) => acc + ele, 0),
    [GRID_CONFIG]
  );

  useEffect(() => {
    let interval;
    if (clickedElements.length === getSquareCounts) {
      interval = setInterval(() => {}, 300);
    }
  }, [clickedElements]);
  const handleClick = (rowIdx: number, colIdx: number, e: React.MouseEvent) => {
    const index = clickedElements.findIndex(
      (val) => val.rowIdx === rowIdx && val.colIdx === colIdx
    );
    if (index !== -1) {
      console.log("Element Already Clicked");
    } else {
      console.log(e.target);
      const target = e.target as HTMLElement;
      target.classList.add("clicked");
      setClickedElements([...clickedElements, { rowIdx, colIdx }]);
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
