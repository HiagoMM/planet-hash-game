export interface PieceInterface {
  value: 1 | 2 | 3;
  player: "p1" | "p2";
  planet?: 0 | 1 | 2 | 3 | 4 | 5;
  id: string;
}

export type BoardType = Array<Array<PieceInterface | null>>;

export interface State {
  board: BoardType;
  history: string[];
  p1Pieces: PieceInterface[];
  p2Pieces: PieceInterface[];
  turn: "p1" | "p2";
  win: boolean;
}

export interface Actions {
  type: "play" | "startupPlayer" | "win" | "reset";
  payload?: any;
}

export interface PlayPayload {
  piece: PieceInterface;
  place: { row: number; column: number };
}

const gameReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case "startupPlayer":
      return {
        ...state,
        [action.payload.player + "Pieces"]: [
          {
            id: `${action.payload.player}-1`,
            value: 1,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            id: `${action.payload.player}-2`,
            value: 1,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            id: `${action.payload.player}-3`,
            value: 2,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            id: `${action.payload.player}-4`,
            value: 2,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            id: `${action.payload.player}-5`,
            value: 3,
            player: action.payload.player,
            planet: action.payload.piece,
          },
          {
            id: `${action.payload.player}-6`,
            value: 3,
            player: action.payload.player,
            planet: action.payload.piece,
          },
        ],
      };
    case "play":
      const {
        piece,
        place: { row, column },
      } = action.payload as PlayPayload;
      if (state.turn === piece.player) {
        if (
          !state.board[row][column] ||
          Number(state.board[row][column]?.value) < piece.value
        ) {
          const newBoard = state.board.map((rowArray, r) =>
            rowArray.map((actualPiece, c) => {
              if (r === row && c === column) {
                return piece;
              }
              return actualPiece;
            })
          );
          const newPlayerPieces = (
            state[(piece.player + "Pieces") as keyof State] as PieceInterface[]
          ).filter((playerPiece) => playerPiece.id !== piece.id);

          return {
            ...state,
            board: newBoard,
            [piece.player + "Pieces"]: newPlayerPieces,
            history: [
              ...state.history,
              `${piece.player}-${piece.value}=r${row}-c${column}`,
            ],
            turn: state.turn === "p1" ? "p2" : "p1",
          };
        }
      }

      return state;
    case "win":
      return { ...state, win: true };
    case "reset":
      return INITIAL_STATE;
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
  turn: "p1",
  win: false,
};
