// import type
import type { SetStateAction } from "react";
import { type SquareType } from "../type/type";

// import rule
import { availableCheckPawn } from "./pawn";
import { avialiableBishopMoveCheck } from "./bishop";
import { availiabelMovisKnightCheck } from "./knight";
import { availableMoveRookCheck } from "./rook";
import { avialableMoveQueenCheck } from "./queen";
import { kingAvailableCheck } from "./king";
import { roadsNutKingCheck } from "./king";
import { findAvailableMovisPawn } from "./pawn";
import { avialiableBishopMove } from "./bishop";
import { availiabelMovisKnight } from "./knight";
import { availableMoveRook } from "./rook";
import { avialableMoveQueen } from "./queen";
// type
interface DepriveSquareForProp {
  square: SquareType[];
  setSquare: React.Dispatch<SetStateAction<SquareType[]>>;
}

interface ResetDepriveSquareForKing {
  square: SquareType[];
  setSquare: React.Dispatch<SetStateAction<SquareType[]>>;
}

interface FindAllMoveNut {
  position: string;
  square: SquareType[];
  player: "black" | "white" | "";
  hasMoved: boolean;
  name: string;
  king: SquareType;
}

export const resetDepriveSquareForKing = ({
  square,
  setSquare,
}: ResetDepriveSquareForKing) => {
  const newSquare: SquareType[] = [];

  square.forEach((square) => {
    square.isCHeckWhite = false;
    square.isCheckBlack = false;
    newSquare.push(square);
  });

  setSquare(newSquare);
};

export const depriveSquareForKing = ({
  square,
  setSquare,
}: DepriveSquareForProp) => {
  resetDepriveSquareForKing({ square, setSquare });

  let nutWhite: SquareType[] = [];
  let nutBlack: SquareType[] = [];

  square.forEach((square) => {
    if (square.player === "black") {
      nutBlack.push(square);
    } else if (square.player === "white") {
      nutWhite.push(square);
    }
  });

  let allMoveWhite: string[] = [];

  nutWhite.forEach((nut) => {
    if (nut.name == "pawn") {
      let findPawnMove = availableCheckPawn({ square, position: nut.position });

      allMoveWhite.push(...findPawnMove);
    }
    if (nut.name == "bishop") {
      let findBishopMove = avialiableBishopMoveCheck({
        square,
        position: nut.position,
      });

      allMoveWhite.push(...findBishopMove);
    }
    if (nut.name == "knight") {
      let findKnightMove = availiabelMovisKnightCheck({
        square,
        position: nut.position,
      });

      allMoveWhite.push(...findKnightMove);
    }
    if (nut.name == "rook") {
      let findRookMove = availableMoveRookCheck({
        square,
        position: nut.position,
      });

      allMoveWhite.push(...findRookMove);
    }

    if (nut.name == "queen") {
      let findQueenMove = avialableMoveQueenCheck({
        square,
        position: nut.position,
      });

      allMoveWhite.push(...findQueenMove);
    }
    if (nut.name == "king") {
      let findKingMove = kingAvailableCheck({
        square,
        position: nut.position,
      });

      allMoveWhite.push(...findKingMove);
    }
  });

  let allMoveWhiteUnique = new Set(allMoveWhite);
  allMoveWhite = [...allMoveWhiteUnique];

  let newSqureWhite: SquareType[] = [];

  square.map((square) => {
    allMoveWhite.forEach((position) => {
      if (square.position == position) {
        square.isCHeckWhite = true;
      }
    });
    newSqureWhite.push(square);
  });

  setSquare(newSqureWhite);

  let allMoveBlack: string[] = [];

  nutBlack.forEach((nut) => {
    if (nut.name == "pawn") {
      let findPawnMove = availableCheckPawn({ square, position: nut.position });

      allMoveBlack.push(...findPawnMove);
    }
    if (nut.name == "bishop") {
      let findBishopMove = avialiableBishopMoveCheck({
        square,
        position: nut.position,
      });

      allMoveBlack.push(...findBishopMove);
    }
    if (nut.name == "knight") {
      let findKnightMove = availiabelMovisKnightCheck({
        square,
        position: nut.position,
      });

      allMoveBlack.push(...findKnightMove);
    }
    if (nut.name == "rook") {
      let findRookMove = availableMoveRookCheck({
        square,
        position: nut.position,
      });

      allMoveBlack.push(...findRookMove);
    }

    if (nut.name == "queen") {
      let findQueenMove = avialableMoveQueenCheck({
        square,
        position: nut.position,
      });

      allMoveBlack.push(...findQueenMove);
    }
    if (nut.name == "king") {
      let findKingMove = kingAvailableCheck({
        square,
        position: nut.position,
      });

      allMoveBlack.push(...findKingMove);
    }
  });

  let allMoveBlackUnique = new Set(allMoveBlack);
  allMoveWhite = [...allMoveBlackUnique];

  let newSqureBlack: SquareType[] = [];

  square.map((square) => {
    allMoveWhite.forEach((position) => {
      if (square.position == position) {
        square.isCheckBlack = true;
      }
    });
    newSqureBlack.push(square);
  });

  setSquare(newSqureBlack);
};

export const findNutMoveRoadsKingCheckAll = ({
  position,
  square,
  player,
  hasMoved,
  name,
  king,
}: FindAllMoveNut) => {
  const roadsnutAll: string[] = roadsNutKingCheck({ square, king });

  const pointerMove: string[] = [];
  switch (name) {
    case "pawn": {
      const pawn = findAvailableMovisPawn({
        square,
        hasMoved,
        player,
        position,
      });

      roadsnutAll.forEach((road) => {
        pawn.forEach((pawn) => {
          if (road == pawn) {
            pointerMove.push(road);
          }
        });
      });
      console.log("pawn", pointerMove);
      break;
    }
    case "bishop": {
      const bishop = avialiableBishopMove({
        square,
        position,
      });
      roadsnutAll.forEach((road) => {
        bishop.forEach((bishop) => {
          if (road == bishop) {
            pointerMove.push(road);
          }
        });
      });
      console.log("bishop", bishop);
      break;
    }
    case "knight": {
      const knight = availiabelMovisKnight({
        square,
        position,
      });
      roadsnutAll.forEach((road) => {
        knight.forEach((knight) => {
          if (road == knight) {
            pointerMove.push(road);
          }
        });
      });
      console.log("knight", pointerMove);
      break;
    }
    case "rook": {
      const rook = availableMoveRook({
        square,
        position,
      });
      roadsnutAll.forEach((road) => {
        rook.forEach((rook) => {
          if (road == rook) {
            pointerMove.push(road);
          }
        });
      });
      console.log("rook", pointerMove);
      break;
    }
    case "queen": {
      const queen = avialableMoveQueen({
        square,
        position,
      });
      roadsnutAll.forEach((road) => {
        queen.forEach((queen) => {
          if (road == queen) {
            pointerMove.push(road);
          }
        });
      });
      console.log("queen", pointerMove);
    }
  }

  return pointerMove;
};
