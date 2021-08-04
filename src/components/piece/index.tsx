import "./styles.scss";
import React, { DragEvent } from "react";
import { PieceInterface } from "../../reducers/game.reducer";

import P1 from "../../assets/planet-1.png";
import P2 from "../../assets/planet-2.png";
import P3 from "../../assets/planet-3.png";
import P4 from "../../assets/planet-4.png";
import P5 from "../../assets/planet-5.png";
import P6 from "../../assets/planet-6.png";

const sourceMap = [
  {
    1: P1,
    2: P1,
    3: P1,
  },
  {
    1: P2,
    2: P2,
    3: P2,
  },
  {
    1: P3,
    2: P3,
    3: P3,
  },
  {
    1: P4,
    2: P4,
    3: P4,
  },
  {
    1: P5,
    2: P5,
    3: P5,
  },
  {
    1: P6,
    2: P6,
    3: P6,
  },
];

interface PieceProps {
  piece: PieceInterface;
}

const Piece: React.FC<PieceProps> = ({ piece }) => {
  const getSrc = () => {
    if (piece.planet) {
      return sourceMap[piece.planet][piece.value];
    }
    return piece.player === "p1" ? P1 : P5;
  };

  const handleDragStart = (ev: DragEvent<HTMLDivElement>) => {
    console.log("start", piece);
    ev.dataTransfer.setData("piece", JSON.stringify(piece));
  };

  const handleDrag = (ev: DragEvent<HTMLDivElement>) => {};

  return (
    <img
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      alt={`Piece ${piece}`}
      className="piece"
      src={getSrc()}
      data-piece={`${piece.value}`}
    />
  );
};

export default Piece;
