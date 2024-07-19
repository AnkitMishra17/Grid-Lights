import { useState } from "react";
import "./GridLight.css";

type numberArr = number[];
function GridLight({ GRID_CONFIG }: { GRID_CONFIG: numberArr[] }) {
  const [grid] = useState(GRID_CONFIG);
  return (
    <div className="grid">
      {grid &&
        grid.map((ele: numberArr) => {
          return (
            <div className="grid-row">
              {ele.map((val: number) => {
                return val === 1 ? (
                  <div className="grid-square"></div>
                ) : (
                  <div className="hidden"></div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default GridLight;
