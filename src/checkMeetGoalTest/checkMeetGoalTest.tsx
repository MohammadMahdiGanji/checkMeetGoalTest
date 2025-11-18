// import type
import { type SquareType } from "../type/type";

// impor rule
import { checkKing } from "../rules/king";
import { findNutMoveRoadsKingCheckAll } from "../rules/check";
import { kingAvailable } from "../rules/king";

interface CheckMeetGoalTestProp {
  square: SquareType[];
}

export function checkMeetGoalTest({ square }: CheckMeetGoalTestProp) {
  let kings = square.filter((square) => square.name == "king");

  let result: {
    checkMeetWhite: boolean;
    checkMeetBlack: boolean;
  } = {
    checkMeetWhite: false,
    checkMeetBlack: false,
  };

  kings.forEach((king) => {
    if (king.player == "white") {
      let checkWhite = checkKing({ king });
      let defiendMoveWhite: string[] = [];

      square.forEach((s) => {
        if (s.player == "white") {
          if (s.name == "pawn") {
            defiendMoveWhite.push(
              ...findNutMoveRoadsKingCheckAll({
                square,
                king,
                position: s.position,
                player: s.player,
                name: s.name,
                hasMoved: s.hasMoved,
              })
            );
          } else {
            defiendMoveWhite.push(
              ...findNutMoveRoadsKingCheckAll({
                square,
                king,
                position: s.position,
                player: s.player,
                name: s.name,
                hasMoved: true,
              })
            );
          }
        }
      });

      let moveKingWhite = kingAvailable({ square, position: king.position });
      if (
        checkWhite == true &&
        defiendMoveWhite.length == 0 &&
        moveKingWhite.length == 0
      ) {
        result.checkMeetWhite = true;
      } else {
        result.checkMeetWhite = false;
      }
    } else {
      let checkBlack = checkKing({ king });
      let defiendMoveBlack: string[] = [];

      square.forEach((s) => {
        if (s.player == "black") {
          if (s.name == "pawn") {
            defiendMoveBlack.push(
              ...findNutMoveRoadsKingCheckAll({
                square,
                king,
                position: s.position,
                player: s.player,
                name: s.name,
                hasMoved: s.hasMoved,
              })
            );
          } else {
            defiendMoveBlack.push(
              ...findNutMoveRoadsKingCheckAll({
                square,
                king,
                position: s.position,
                player: s.player,
                name: s.name,
                hasMoved: true,
              })
            );
          }
        }
      });

      let moveKingBlack = kingAvailable({ square, position: king.position });
      if (
        checkBlack == true &&
        defiendMoveBlack.length == 0 &&
        moveKingBlack.length == 0
      ) {
        result.checkMeetBlack = true;
      } else {
        result.checkMeetBlack = false;
      }
    }
  });

  return result;
}
