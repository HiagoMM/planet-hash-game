import React from "react";
import { BoardType } from "../../reducers/game.reducer";
import Piece from "../piece";

import "./styles.scss";

interface BoardProps {
  board: BoardType;
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div className="board-container">
      <div className="board">
        {board.map((row, ir) =>
          row.map((piece, ic) => (
            <div key={`${ir}${ic}`} className="piece-wrapper">
              {!!piece && <Piece piece={piece} />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
