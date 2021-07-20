export interface PieceInterface {
  value: 1 | 2 | 3;
  player: "p1" | "p2";
  planet?: 0 | 1 | 2 | 3 | 4 | 5;
}

export type BoardType = Array<Array<PieceInterface | null>>;

export interface State {
  board: BoardType;
  history: string[];
  p1Pieces: PieceInterface[];
  p2Pieces: PieceInterface[];
  vez: "p1" | "p2";
}

export interface Actions {
  type: "play" | "startupPlayer";
  payload: any;
}

const gameReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "startupPlayer":
      return {
        ...state,
        [action.payload.player + "Pieces"]: [
          {
            value: 1,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            value: 1,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            value: 2,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            value: 2,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            value: 3,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            value: 3,
            player: action.payload.player,
            planet: action.payload.piece,
          },
        ],
      };
    case "play":
    default:
      return state;
  }
};

export default gameReducer;

export const INITIAL_STATE: State = {
  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
  history: [],
  p1Pieces: [],
  p2Pieces: [],
  vez: "p1",
};
