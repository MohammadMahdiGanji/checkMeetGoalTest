// import type
import { type SquareType } from "../type/type";

// import data
import { row } from "../data";
import { avialableMoveQueen } from "./queen";

// import rule
import { availableCheckPawn } from "./pawn";
import { availiabelMovisKnight } from "./knight";
import { availableMoveRook } from "./rook";
import { avialiableBishopMove } from "./bishop";

interface KingAvailableProp {
  square: SquareType[];
  position: String;
}

interface CheckKing {
  king: SquareType;
}

interface RoadsNutKingCheckProp {
  square: SquareType[];
  king: SquareType;
}

interface CheckMove {
  square: SquareType[];
  king: SquareType;
}

export const kingAvailable = ({ square, position }: KingAvailableProp) => {
  const active = square.find((square) => square.position == position);

  const positionNumber = Number(active?.position.slice(1));
  const positionChar = String(active?.position.slice(0, 1));

  const indexPorsionChar = row.findIndex((row) => row == positionChar);

  const postionCharKing: string[] = [];

  postionCharKing.push(...row.slice(indexPorsionChar - 1, indexPorsionChar));
  postionCharKing.push(...row.slice(indexPorsionChar, indexPorsionChar + 2));

  let findPpostionKing: string[] = [];

  postionCharKing.forEach((char) => {
    if (char == positionChar) {
      findPpostionKing.push(`${char}${positionNumber + 1}`);
      findPpostionKing.push(`${char}${positionNumber - 1}`);
    } else {
      findPpostionKing.push(`${char}${positionNumber + 1}`);
      findPpostionKing.push(`${char}${positionNumber}`);
      findPpostionKing.push(`${char}${positionNumber - 1}`);
    }
  });

  let positionKing: string[] = [];

  findPpostionKing.map((position) => {
    square.map((square) => {
      if (square.position == position) {
        if (active?.player == "white") {
          if (square.isCheckBlack == false) {
            if (square.name == "" || square.player != active?.player) {
              positionKing.push(position);
            }
          }
        } else if (active?.player == "black") {
          if (square.isCHeckWhite == false) {
            if (square.name == "" || square.player != active?.player) {
              positionKing.push(position);
            }
          }
        }
      }
    });
  });

  return positionKing;
};

export const kingAvailableCheck = ({ square, position }: KingAvailableProp) => {
  const active = square.find((square) => square.position == position);

  const positionNumber = Number(active?.position.slice(1));
  const positionChar = String(active?.position.slice(0, 1));

  const indexPorsionChar = row.findIndex((row) => row == positionChar);

  const postionCharKing: string[] = [];

  postionCharKing.push(...row.slice(indexPorsionChar - 1, indexPorsionChar));
  postionCharKing.push(...row.slice(indexPorsionChar, indexPorsionChar + 2));

  let findPpostionKing: string[] = [];

  postionCharKing.forEach((char) => {
    if (char == positionChar) {
      findPpostionKing.push(`${char}${positionNumber + 1}`);
      findPpostionKing.push(`${char}${positionNumber - 1}`);
    } else {
      findPpostionKing.push(`${char}${positionNumber + 1}`);
      findPpostionKing.push(`${char}${positionNumber}`);
      findPpostionKing.push(`${char}${positionNumber - 1}`);
    }
  });

  let positionKing: string[] = [];

  findPpostionKing.map((position) => {
    square.map((square) => {
      if (square.position == position) {
        if (active?.player == "white") {
          if (square.isCheckBlack == false) {
            positionKing.push(position);
          }
        } else if (active?.player == "black") {
          if (square.isCHeckWhite == false) {
            positionKing.push(position);
          }
        }
      }
    });
  });

  return positionKing;
};

export const checkKing = ({ king }: CheckKing) => {
  let result: boolean = false;

  if (king.player == "white") {
    if (king.isCheckBlack == true) {
      result = true;
    } else {
      result = false;
    }
  } else {
    if (king.isCHeckWhite == true) {
      result = true;
    } else {
      result = false;
    }
  }

  return result;
};

