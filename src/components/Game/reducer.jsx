import React from "react";

export const InitialState = [
  {
    id: 1,
    position: [2, 3],
    value: 2,
  },
  {
    id: 2,
    position: [3, 3],
    value: 2,
  },
  {
    id: 3,
    position: [3, 2],
    value: 2,
  },
];

export const gameReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "CREATE_TILE":
      const emptyTilePosition = [0, 3];
      return [
        ...state,
        {
          ...payload,
          position: emptyTilePosition,
          value: 2,
        },
      ];
    case "UPDATE_TILE":
      return state.map((tile) => {
        return tile.id === payload.id ? { ...tile, ...payload } : tile;
      });
    case "MERGE_TILE":
      const tempState = state.map((tile) => {
        if (tile.id === payload.id) {
          return {
            ...tile,
            value: tile.value * 2,
            mergeWith: undefined,
          };
        }
        return tile;
      });
      return tempState.filter((tile) => tile.id !== payload.mergeWith);
    default:
      console.error(`Action ${type} not defined`);
      break;
  }

  return state;
};
