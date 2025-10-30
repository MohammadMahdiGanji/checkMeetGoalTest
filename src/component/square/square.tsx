// import dependency
import { useContext, useState, type JSX } from "react";

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

export default function Square({
  id,
  position,
  pointer,
  name,
  nut,
  player,
  captured,
  hasMoved,
  availableMovis,
}: SquareType): JSX.Element {
  const { square, setSquare, setAllCapture } = useContext(ChessContext);

  const [infoPawnPromotion, setInfoPawnPromotion] = useState<{
    result: boolean;
    promotion: SquareType[];
  }>();

  const positionString: string = String(position.slice(0, 1));

  const clickHandlerSquare = () => {
    {
      /*
    *********************************
    -----------start pawn------------
    *********************************
  */
    }
    resetPointer({ square, setSquare });

    // this section of the nut is all

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
    {
      /*
    *********************************
    ------------end pawn-------------
    *********************************
  */
    }
  };

  return (
    <span
      onClick={clickHandlerSquare}
      className={`w-16 h-16 
      transition-all
      duration-150
     col-span-1     
     bg-[#b5dcf4b1]
     flex items-center justify-center
     ${
       ["A", "C", "E", "G"].includes(positionString)
         ? ` ${pointer && name != "" ? "bg-red-300" : "odd:bg-[#3396D3]"}`
         : `${pointer && name != "" ? "bg-red-300" : "even:bg-[#3396D3] "}`
     }
     ${pointer && "cursor-pointer"}
       ${pointer && name != "" && "bg-red-300"}`}
    >
      <span
        className={`text-5xl ${
          player == "white" ? "text-[#FFECC0]" : "text-black"
        } ${nut !== "" ? "cursor-pointer" : ""}`}
      >
        {pointer && (
          <span
            className={`w-4 h-4 bg-purple-400 rounded-full block ${
              pointer && name != "" ? "hidden" : "block"
            }`}
          ></span>
        )}
        {nut}
      </span>
      <ModalPromotion
        isPownPromotion={infoPawnPromotion}
        square={square}
        setSquare={setSquare}
      />
    </span>
  );
}
