// import dependency
import React, { type SetStateAction } from "react";

// import type
import { type SquareType } from "../type/type";

// import data
import { col, row } from "../data";

// import roule

import { activeNut, squareEmpty, squarePlayer } from "./shared";

// types

interface AvailableMovePropType {
  position: string;
  square: SquareType[];
  player: "white" | "black" | "";
  hasMoved: boolean;
}

interface FindFrontPropType {
  position: string;
  player: "white" | "black" | "";
  hasMoved: boolean;
}

interface FindLeftPropType {
  position: string;
  player: "white" | "black" | "";
}

interface FindRightPropType {
  position: string;
  player: "white" | "black" | "";
}

interface IsPromotionPropType {
  square: SquareType[];
}


interface PromotionPropType {
  position: string;
  player: "black" | "white" | "";
  nut: React.ReactNode;
  name: string;
  square: SquareType[];
  setSquare: React.Dispatch<SetStateAction<SquareType[]>>;
}

// this function is for find front square move
const findFrontPawn = ({ position, player, hasMoved }: FindFrontPropType): string[] => {
  const postionNumber = Number(position.slice(1));
  const indexPostionNumber =
    col.findIndex((item) => item === postionNumber) + 1;

  const postionChar = String(position.slice(0, 1));
  const indexPostionChar = row.findIndex((item) => item === postionChar) + 1;

  let findPostionCar;
  if (hasMoved) {
    if (player === "black") {
      findPostionCar = row.slice(indexPostionChar - 2, indexPostionChar - 1);
    } else {
      findPostionCar = row.slice(indexPostionChar, indexPostionChar + 1);
    }
  } else {
    if (player === "black") {
      findPostionCar = row.slice(indexPostionChar - 3, indexPostionChar - 1);
    } else {
      findPostionCar = row.slice(indexPostionChar, indexPostionChar + 2);
    }
  }

  let postionFront: string[] = [];

  if (findPostionCar) {
    if (hasMoved) {
      postionFront = [`${findPostionCar[0]}${indexPostionNumber}`];
    } else {
      postionFront = [
        `${findPostionCar[0]}${indexPostionNumber}`,
        `${findPostionCar[1]}${indexPostionNumber}`,
      ];
    }
  } else {
    postionFront = [];
  }

  return postionFront;
};

// this function is for find left square move
const findLeftPawn = ({ position, player }: FindLeftPropType): string[] => {
  const positionNumber = Number(position.slice(1));
  const findIndexCol = col.findIndex((item) => item == positionNumber) + 1;
  const findPostionNumberLeft = col.slice(findIndexCol - 2, findIndexCol - 1);

  const postionChar = String(position.slice(0, 1));
  const findIndexRow = row.findIndex((item) => item === postionChar);
  let findPostionCharLeft;

  if (player == "white") {
    findPostionCharLeft = row.slice(findIndexRow + 1, findIndexRow + 2);
  } else {
    findPostionCharLeft = row.slice(findIndexRow - 1, findIndexRow);
  }

  let findLeft: string[];
  if (findPostionNumberLeft[0]) {
    findLeft = [`${findPostionCharLeft[0]}${findPostionNumberLeft[0]}`];
  } else {
    findLeft = [];
  }

  return findLeft;
};

// this function is for find right square move
const findRightPawn = ({ position, player }: FindRightPropType): string[] => {
  const positionNumber = Number(position.slice(1));
  const findIndexPositionNumber =
    col.findIndex((item) => item === positionNumber) + 1;
  const findPostionNumber = col.slice(
    findIndexPositionNumber,
    findIndexPositionNumber + 1
  );

  const positionCahr = String(position.slice(0, 1));
  const findIndexPositionChar = row.findIndex((item) => item === positionCahr);
  let findePostionChar: string[] = [];

  if (player === "white") {
    findePostionChar = row.slice(
      findIndexPositionChar + 1,
      findIndexPositionChar + 2
    );
  } else {
    findePostionChar = row.slice(
      findIndexPositionChar - 1,
      findIndexPositionChar
    );
  }

  let findRight: string[] = [];

  if (findPostionNumber[0]) {
    findRight = [`${findePostionChar}${findPostionNumber}`];
  } else {
    findRight = [];
  }

  return findRight;
};

