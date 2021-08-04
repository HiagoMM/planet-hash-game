import React, { DragEvent } from "react";
import {
  Actions,
  BoardType,
  PieceInterface,
} from "../../reducers/game.reducer";
import Piece from "../piece";
import "./styles.scss";
import { useEffect } from "react";

interface BoardProps {
  board: BoardType;
  dispatch: React.Dispatch<Actions>;
}

const Board: React.FC<BoardProps> = ({ board, dispatch }) => {
  useEffect(() => {
    if (checkWin(board)) {
      dispatch({ type: "win" });
    }
  }, [board, dispatch]);

  const handleOver = (ev: DragEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    ev.preventDefault();
  };

  const handleDrop = (
    ev: DragEvent<HTMLDivElement>,
    place: { row: number; column: number }
  ) => {
    const piece: PieceInterface = JSON.parse(ev.dataTransfer.getData("piece"));
    dispatch({ type: "play", payload: { piece, place } });
  };

  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, ir) =>
          row.map((piece, ic) => (
            <div
              key={`${ir}${ic}`}
              className="piece-wrapper"
              onDrop={(ev) => handleDrop(ev, { column: ic, row: ir })}
              onDragOver={handleOver}
            >
              {!!piece && <Piece piece={piece} draggable={false} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function checkWin(board: BoardType) {
  let win = false;
  for (let index = 0; index < board.length; index++) {
    if (
      !!board[index][0] &&
      board[index][0]?.player === board[index][1]?.player &&
      board[index][0]?.player === board[index][2]?.player
    ) {
      win = true;
    }
    if (
      !!board[0][index] &&
      board[0][index]?.player === board[1][index]?.player &&
      board[0][index]?.player === board[2][index]?.player
    ) {
      win = true;
    }
  }
  if (
    !!board[0][0] &&
    board[0][0]?.player === board[1][1]?.player &&
    board[0][0]?.player === board[2][2]?.player
  ) {
    win = true;
  }
  if (
    !!board[2][0] &&
    board[2][0]?.player === board[1][1]?.player &&
    board[2][0]?.player === board[0][2]?.player
  ) {
    win = true;
  }
  return win;
}

export default Board;