export const checkMove = ({ square, king }: CheckMove) => {
  const nutCheckKing: SquareType[] = [];

  if (king.player === "black") {
    const activeKing = square.find(
      (square) => square.name == "king" && square.player == "black"
    );

    let pwan: SquareType[] = square.filter(
      (square) => square.name === "pawn" && square.player == "white"
    );

    let findPown: string[] = [];

    pwan.forEach((pawn) => {
      findPown.push(...availableCheckPawn({ square, position: pawn.position }));
    });

    pwan.forEach((pawn) => {
      let move = availableCheckPawn({ square, position: pawn.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(pawn);
        }
      });
    });

    // end pawn

    // start knght
    let knight: SquareType[] = square.filter(
      (square) => square.name === "knight" && square.player === "white"
    );

    let findKnight: string[] = [];

    knight.forEach((knight) => {
      findKnight.push(
        ...availiabelMovisKnight({ square, position: knight.position })
      );
    });
    knight.forEach((knigh) => {
      let move = availiabelMovisKnight({ square, position: knigh.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(knigh);
        }
      });
    });
    // end knght

    let rook: SquareType[] = square.filter(
      (square) => square.name == "rook" && square.player === "white"
    );

    let findRook: string[] = [];

    rook.forEach((rook) => {
      findRook.push(...availableMoveRook({ square, position: rook.position }));
    });

    rook.forEach((rook) => {
      let move = availableMoveRook({ square, position: rook.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(rook);
        }
      });
    });

    let bishop: SquareType[] = square.filter(
      (square) => square.name === "bishop" && square.player === "white"
    );

    const findBishop: string[] = [];

    bishop.forEach((bishop) => {
      findBishop.push(
        ...avialiableBishopMove({ square, position: bishop.position })
      );
    });
    bishop.forEach((bishop) => {
      let move = avialiableBishopMove({ square, position: bishop.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(bishop);
        }
      });
    });

    let queen: SquareType[] = square.filter(
      (square) => square.name === "queen" && square.player === "white"
    );

    let findQueen: string[] = [];

    queen.forEach((queen) => {
      findQueen.push(
        ...avialableMoveQueen({ square, position: queen.position })
      );
    });

    queen.forEach((queen) => {
      let move = avialableMoveQueen({ square, position: queen.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(queen);
        }
      });
    });
  } else {
    const activeKing = square.find(
      (square) => square.name == "king" && square.player == "white"
    );

    let pwan: SquareType[] = square.filter(
      (square) => square.name === "pawn" && square.player == "black"
    );

    let findPown: string[] = [];

    pwan.forEach((pawn) => {
      findPown.push(...availableCheckPawn({ square, position: pawn.position }));
    });

    pwan.forEach((pawn) => {
      let move = availableCheckPawn({ square, position: pawn.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(pawn);
        }
      });
    });

    // end pawn

    // start knght
    let knight: SquareType[] = square.filter(
      (square) => square.name === "knight" && square.player === "black"
    );

    let findKnight: string[] = [];

    knight.forEach((knight) => {
      findKnight.push(
        ...availiabelMovisKnight({ square, position: knight.position })
      );
    });
    knight.forEach((knigh) => {
      let move = availiabelMovisKnight({ square, position: knigh.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(knigh);
        }
      });
    });
    // end knght

    let rook: SquareType[] = square.filter(
      (square) => square.name == "rook" && square.player === "black"
    );

    let findRook: string[] = [];

    rook.forEach((rook) => {
      findRook.push(...availableMoveRook({ square, position: rook.position }));
    });

    rook.forEach((rook) => {
      let move = availableMoveRook({ square, position: rook.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(rook);
        }
      });
    });

    let bishop: SquareType[] = square.filter(
      (square) => square.name === "bishop" && square.player === "black"
    );

    const findBishop: string[] = [];

    bishop.forEach((bishop) => {
      findBishop.push(
        ...avialiableBishopMove({ square, position: bishop.position })
      );
    });
    bishop.forEach((bishop) => {
      let move = avialiableBishopMove({ square, position: bishop.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(bishop);
        }
      });
    });

    let queen: SquareType[] = square.filter(
      (square) => square.name === "queen" && square.player === "black"
    );

    let findQueen: string[] = [];

    queen.forEach((queen) => {
      findQueen.push(
        ...avialableMoveQueen({ square, position: queen.position })
      );
    });

    queen.forEach((queen) => {
      let move = avialableMoveQueen({ square, position: queen.position });
      move.forEach((position) => {
        if (position == activeKing?.position) {
          nutCheckKing.push(queen);
        }
      });
    });
  }

  return nutCheckKing;
};

