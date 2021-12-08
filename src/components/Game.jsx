import React, { useEffect, useState } from "react";

import Board from "./Board";

const initState = [
  {
    id: 1,
    position: [2, 0],
    value: 2,
  },
  {
    id: 2,
    position: [3, 0],
    value: 2,
  },
];

const Game = () => {
  const [tilesState, setTilesState] = useState(initState);
  const tiles = [];

  const handleKeyDown = (e) => {
    e.preventDefault();
    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        console.log("Moved left");
        break;
      default:
        console.log(e.code);
    }
  };

  const getTileMap = () => {
    const tileMap = {};

    tilesState.forEach((tile) => {
      if (!tileMap[tile.position[1]]) {
        tileMap[tile.position[1]] = {};
      }
      tileMap[tile.position[1]][tile.position[0]] = [tile.id, tile.value];
    });

    return tileMap;
  };

  const updateTile = (id, tileMeta) => {
    console.log(id, tileMeta);

    const {
      mergeWith,
      tileId,
      position: [col, row],
    } = tileMeta;
    let newValue;

    if (mergeWith) {
      setTilesState((prev) => {
        return prev.filter((tile) => tile.id !== mergeWith);
      });
    }

    const newTileMeta = {
      ...tileMeta,
      position: [col - 1, row],
      value: mergeWith ? tileMeta.value : tileMeta.value * 2,
    };

    setTilesState((prev) => {
      return prev.map((tile) => (tile.id === id ? newTileMeta : tile));
    });
  };

  const moveLeft = () => {
    const tileMap = getTileMap();
    for (let rowIdx in tileMap) {
      let col = 0;
      for (let colIdx in tileMap[rowIdx]) {
        const tileObj = tileMap[rowIdx][colIdx]; //[id, value]
        console.log("Tile object: ", tileObj);
        const mergeWith =
          col > 0 && tileMap[rowIdx][colIdx - 1][1] === tileObj[1]
            ? tileMap[rowIdx][colIdx - 1][0]
            : null;

        if (col !== colIdx) {
          updateTile(tileObj[0], {
            id: tileObj[0],
            position: [col, +rowIdx],
            value: tileObj[1],
            mergeWith: mergeWith,
          });
        }
        col++;
      }
      col = 0;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <Board tiles={tilesState} />
    </>
  );
};

export default Game;
