import React, { useState, useEffect } from "react";
import { useBoard } from "../hooks/useBoard";
export const Tile = ({ value, position, zIndex }) => {
  const [scale, setScale] = useState(1);
  const prevValue = null;

  const [boardWidthInPixels, tileCount] = useBoard();

  const isNew = prevValue === null;
  // const shallAnimate = isNew || value !== prevValue;

  // useEffect(() => {
  //   // ...
  // }, [shallAnimate, scale]);

  const positionToPixels = (position) => {
    return (position / tileCount) * boardWidthInPixels;
  };

  const style = {
    top: positionToPixels(position[1]),
    left: positionToPixels(position[0]),
    transform: `scale(${scale})`,
    zIndex,
  };

  // ...
};
