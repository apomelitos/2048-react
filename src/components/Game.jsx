import React from "react";

import Board from "./Board";

const Game = () => {
  const tiles = [
    {
      id: 1,
      position: [0, 0],
      value: 2,
    },
    {
      id: 2,
      position: [1, 0],
      value: 2,
    },
  ];
  return (
    <>
      <Board tiles={tiles} />
    </>
  );
};

export default Game;
