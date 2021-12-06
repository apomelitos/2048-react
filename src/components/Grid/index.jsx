import React from "react";
import "./Grid.css";

export const Grid = () => {
  const tileCount = 4; //useBoard will be here;

  const renderGrid = () => {
    const length = tileCount * tileCount;
    const cells = [];

    for (let idx = 0; idx < length; idx++) {
      cells.push(<div key={`${idx}`} className={`grid-cell`} />);
    }

    return cells;
  };
  return <div className='grid'>{renderGrid()}</div>;
};
