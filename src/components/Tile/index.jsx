import React, { useState, useEffect } from "react";
import { useBoard } from "../../hooks/useBoard";
import { usePrevious } from "../../hooks/usePrevious";

import "./Tile.css";

export const Tile = ({ value, position, zIndex }) => {
  const [boardWidthInPixels, tileCount] = [400, 4]; //useBoard();

  const [scale, setScale] = useState(1);

  const prevValue = usePrevious(value);

  const isNew = prevValue === undefined;
  console.log("PREV PROPS LOG: ", prevValue);
  const shallAnimate = isNew || value !== prevValue;

  useEffect(() => {
    if (shallAnimate) {
      setTimeout(() => {
        setScale(1.1);
      }, 200);
      setTimeout(() => setScale(1), 500);
    }
  }, [shallAnimate, scale]);

  const positionToPixels = (position) => {
    return (position / tileCount) * boardWidthInPixels;
  };
  //console.log(boardWidthInPixels);
  const style = {
    top: positionToPixels(position[1]),
    left: positionToPixels(position[0]),
    transform: `scale(${scale})`,
    zIndex,
  };

  //console.log(style);

  return (
    <div className={`tile tile-${prevValue || value}`} style={style}>
      {value}
    </div>
  );
};
