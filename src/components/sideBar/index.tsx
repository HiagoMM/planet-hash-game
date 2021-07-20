import React from "react";
import { PieceInterface } from "../../reducers/game.reducer";
import Piece from "../piece";

import "./styles.scss";

interface SideBarProps {
  pieces: PieceInterface[];
}

const SideBar: React.FC<SideBarProps> = ({ pieces }) => {
  return (
    <div className="sidebar-container">
      {pieces.map((piece, index) => (
        <Piece key={index} piece={piece} />
      ))}
    </div>
  );
};

export default SideBar;
