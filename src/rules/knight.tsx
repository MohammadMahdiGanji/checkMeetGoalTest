// import type
import { type SquareType } from "../type/type";

// import data
import { row } from "../data";

interface AvailiabelMovisKnight {
  square: SquareType[];
  player: "white" | "black" | "";
}

// this is function for find poiner move knight
export const availiabelMovisKnight = ({
  square,
  player,
}: AvailiabelMovisKnight): string[] => {
  const active = square.find((square) => square.active == true);
  let findMovekNight: string[] = [];

  if (active?.name === "knight") {
    const positionNumber: number = Number(active?.position.slice(1));

    const positionChar = active?.position.slice(0, 1);

    const indexPositonChar = row.findIndex((square) => square === positionChar);
    let findPostionCharFront: string[] = [];

    if (positionChar == "B") {
      findPostionCharFront = row.slice(indexPositonChar - 1, indexPositonChar);
    } else {
      findPostionCharFront = row.slice(indexPositonChar - 2, indexPositonChar);
    }

    const findFrontMove: string[] = [];
    findPostionCharFront.forEach((item, index) => {
      let position: string = "";

      if (positionChar == "B") {
        position = `${findPostionCharFront[0]}${positionNumber + 2}`;
        findFrontMove.push(position);
        position = `${findPostionCharFront[0]}${positionNumber - 2}`;
        findFrontMove.push(position);
      } else {
        if (index % 2 == 0) {
          position = `${findPostionCharFront[0]}${positionNumber + 1}`;
          findFrontMove.push(position);
          position = `${findPostionCharFront[1]}${positionNumber + 2}`;
          findFrontMove.push(position);
        } else {
          position = `${findPostionCharFront[0]}${positionNumber - 1}`;
          findFrontMove.push(position);

          position = `${findPostionCharFront[1]}${positionNumber - 2}`;
          findFrontMove.push(position);
        }
      }
    });
    let findPostionCharBack: string[] = [];

    if (positionChar === "G") {
      console.log(findPostionCharBack)
      findPostionCharBack = row.slice(
        indexPositonChar + 1,
        indexPositonChar + 2
       
      );
    } else {
      findPostionCharBack = row.slice(
        indexPositonChar + 1,
        indexPositonChar + 3
      );
    }

    findPostionCharBack = row.slice(indexPositonChar + 1, indexPositonChar + 3);

    const findBackMove: string[] = [];
    findPostionCharBack.forEach((item, index) => {
      let position: string;
      if (positionChar === "G") {
        position = `${findPostionCharBack[0]}${positionNumber + 2}`;
        findBackMove.push(position);
        position = `${findPostionCharBack[0]}${positionNumber - 2}`;
        findBackMove.push(position);
      
      } else {
        if (index % 2 == 0) {
          position = `${findPostionCharBack[0]}${positionNumber + 2}`;
          findBackMove.push(position);

          position = `${findPostionCharBack[1]}${positionNumber + 1}`;
          findBackMove.push(position);
        } else {
          position = `${findPostionCharBack[0]}${positionNumber - 2}`;
          findBackMove.push(position);

          position = `${findPostionCharBack[1]}${positionNumber - 1}`;
          findBackMove.push(position);
        }
      }
    });

    let findMovekNightConcat = [...findFrontMove, ...findBackMove];
    console.log(findMovekNightConcat);

    findMovekNightConcat.forEach((position) => {
      square.forEach((square) => {
        if (position === square.position) {
          if (player !== square.player) {
            findMovekNight.push(position);
          }
        }
      });
    });
  }
  console.log(findMovekNight);
  return findMovekNight;
};
