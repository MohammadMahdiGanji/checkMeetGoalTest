// impoer external type

import { type SquareType } from "../type/type";

// import rule
import { avialiableBishopMove } from "./bishop";
import { availiabelMovisKnight } from "./knight";
import { findAvailableMovisPawn } from "./pawn";
import { avialableMoveQueen } from "./queen";
import { availableMoveRook } from "./rook";
import { kingAvailable } from "./king";

// types this file

// type function for is activate nut
interface ActiveNutType {
  position: string;
  square: SquareType[];
  setSquare: React.Dispatch<React.SetStateAction<SquareType[]>>;
}

// this type is for set pointer function
interface SeTPpointer {
  square: SquareType[];
  setSquare: React.Dispatch<React.SetStateAction<SquareType[]>>;
  pointer: string[];
  player: "white" | "black" | "";
}

// type prop function reset pointer
interface ResetPointer {
  square: SquareType[];
  setSquare: React.Dispatch<React.SetStateAction<SquareType[]>>;
}

// type prop function square empty
interface squareEmptyType {
  position: string;
  square: SquareType[];
}

// type prop function squate player
interface SquarePlayerType {
  player: "white" | "black" | "" | undefined;
  color: "white" | "black" | "";
}

interface AvaliablemovePropType {
  position: string;
  square: SquareType[];
  player: "black" | "white" | "";
  hasMoved: boolean;
  name: string;
}

interface MoveNutPropType {
  square: SquareType[];
  position: string;
  setSquare: React.Dispatch<React.SetStateAction<SquareType[]>>;
  pointer: boolean;
  name: string;
  setAllCapture: React.Dispatch<React.SetStateAction<SquareType[]>>;
  player: string;
}

// this function for is activate nut
export const activeNut = ({
  position,
  setSquare,
  square,
}: ActiveNutType): void => {
  const newSquare: SquareType[] = [];

  square.map((item) => {
    if (item.name != "") {
      if (position == item.position) {
        item.active = true;
      }
    }
    newSquare.push(item);
  });
  setSquare(newSquare);
};

// this function is for set pointer
export const setPpointer = ({
  square,
  setSquare,
  pointer,
  player,
}: SeTPpointer): void => {
  resetPointer({ square, setSquare });

  if (player == "white") {
    let newSquare: SquareType[] = [];
    square.map((item) => {
      pointer.map((i) => {
        if (i === item.position) {
          item.pointer = true;
        }
      });
      newSquare.push(item);
    });
    setSquare(newSquare);
  }

  if (player == "black") {
    let newSquare: SquareType[] = [];
    square.map((item) => {
      pointer.map((i) => {
        if (i === item.position) {
          item.pointer = true;
        }
      });
      newSquare.push(item);
    });
    setSquare(newSquare);
  }
};

// this function is for reste pointer
export const resetPointer = ({ square, setSquare }: ResetPointer): void => {
  const newSquare: SquareType[] = [];

  square.map((item) => {
    item.pointer = false;
    newSquare.push(item);
  });

  setSquare(newSquare);
};

// this fucntion is prob is empty squar
export const squareEmpty = ({ position, square }: squareEmptyType): boolean => {
  const findSquare = square.find((item) => item.position == position);

  if (findSquare?.name === "") {
    return false;
  } else {
    return true;
  }
};

// this fucntion is prob is player
export const squarePlayer = ({ player, color }: SquarePlayerType): boolean => {
  if (player === color) {
    return true;
  } else {
    return false;
  }
};

export const avaliableMove = ({
  position,
  square,
  player,
  hasMoved,
  name,
}: AvaliablemovePropType) => {
  let avaliableMove: string[] = [];
  switch (name) {
    case "pawn":
      avaliableMove = findAvailableMovisPawn({
        position,
        square,
        player,
        hasMoved,
      });
      break;
    case "knight":
      avaliableMove = availiabelMovisKnight({ square, position });
      break;
    case "rook":
      avaliableMove = availableMoveRook({ square, position });
      break;
    case "bishop":
      avaliableMove = avialiableBishopMove({ square, position });
      break;
    case "queen":
      avaliableMove = avialableMoveQueen({ square, position });
      break;
    case "king":
      avaliableMove = kingAvailable({ square, position });
  }
  return avaliableMove;
};

// this function is for move nut
export const moveNut = ({
  position,
  setSquare,
  square,
  pointer,
  player,
  name,
  setAllCapture,
}: MoveNutPropType): void => {
  const active = square.find((item) => item.active === true);

  const activePostion = active?.position;
  const playerColor = active?.player;

  let updateActive: SquareType[] = [];

  square.map((item) => {
    item.active = false;
    updateActive.push(item);
  });

  setSquare(updateActive);
  if (!pointer == true && name != "") {
    activeNut({ position, setSquare, square });
  }

  const newSquare: SquareType[] = [];

  if (active?.position) {
    if (pointer) {
      square.map((item) => {
        if (item.position === position) {
          if (player !== "" && pointer === true) {
            const capture = JSON.parse(JSON.stringify(item));
            setAllCapture((pre) => [...pre, capture]);
          }
          if (playerColor === "black") {
            item.name = active.name;
            item.nut = active.nut;
            item.hasMoved = true;
            item.player = playerColor;
          } else if (playerColor === "white") {
            item.name = active.name;
            item.nut = active.nut;
            item.hasMoved = true;
            item.player = playerColor;
          }
        }
        item.active = false;
        newSquare.push(item);
      });

      square.map((item) => {
        if (item.position === activePostion) {
          item.name = "";
          item.nut = "";
          item.hasMoved = true;
          item.player = "";
        }
      });

      setSquare(newSquare);
    }
  }
};

export const devpriveMoveKing = () => {};
