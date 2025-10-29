// impoer external type

import { type SquareType } from "../type/type";

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
}: SeTPpointer): void => {
  resetPointer({ square, setSquare });
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