export const roadsNutKingCheck = ({ square, king }: RoadsNutKingCheckProp) => {
  const nut = checkMove({ square, king });

  const allRoadsNut: string[] = [];

  let roadsMoveKing: string[] = [];

  const positionNumberKing = Number(king?.position.slice(1));
  nut.forEach((nut) => {
    switch (nut.name) {
      case "pawn":
        roadsMoveKing.push(nut.position);
        break;
      case "knight":
        roadsMoveKing.push(nut.position);
        break;
      case "bishop":
        allRoadsNut.push(
          ...avialiableBishopMove({ square, position: nut.position })
        );
        const allRoadsNutReverseBishop = [...allRoadsNut].reverse();

        allRoadsNutReverseBishop.push(nut.position);
        const positionNumberBishop = Number(nut.position.slice(1));

        const positionEndSliceBishop = Math.abs(
          positionNumberKing - positionNumberBishop
        );
        const indexKingBishop = allRoadsNutReverseBishop.findIndex(
          (position) => position == king?.position
        );

        let findEarlyRoadsKingCheckBishop = allRoadsNutReverseBishop.slice(
          indexKingBishop,
          indexKingBishop + positionEndSliceBishop
        );
        findEarlyRoadsKingCheckBishop.push(nut.position);

        let ReadsKingCheck = findEarlyRoadsKingCheckBishop.filter(
          (position) => position != king?.position
        );

        roadsMoveKing.push(...ReadsKingCheck);

        break;
      case "queen":
        allRoadsNut.push(
          ...avialableMoveQueen({ square, position: nut.position })
        );
        const positionNumberKingQueen = Number(king?.position.slice(1));
        const positionNumberNutQueen = Number(nut?.position.slice(1));

        const positionCharKingQueen = String(king?.position.slice(0, 1));
        const positionCharNutQueen = String(nut.position.slice(0, 1));
        if (positionNumberKingQueen && positionNumberNutQueen) {
          if (positionCharKingQueen != positionCharNutQueen) {
            const allRoadsNutReverseQueen = [...allRoadsNut].reverse();

            allRoadsNutReverseQueen.push(nut.position);
            const positionNumberQueen = Number(nut.position.slice(1));

            const positionEndSliceQueen = Math.abs(
              positionNumberKing - positionNumberQueen
            );
            const indexKingQueen = allRoadsNutReverseQueen.findIndex(
              (position) => position == king?.position
            );

            let findEarlyRoadsKingCheckQueen = allRoadsNutReverseQueen.slice(
              indexKingQueen,
              indexKingQueen + positionEndSliceQueen
            );
            findEarlyRoadsKingCheckQueen.push(nut.position);

            let ReadsKingCheckQueen = findEarlyRoadsKingCheckQueen.filter(
              (position) => position != king?.position
            );

            roadsMoveKing.push(...ReadsKingCheckQueen);
          }
          if (
            positionNumberKingQueen == positionNumberNutQueen ||
            positionCharKingQueen == positionCharNutQueen
          ) {
            allRoadsNut.push(
              ...avialableMoveQueen({ square, position: nut.position })
            );
            const findIndexCharKingQueen = row.findIndex(
              (row) => row == positionCharKingQueen
            );
            const findIndexCharNutQueen = row.findIndex(
              (row) => row == positionCharNutQueen
            );

            const findIndexKingQueen = allRoadsNut.findIndex(
              (postion) => postion == king?.position
            );
            const lastIndexSliceQueen = Math.abs(
              findIndexCharKingQueen - findIndexCharNutQueen
            );
            // back
            if (findIndexCharKingQueen > findIndexCharNutQueen) {
              roadsMoveKing.push(
                ...allRoadsNut.slice(
                  findIndexKingQueen + 1,
                  lastIndexSliceQueen + 1
                )
              );
              roadsMoveKing.push(nut.position);
              // front
            } else if (findIndexCharKingQueen < findIndexCharNutQueen) {
              roadsMoveKing.push(...allRoadsNut.slice(0, findIndexKingQueen));
              roadsMoveKing.push(nut.position);
            } else if (positionNumberKing > positionNumberNutQueen) {
              const startSlice =
                Math.abs(positionNumberKing - positionNumberNutQueen) - 1;
              roadsMoveKing.push(
                ...allRoadsNut.slice(
                  findIndexKingQueen - startSlice,
                  findIndexKingQueen
                )
              );
              roadsMoveKing.push(nut.position);
            } else if (positionNumberKing < positionNumberNutQueen) {
              const endSliceLeftQueen = Math.abs(
                positionNumberKing - positionNumberNutQueen
              );
              roadsMoveKing.push(
                ...allRoadsNut.slice(
                  findIndexKingQueen + 1,
                  findIndexKingQueen + endSliceLeftQueen
                )
              );
              roadsMoveKing.push(nut.position);
            }
          }
        }

        break;
      case "rook":
        allRoadsNut.push(
          ...availableMoveRook({ square, position: nut.position })
        );

        const positionCharKingRook = String(king?.position.slice(0, 1));
        const positionCharNutRook = String(nut.position.slice(0, 1));

        const positionNumberNutRook = Number(nut?.position.slice(1));
        const findIndexCharKingRook = row.findIndex(
          (row) => row == positionCharKingRook
        );
        const findIndexCharNutRook = row.findIndex(
          (row) => row == positionCharNutRook
        );

        const findIndexKingRook = allRoadsNut.findIndex(
          (postion) => postion == king?.position
        );
        const lastIndexSliceRook = Math.abs(
          findIndexCharKingRook - findIndexCharNutRook
        );
        // back
        if (findIndexCharKingRook > findIndexCharNutRook) {
          roadsMoveKing.push(
            ...allRoadsNut.slice(findIndexKingRook + 1, lastIndexSliceRook + 1)
          );

          roadsMoveKing.push(nut.position);
          // front
        } else if (findIndexCharKingRook < findIndexCharNutRook) {
          roadsMoveKing.push(...allRoadsNut.slice(0, findIndexKingRook));
          roadsMoveKing.push(nut.position);
        } else if (positionNumberKing > positionNumberNutRook) {
          const startSlice =
            Math.abs(positionNumberKing - positionNumberNutRook) - 1;
          roadsMoveKing.push(
            ...allRoadsNut.slice(
              findIndexKingRook - startSlice,
              findIndexKingRook
            )
          );
          roadsMoveKing.push(nut.position);
        } else if (positionNumberKing < positionNumberNutRook) {
          const endSliceLeft = Math.abs(
            positionNumberKing - positionNumberNutRook
          );
          roadsMoveKing.push(
            ...allRoadsNut.slice(
              findIndexKingRook + 1,
              findIndexKingRook + endSliceLeft
            )
          );
          roadsMoveKing.push(nut.position);
        }

        break;
    }
  });

  const uniqueRoadsMoveKingSet = new Set(roadsMoveKing);
  const uniqueRoadsMoveKingArray = [...uniqueRoadsMoveKingSet];

  return uniqueRoadsMoveKingArray;
};
