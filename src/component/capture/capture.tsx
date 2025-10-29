// imort dependency
import { type JSX} from "react";

// import types
import { type SquareType } from "../../type/type";

// import icons

import { FaChessRook } from "react-icons/fa6";
import { FaChessKnight } from "react-icons/fa6";
import { FaChessBishop } from "react-icons/fa6";
import { FaChessQueen } from "react-icons/fa6";
import { FaChessKing } from "react-icons/fa6";
import { FaChessPawn } from "react-icons/fa6";

export default function Capture({
  position,
  name,
  player,
}: SquareType): JSX.Element {
  let Icon: any;

  switch (name) {
    case "pawn":
      Icon = FaChessPawn;
      break;
    case "rook":
      Icon = FaChessRook;
      break;
    case "knight":
      Icon = FaChessKnight;
      break;
    case "queen":
      Icon = FaChessQueen;
      break;
    case "bishop":
      Icon = FaChessBishop;
      break;
    case "king":
      Icon = FaChessKing;
      break;
  }

  return (
    <>
      <div>
        <span
          className={`text-5xl w-16 h-16 flex items-center shadow-[0px_0px_10px_white]
           justify-center bg-[#33c8d3] rounded-2xl
           col-span-1 row-span-1 ${
             player === "white" ? "text-white" : "text-black"
           }`}
        >
          <Icon />
        </span>
        <span>{position}</span>
      </div>
    </>
  );
}
