import "./styles.scss";
import React, { DragEvent } from "react";
import { PieceInterface } from "../../reducers/game.reducer";

import P1 from "../../assets/planet-1.png";
import P2 from "../../assets/planet-2.png";
import P3 from "../../assets/planet-3.png";
import P4 from "../../assets/planet-4.png";
import P5 from "../../assets/planet-5.png";
import P6 from "../../assets/planet-6.png";
import { useState } from "react";

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
  draggable?: boolean;
}

const Piece: React.FC<PieceProps> = ({ piece, draggable = true }) => {
  const [style, setStyle] = useState<any>({});
  const [startPoint, setStartPoint] = useState<any>(null);
  const getSrc = () => {
    if (piece.planet !== undefined) {
      return sourceMap[piece.planet][piece.value];
    }
  };

  const handleDragStart = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData("piece", JSON.stringify(piece));
    ev.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
    setStartPoint({ clientX: ev.clientX, clientY: ev.clientY });
  };
  const handleDrag = (ev: DragEvent<HTMLDivElement>) => {
    const translation = {
      x: ev.clientX - startPoint.clientX,
      y: ev.clientY - startPoint.clientY,
    };
    if (ev.clientX !== 0 && ev.clientY !== 0) {
      setStyle({
        transform: `translate(${translation.x}px, ${translation.y}px)`,
      });
    }
  };
  const handleDragEnd = (ev: DragEvent<HTMLDivElement>) => {
    setStyle({
      transform: `translate(0px, 0px)`,
    });
    setStartPoint(null);
  };

  return (
    <div className="containerp">
      <img
        style={style}
        alt={`Piece ${piece}`}
        className="piece abs"
        src={getSrc()}
        data-drop={!startPoint}
        data-piece={`${piece.value}`}
      />
      <img
        draggable={draggable}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        alt={`Piece ${piece}`}
        className="piece normal"
        src={getSrc()}
        data-drop={!startPoint}
        data-piece={`${piece.value}`}
      />
    </div>
  );
};

export default Piece;
