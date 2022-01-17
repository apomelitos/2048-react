import React from "react";

export const InitialState = {
  tilesMap: {
    1: { id: 1, position: [2, 3], value: 2 },
    2: { id: 2, position: [3, 3], value: 2 },
    3: { id: 3, position: [3, 2], value: 2 },
  },
  tilesArray: [
    { id: 1, position: [2, 3], value: 2 },
    { id: 2, position: [3, 3], value: 2 },
    { id: 3, position: [3, 2], value: 2 },
  ],
  hasChanged: false,
};

export const gameReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_TILE":
      break;
    case "UPDATE_TILE":
      return {
        ...state,
        tilesMap: {
          ...state.tilesMap,
          [payload.id]: payload,
        },
        hasChanged: true,
      };
    case "MERGE_TILE":
      //source, destination
      const tempState = state.map((tile) => {
        if (tile.id === action.source.id) {
          // setTimeout(() => )
          return {
            ...tile,
            value: tile.value * 2,
            mergeWith: undefined,
          };
        }
        return tile;
      });
      return tempState.filter((tile) => tile.id !== action.destination.id);
    default:
      console.error(`Action ${type} not defined`);
      break;
  }

  return state;
};
