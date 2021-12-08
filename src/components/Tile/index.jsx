import React, { useState, useEffect } from "react";
import { useBoard } from "../../hooks/useBoard";

import "./Tile.css";

export const Tile = ({ value, position, zIndex }) => {
  const [scale, setScale] = useState(1);
  const [prevValue, setPrevValue] = useState(value);

  const [boardWidthInPixels, tileCount] = [400, 4]; //useBoard();

  const isNew = prevValue === undefined;

  const shallAnimate = isNew || value !== prevValue;

  useEffect(() => {
    if (shallAnimate) {
      setScale(1.2);
      setTimeout(() => setScale(1), 200);
    }
  }, [shallAnimate, scale]);

  const positionToPixels = (position) => {
    return (position / tileCount) * boardWidthInPixels;
  };
  console.log(boardWidthInPixels);
  const style = {
    top: positionToPixels(position[1]),
    left: positionToPixels(position[0]),
    transform: `scale(${scale})`,
    zIndex: zIndex,
  };

  console.log(style);

  return (
    <div className={`tile tile-${value}`} style={style}>
      {value}
    </div>
  );
};
