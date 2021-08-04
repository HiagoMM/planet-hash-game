import "./styles.scss";
import React from "react";

import P1 from "../../assets/planet-1.png";
import P2 from "../../assets/planet-2.png";
import P3 from "../../assets/planet-3.png";
import P4 from "../../assets/planet-4.png";
import P5 from "../../assets/planet-5.png";
import P6 from "../../assets/planet-6.png";

interface ShowPieceTypesProps {
  close: (value: number) => void;
  selected?: number;
}

const ShowPieceTypes: React.FC<ShowPieceTypesProps> = ({ close, selected }) => {
  const pieces = [P1, P2, P3, P4, P5, P6];

  return (
    <div className="pieces-container">
      {pieces.map((piece, i) => {
        return (
          <img
            key={i}
            src={piece}
            alt={`Piece ${i + 1}`}
            className="piece"
            onClick={() => (selected !== i ? close(i) : null)}
            data-black-white={selected === i}
          />
        );
      })}
    </div>
  );
};

export default ShowPieceTypes;