// this function is for find squre move
export const findAvailableMovisPawn = ({
  position,
  square,
  player,
  hasMoved,
}: AvailableMovePropType):string[] => {
  let findPointerMove: string[] = [];

  let findSquareLeftPosition = findLeftPawn({ position, player });
  let findeSquareLeft = square.find(
    (item) => item.position == findSquareLeftPosition[0]
  );

  if (player === "black") {
    if (squarePlayer({ player: findeSquareLeft?.player, color: "" })) {
      findPointerMove = [...findPointerMove];
    }
    if (squarePlayer({ player: findeSquareLeft?.player, color: "black" })) {
      findPointerMove = [...findPointerMove];
    }

    if (squarePlayer({ player: findeSquareLeft?.player, color: "white" })) {
      findPointerMove = [...findPointerMove, ...findSquareLeftPosition];
    }
  } else {
    if (squarePlayer({ player: findeSquareLeft?.player, color: "" })) {
      findPointerMove = [...findPointerMove];
    }
    if (squarePlayer({ player: findeSquareLeft?.player, color: "black" })) {
      findPointerMove = [...findPointerMove, ...findSquareLeftPosition];
    }

    if (squarePlayer({ player: findeSquareLeft?.player, color: "white" })) {
      findPointerMove = [...findPointerMove];
    }
  }

  let findSquareFront;
  if (player === "black") {
    findSquareFront = findFrontPawn({
      position,
      player,
      hasMoved,
    }).reverse();
  } else {
    findSquareFront = findFrontPawn({
      position,
      player,
      hasMoved,
    });
  }

  if (findSquareFront.length == 2) {
    if (
      !squareEmpty({ position: findSquareFront[0], square }) &&
      !squareEmpty({ position: findSquareFront[1], square })
    ) {
      findPointerMove = [...findPointerMove, ...findSquareFront];
    } else if (
      !squareEmpty({ position: findSquareFront[0], square }) ||
      squareEmpty({ position: findSquareFront[1], square })
    ) {
      findPointerMove = [...findPointerMove, findSquareFront[0]];
    }
  } else if (!squareEmpty({ position: findSquareFront[0], square })) {
    findPointerMove = [...findPointerMove, ...findSquareFront];
  }

  let findSquareRightPosition = findRightPawn({ position, player });

  let findSquareRight = square.find(
    (item) => item.position === findSquareRightPosition[0]
  );
  if (player === "black") {
    if (squarePlayer({ player: findSquareRight?.player, color: "white" })) {
      findPointerMove = [...findPointerMove, ...findSquareRightPosition];
    }
    if (squarePlayer({ player: findSquareRight?.player, color: "black" })) {
      findPointerMove = [...findPointerMove];
    }
    if (squarePlayer({ player: findSquareRight?.player, color: "" })) {
      findPointerMove = [...findPointerMove];
    }
  } else {
    if (squarePlayer({ player: findSquareRight?.player, color: "white" })) {
      findPointerMove = [...findPointerMove];
    }
    if (squarePlayer({ player: findSquareRight?.player, color: "black" })) {
      findPointerMove = [...findPointerMove, ...findSquareRightPosition];
    }
    if (squarePlayer({ player: findSquareRight?.player, color: "" })) {
      findPointerMove = [...findPointerMove];
    }
  }

  return findPointerMove;
};

// this function is for prob nut in is last square or is not last square
export const isPromotionPawn = ({
  square,
}: IsPromotionPropType): { result: boolean; promotion: SquareType[] } => {
  let promotion: SquareType[] = [];

  let result = square.some((item) => {
    if (item.name == "pawn") {
      if (item.player == "black") {
        const postionNut = String(item.position.slice(0, 1));
        if (postionNut === "A") {
          promotion.push(item);
          return true;
        } else {
          return false;
        }
      }
      if (item.player == "white") {
        const postionNut = String(item.position.slice(0, 1));
        if (postionNut === "H") {
          promotion.push(item);
          return true;
        } else {
          return false;
        }
      }
    }
  });

  return { result, promotion };
};

// this function is for promotion
export const promotionPawn = ({
  position,
  nut,
  player,
  name,
  square,
  setSquare,
}: PromotionPropType): void => {
  const newSquare: SquareType[] = [];

  square.map((item) => {
    if (item.position == position) {
      console.log(position);
      item.nut = nut;
      item.player = player;
      item.name = name;
    }
    newSquare.push(item);
  });
  setSquare(newSquare);
};
