import React from "react";
import { PieceInterface } from "../../reducers/game.reducer";
import Piece from "../piece";

import "./styles.scss";

interface SideBarProps {
  pieces: PieceInterface[];
  draggable: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ pieces, draggable }) => {
  return (
    <div className="sidebar-container">
      {pieces.map((piece, index) => (
        <Piece key={piece.id} piece={piece} draggable={draggable} />
      ))}
    </div>
  );
};

export default SideBar;
