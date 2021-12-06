import React from "react";
import { Tile } from "../Tile";
import { BoardProvider } from "./BoardContext";
import { Grid } from "../Grid";
import "./Board.css";

const Board = ({ tiles, tileCountPerRow = 4 }) => {
  //temp
  const tileTotalWidth = 80;
  const boardMargin = 10;

  const containerWidth = tileTotalWidth * tileCountPerRow;

  const boardWidth = containerWidth + boardMargin;

  const tilesList = tiles.map(({ id, ...restProps }) => (
    //<Tile key={`tile-${id}`} {...restProps} zIndex={id} />
    <div></div>
  ));

  return (
    <div className='board' style={{ width: boardWidth }}>
      <BoardProvider
        containerWidth={containerWidth}
        tileCount={tileCountPerRow}
      >
        <div className='tile-container'>{tilesList}</div>
        <Grid />
      </BoardProvider>
    </div>
  );
};

export default Board;