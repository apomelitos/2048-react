import React, { useEffect, useState } from "react";

import Board from "../Board";
import { InitialState, gameReducer } from "./reducer";

const TILES_IN_ROW = 4;
const TILES_IN_COL = 4;

const Game = () => {
  const [tilesState, setTilesState] = useState(InitialState);

  const handleKeyDown = (e) => {
    //e.preventDefault();
    switch (e.code) {
      case "ArrowLeft":
        moveLeft();
        console.log("Moved left");
        break;
      case "ArrowRight":
        moveRight();
        console.log("Moved right");
        break;
      case "ArrowDown":
        moveDown();
        console.log("Moved down");
        break;
      case "ArrowUp":
        moveUp();
        console.log("Moved up");
        break;
      default:
        console.log(e.code);
    }
  };

  const getTileColumnMap = () => {
    const tileMap = {};

    tilesState.forEach((tile) => {
      if (!tileMap[tile.position[0]]) {
        tileMap[tile.position[0]] = {};
      }
      const [tileCol, tileRow] = tile.position;
      tileMap[tileCol][tileRow] = [tile.id, tile.value];
    });

    return tileMap;
  };

  const getTileMap = () => {
    const tileMap = {};

    tilesState.tilesArray.forEach((tile) => {
      if (!tileMap[tile.position[1]]) {
        tileMap[tile.position[1]] = {};
      }
      tileMap[tile.position[1]][tile.position[0]] = { ...tile };
    });

    return tileMap;
  };

  // const updateTile = (id, tileMeta) => {
  //   console.log(id, tileMeta);

  //   const {
  //     mergeWith,
  //     tileId,
  //     position: [col, row],
  //   } = tileMeta;
  //   let newValue;

  //   if (mergeWith) {
  //     setTilesState((prev) => {
  //       return prev.filter((tile) => tile.id !== mergeWith);
  //     });
  //   }

  //   const newTileMeta = {
  //     ...tileMeta,
  //     position: [col - 1, row],
  //     value: mergeWith ? tileMeta.value : tileMeta.value * 2,
  //   };

  //   setTilesState((prev) => {
  //     return prev.map((tile) => (tile.id === id ? newTileMeta : tile));
  //   });
  // };

  const moveLeft = () => {
    const tileMap = getTileMap();

    let newState = [...tilesState.tilesArray];

    for (let rowIdx in tileMap) {
      let col = 0;
      let prevTileMeta = null;

      const orderedKeys = Object.keys(tileMap[rowIdx]).sort((a, b) => +a - +b);
      // console.log(orderedKeys);

      for (let colIdx of orderedKeys) {
        const tileMeta = tileMap[rowIdx][colIdx];
        const { value } = tileMeta;

        if (
          prevTileMeta &&
          !prevTileMeta.mergeWith &&
          value === prevTileMeta.value
        ) {
          tileMeta.mergeWith = prevTileMeta.id;
          col--;
        }

        const newPosition = [col, +rowIdx];
        const movedTileMeta = {
          ...tileMeta,
          position: newPosition,
        };

        newState = gameReducer(newState, {
          type: "UPDATE_TILE",
          payload: movedTileMeta,
        });

        setTilesState(newState);

        if (prevTileMeta && value === prevTileMeta.value) {
          newState = gameReducer(newState, {
            type: "MERGE_TILE",
            source: movedTileMeta,
            destination: prevTileMeta,
          });
        }

        col++;
        prevTileMeta = tileMeta;

        newState = gameReducer(newState, {
          type: "CREATE_TILE",
        });

        setTilesState(newState);
      }
    }
    setTilesState(newState);
  };

  const moveUp = () => {
    const tileMap = getTileColumnMap();

    let newState = tilesState;

    for (let colIdx in tileMap) {
      let row = 0;

      const orderedKeys = Object.keys(tileMap[colIdx]).sort((a, b) => +a > +b);
      //console.log(`Ordered keys on up: ${orderedKeys}`);

      for (let rowIdx of orderedKeys) {
        //console.log(`${colIdx}:${rowIdx} to ${colIdx}:${row}`);
        const [tileId, tileValue] = tileMap[colIdx][rowIdx]; //[id, value]
        const newPosition = [+colIdx, row];
        newState = gameReducer(newState, {
          type: "UPDATE_TILE",
          payload: {
            id: tileId,
            value: tileValue,
            position: newPosition,
          },
        });

        //console.log(newPosition);
        //console.log(newState);
        row++;
      }
    }

    console.log(tilesState);
    console.log(newState);
    setTilesState(newState);
  };

  const moveDown = () => {
    const tileMap = getTileColumnMap();

    let newState = tilesState;

    for (let colIdx in tileMap) {
      let row = TILES_IN_ROW - 1;

      const reverseOrderedKeys = Object.keys(tileMap[colIdx])
        .sort((a, b) => +a > +b)
        .reverse();

      console.log(reverseOrderedKeys);

      for (let rowIdx of reverseOrderedKeys) {
        console.log(`Move col ${colIdx} to ${row}`);
        const [tileId, tileValue] = tileMap[colIdx][rowIdx]; //[id, value]
        const newPosition = [+colIdx, row];
        newState = gameReducer(newState, {
          type: "UPDATE_TILE",
          payload: {
            id: tileId,
            value: tileValue,
            position: newPosition,
          },
        });

        //console.log(newPosition);
        //console.log(newState);
        row--;
      }
    }
    setTilesState(newState);
  };

  const moveRight = () => {
    const tileMap = getTileMap();

    let newState = [...tilesState];

    for (let rowIdx in tileMap) {
      let col = TILES_IN_COL - 1;
      let prevTileMeta = null;

      const reverseOrderedKeys = Object.keys(tileMap[rowIdx]).sort(
        (a, b) => +b - +a
      );

      for (let colIdx of reverseOrderedKeys) {
        const tileMeta = tileMap[rowIdx][colIdx];
        const { value } = tileMeta;

        if (!prevTileMeta?.mergeWith && value === prevTileMeta?.value) {
          tileMeta.mergeWith = prevTileMeta.id;
          col++;
        }

        const newPosition = [col, +rowIdx];
        const movedTileMeta = {
          ...tileMeta,
          position: newPosition,
        };

        newState = gameReducer(newState, {
          type: "UPDATE_TILE",
          payload: movedTileMeta,
        });

        setTilesState(newState);

        if (prevTileMeta?.value === value) {
          newState = gameReducer(newState, {
            type: "MERGE_TILE",
            source: movedTileMeta,
            destination: prevTileMeta,
          });
        }
        col--;
        prevTileMeta = tileMeta;

        setTilesState(newState);
      }
    }
    setTilesState(newState);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <>
      <Board tiles={tilesState.tilesArray} />
    </>
  );
};

export default Game;
