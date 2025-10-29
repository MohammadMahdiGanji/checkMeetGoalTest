// import dependency
import { type JSX, type SetStateAction } from "react";
import ReactDom from "react-dom";

// import type

import { type SquareType } from "../../type/type";

// import icons

import { FaChessRook } from "react-icons/fa6";
import { FaChessKnight } from "react-icons/fa6";
import { FaChessBishop } from "react-icons/fa6";
import { FaChessQueen } from "react-icons/fa6";

// import rule

import { promotionPawn } from "../../rules/pawn";

interface ModlaPromotionType {
  square: SquareType[];
  setSquare: React.Dispatch<SetStateAction<SquareType[]>>;
  isPownPromotion:
    | {
        result: boolean;
        promotion: SquareType[];
      }
    | undefined;
}

export default function ModalPromotion({
  isPownPromotion,
  square,
  setSquare,
}: ModlaPromotionType): JSX.Element {
  if (!isPownPromotion?.result) {
    return <></>;
  }

  const clickHandlerPromotion = (name: string, nut: React.ReactNode) => {
    promotionPawn({
      position: isPownPromotion.promotion[0].position,
      nut,
      player: isPownPromotion.promotion[0].player,
      name,
      square,
      setSquare,
    });
  };

  return ReactDom.createPortal(
    <div className="fixed top-0 bg-[rgba(0,0,0,0.01)] backdrop-blur-sm right-0 left-0 bottom-0 ">
      <div className="h-full w-full flex items-center justify-center">
        <div className=" bg-[rgba(255,255,255,0.2)] p-10 pt-5 rounded-md border-[1px] border-white">
          <h2 className="text-center text-lg font-bold mb-6 text-white">
            Select a piece to promote your pawn.
          </h2>
          <div className="flex gap-2 bg-[rgba(255,255,255,0.01)]">
            <span
              className="text-5xl bg-[#33c8d3] p-3 rounded-2xl shadow-[0px_0px_10px_white]
            cursor-pointer hover:-translate-y-2 transition-all duration-200"
              onClick={() => clickHandlerPromotion("rook", <FaChessRook />)}
            >
              <FaChessRook
                className={`${
                  isPownPromotion.promotion[0].player === "white"
                    ? "text-white"
                    : "text-black"
                }`}
              />
            </span>
            <span
              className="text-5xl bg-[#33c8d3] p-3 rounded-2xl shadow-[0px_0px_10px_white]
            cursor-pointer hover:-translate-y-2 transition-all duration-200"
              onClick={() => clickHandlerPromotion("knight", <FaChessKnight />)}
            >
              <FaChessKnight
                className={`${
                  isPownPromotion.promotion[0].player === "white"
                    ? "text-white"
                    : "text-black"
                }`}
              />
            </span>
            <span
              className="text-5xl bg-[#33c8d3] p-3 rounded-2xl shadow-[0px_0px_10px_white]
            cursor-pointer hover:-translate-y-2 transition-all duration-200"
              onClick={() => clickHandlerPromotion("bishop", <FaChessBishop />)}
            >
              <FaChessBishop
                className={`${
                  isPownPromotion.promotion[0].player === "white"
                    ? "text-white"
                    : "text-black"
                }`}
              />
            </span>
            <span
              className="text-5xl bg-[#33c8d3] p-3 rounded-2xl shadow-[0px_0px_10px_white]
            cursor-pointer hover:-translate-y-2 transition-all duration-200"
              onClick={() => clickHandlerPromotion("queen", <FaChessQueen />)}
            >
              <FaChessQueen
                className={`${
                  isPownPromotion.promotion[0].player === "white"
                    ? "text-white"
                    : "text-black"
                }`}
              />
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal") as HTMLDivElement
  );
}
