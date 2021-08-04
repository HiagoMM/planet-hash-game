import React, { DragEvent } from "react";
import {
  Actions,
  BoardType,
  PieceInterface,
} from "../../reducers/game.reducer";
import Piece from "../piece";
import "./styles.scss";

interface BoardProps {
  board: BoardType;
  dispatch: React.Dispatch<Actions>;
}

const Board: React.FC<BoardProps> = ({ board, dispatch }) => {
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
              {!!piece && <Piece piece={piece} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
