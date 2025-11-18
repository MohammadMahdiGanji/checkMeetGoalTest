// import dependency
import React, { useContext, useEffect, useState, type JSX } from "react";

// imort icon
import { FaChessRook } from "react-icons/fa6";
import { FaChessKnight } from "react-icons/fa6";
import { FaChessBishop } from "react-icons/fa6";
import { FaChessQueen } from "react-icons/fa6";
import { FaChessKing } from "react-icons/fa6";
import { FaChessPawn } from "react-icons/fa6";

// import type
import { type SquareType } from "../../type/type";

// import rules
import { isPromotionPawn } from "../../rules/pawn";
import {
  activeNut,
  setPpointer,
  resetPointer,
  avaliableMove,
  moveNut,
} from "../../rules/shared";

// import context
import { ChessContext } from "../../context/chess";

// import component
import ModalPromotion from "../modal/modalPromotion";
// type
interface SquarePropType {
  id: string;
  position: string;
  pointer: boolean;
  name: string;
  nut: React.ReactNode;
  player: "white" | "black" | "";
  hasMoved: boolean;
  active: boolean;
  isCheckBlack: boolean;
  isCHeckWhite: boolean;
}

export default function Square({
  id,
  position,
  pointer,
  name,
  nut,
  player,
  hasMoved,
  active,
  isCheckBlack,
  isCHeckWhite,
}: SquarePropType): JSX.Element {
  const { square, setSquare, setAllCapture } = useContext(ChessContext);

  const [infoPawnPromotion, setInfoPawnPromotion] = useState<{
    result: boolean;
    promotion: SquareType[];
  }>();

  const positionString: string = String(position.slice(0, 1));

  const clickHandlerSquare = () => {
    resetPointer({ square, setSquare });

    if (!pointer == true && name != "") {
      activeNut({ position, setSquare, square });
      setTimeout(() => {
        const pointerMovedAllNut = avaliableMove({
          position,
          square,
          player,
          hasMoved,
          name,
        });

        setPpointer({
          square,
          setSquare,
          pointer: pointerMovedAllNut,
          player,
        });
      }, 0);
    }

    moveNut({
      position,
      setSquare,
      square,
      pointer,
      setAllCapture,
      name,
      player,
    });
    const isPownPromotion = isPromotionPawn({ square });
    if (isPownPromotion) {
      setInfoPawnPromotion(isPownPromotion);
    }
  };

  const dragOverHandler = (event: React.DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
  };

  const dropHandler = (
    event: React.DragEvent<HTMLSpanElement>,
    position: string
  ) => {
    let infoDrop = JSON.parse(event.dataTransfer.getData("infoNut"));

    let newSquare: SquareType[] = [];
    square.forEach((s) => {
      if (s.position == position) {
        s.name = infoDrop.name;
        s.player = infoDrop.player;
      }
      newSquare.push(s);
    });

    setSquare(newSquare);
  };

  return (
    <span
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, position)}
      onClick={clickHandlerSquare}
      className={`w-16 h-16 
      transition-all
      duration-150
     col-span-1     
     bg-[rgba(51,200,211,0.22)]
     flex items-center justify-center
            ${
              name == "king" &&
              player == "black" &&
              isCHeckWhite == true &&
              "bg-[rgba(255,0,0,0.5)]"
            }
       ${
         name == "king" &&
         player == "white" &&
         isCheckBlack == true &&
         "bg-[rgba(255,0,0,0.5)]"
       }
     ${
       name == "king" && isCHeckWhite == true && player == "black"
         ? "bg-[#ff3434a8]"
         : name == "king" && isCheckBlack == true && player == "white"
         ? "bg-[#ff3434]"
         : pointer && name != ""
         ? "bg-[#feb1b167]"
         : ["A", "C", "E", "G"].includes(positionString)
         ? "odd:bg-[rgba(51,200,211,0.49)]"
         : "even:bg-[rgba(51,200,211,0.49)]"
     }
     ${pointer && "cursor-pointer"}
       ${pointer && name != "" && "bg-red-300"} `}
    >
      <span
        className={`text-5xl ${
          player == "white" ? "text-white" : "text-black"
        } ${nut !== "" ? "cursor-pointer" : ""}`}
      >
        {pointer && (
          <span
            className={`w-4 h-4 bg-[rgb(255,0,255)] rounded-full block ${
              pointer && name != "" ? "hidden" : "block"
            }`}
          ></span>
        )}
        {name == "rook" && <FaChessRook />}
        {name == "knight" && <FaChessKnight />}
        {name == "bishop" && <FaChessBishop />}
        {name == "queen" && <FaChessQueen />}
        {name == "king" && <FaChessKing />}
        {name == "pawn" && <FaChessPawn />}
      </span>
      <ModalPromotion
        isPownPromotion={infoPawnPromotion}
        square={square}
        setSquare={setSquare}
      />
    </span>
  );
}
