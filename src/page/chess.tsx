// import dependency
import React, { useContext, useEffect, useState, type JSX } from "react";

//import icons
import { AiFillLike } from "react-icons/ai";

// import compoenent
import Square from "../component/square/square";
import Capture from "../component/capture/capture";

// import context
import { ChessContext } from "../context/chess";

// import rule
import { depriveSquareForKing } from "../rules/check";
import { checkKing } from "../rules/king";
import { findNutMoveRoadsKingCheckAll } from "../rules/check";
import { checkMeetGoalTest } from "../checkMeetGoalTest/checkMeetGoalTest";
import Swal from "sweetalert2";

// import data
import { initailSquare } from "../data";

export default function Chess(): JSX.Element {
  const { square, allCapture, setSquare } = useContext(ChessContext);
  const [checkMeet, setCheckMeet] = useState<{
    checkMeetWhite: boolean;
    checkMeetBlack: boolean;
  }>();

  const clickHandler = () => {
    depriveSquareForKing({ setSquare, square });

    let infoCheckMeet = checkMeetGoalTest({ square });
    setCheckMeet(infoCheckMeet);

    if (infoCheckMeet.checkMeetWhite) {
      Swal.fire({
        icon: "success",
        title: "checkmeet player white",
      });
    }
    if (infoCheckMeet.checkMeetBlack) {
      Swal.fire({
        icon: "success",
        title: "checkmeet player black",
      });
    }
  };

  const dragStartHandler = (
    event: React.DragEvent<HTMLSpanElement>,
    nut: {
      position: string;
      nut: React.ReactNode;
      name: string;
      player: "white" | "black" | "";
    }
  ) => {
    event.dataTransfer.setData("infoNut", JSON.stringify(nut));
  };

  return (
    <div
      className="flex gap-10 h-screen w-full bg-black
     items-center justify-center relative overflow-hidden"
    >
      <div
        className={`self-start mt-24 grid "grid-rows-8 gap-5 grid-cols-3 mr-[700px] relative z-30`}
      >
        {allCapture.map((capture, index) => {
          if (capture.player == "white") {
            return <Capture key={`${capture.id}${index}`} {...capture} />;
          }
        })}
      </div>
      <div
        className="p-4rounded-xl shadow-[0px_0px_10px_rgb(255,255,255,1)] fixed border-[40px] z-50
      border-[rgba(255,255,255,0.01)] rounded-xl backdrop-blur-lg"
      >
        <div className="grid grid-cols-8 shadow-[0px_0px_10px_rgb(255,255,255,0.8)] rounded-xl overflow-hidden">
          {square.map((s) => (
            <Square
              key={`${s.id}-${s.position}-${s.player}-${s.name}`}
              {...s}
            />
          ))}
        </div>
      </div>

      <div
        className={`self-start mt-24 grid "grid-rows-8 gap-5 grid-cols-3 relative z-30`}
      >
        {allCapture.map((capture, index) => {
          if (capture.player == "black") {
            return (
              <Capture
                key={`${capture.position}${capture.name}${index}`}
                {...capture}
              />
            );
          }
        })}
      </div>

      <div className="absolute top-5 w-[200px] h-[200px]  z-0 bg-[#8dd716] left-5 rounded-full"></div>
      <div
        className="absolute top-15 w-[200px]
       h-[200px] z-10 bg-[rgba(255,255,255,0.1)]  left-20 rounded-full backdrop-blur-lg"
      ></div>
      <div
        className="absolute top-32 w-[200px]
       h-[200px] z-20 bg-[rgba(255,255,255,0.1)]  left-32 rounded-full backdrop-blur-md"
      ></div>

      <div className="absolute top-5 w-[200px] h-[200px]  z-0 bg-[#d1d716] right-5 rounded-full"></div>
      <div
        className="absolute top-15 w-[200px]
       h-[200px] z-20 bg-[rgba(255,255,255,0.1)]  right-20 rounded-full backdrop-blur-lg"
      ></div>
      <div
        className="absolute top-32 w-[200px]
       h-[200px] z-20 bg-[rgba(255,255,255,0.1)]  right-32 rounded-full backdrop-blur-md"
      ></div>

      <div className="absolute bottom-5 w-[200px] h-[200px]  z-0 bg-[#00f7ff] right-5 rounded-full"></div>
      <div
        className="absolute bottom-15 w-[200px]
       h-[200px] z-10 bg-[rgba(255,255,255,0.1)]  right-20 rounded-full backdrop-blur-lg"
      ></div>

      <div
        className="absolute bottom-32 w-[200px]
       h-[200px] z-20 bg-[rgba(255,255,255,0.1)]  right-32 rounded-full backdrop-blur-md"
      ></div>
      <div className="absolute bottom-5 w-[200px] h-[200px]  z-0 bg-[#16d7b7] left-5 rounded-full"></div>
      <div
        className="absolute bottom-15 w-[200px]
       h-[200px] z-10 bg-[rgba(255,255,255,0.1)]  left-20 rounded-full backdrop-blur-lg"
      ></div>
      <div
        className="absolute bottom-32 w-[200px]
       h-[200px] z-20 bg-[rgba(255,255,255,0.1)]  left-32 rounded-full backdrop-blur-md"
      ></div>
      <div
        className="absolute w-[200px]
       h-[200px] z-10 bg-[rgb(255,100,149)] right-[400px] top-[10px]  -z-10 rounded-full "
      ></div>

      <div
        className="absolute w-[150px]
       h-[150px] z-10 bg-[rgb(107,207,89)] left-[400px] top-[20px] rotate-12  -z-10 rounded-2xl"
      ></div>

      <div
        className="absolute w-[150px]
       h-[150px] z-10 bg-[rgb(239,239,23)] right-[430px] bottom-[40px] -rotate-12  -z-10 rounded-2xl "
      ></div>

      <div
        className="absolute w-[200px]
       h-[200px] z-10 bg-[rgb(255,0,106)] left-[400px] bottom-[20px]  -z-10 rounded-full "
      ></div>
      <div
        className="absolute w-[150px]
       h-[150px] z-10 bg-[rgb(255,111,0)] right-[430px] bottom-[280px] rotate-24  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[150px] z-10 bg-[rgb(91,137,255)] left-[430px] bottom-[280px] rotate-24  -z-10 rounded-3xl "
      ></div>

      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] top-[50px] rotate-45  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] top-[50px] -rotate-45  -z-10 rounded-3xl "
      ></div>

      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] bottom-[50px] rotate-45  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] bottom-[50px] -rotate-45  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] left-[200px]   -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] left-[200px] rotate-90  -z-10 rounded-3xl "
      ></div>

      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] right-[200px]   -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,255)] right-[200px] rotate-90  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,200)]  right-[-80px] -rotate-24  -z-10 rounded-3xl mb-26"
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(0,255,106)] right-[-70px] -rotate-24  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(0,166,255)] right-[-60px] -rotate-24  -z-10 rounded-3xl mt-26"
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(255,0,200)]  left-[-100px] -rotate-24  -z-10 rounded-3xl mb-20"
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(0,255,106)] left-[-80px] -rotate-24  -z-10 rounded-3xl "
      ></div>
      <div
        className="absolute w-[150px]
       h-[30px] z-10 bg-[rgb(0,166,255)] left-[-60px] -rotate-24  -z-10 rounded-3xl mt-20"
      ></div>

      <div className="w-[100px] absolute z-20 h-[150px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm right-[-70px] rounded-full"></div>
      <div className="w-[100px] absolute z-20 h-[150px] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm left-[-70px] rounded-full"></div>
      <span
        className={`fixed top-10 right-10 transition-all duration-300  z-100 `}
      >
        <AiFillLike
          className={`transition-all duration-300 text-white text-8xl ${
            checkMeet?.checkMeetBlack || checkMeet?.checkMeetWhite
              ? "rotate-0"
              : "rotate-180"
          }`}
        />
      </span>

      <span
        className={`fixed top-10 left-10 transition-all duration-300  z-100 
         `}
      >
        <AiFillLike
          className={`transition-all duration-300 text-white text-8xl ${
            checkMeet?.checkMeetBlack || checkMeet?.checkMeetWhite
              ? "rotate-0"
              : "rotate-180"
          }`}
        />
      </span>
      <span
        className={`fixed bottom-10 left-10 transition-all duration-300  z-100 `}
      >
        <AiFillLike
          className={`transition-all duration-300 text-white text-8xl ${
            checkMeet?.checkMeetBlack || checkMeet?.checkMeetWhite
              ? "rotate-0"
              : "rotate-180"
          }`}
        />
      </span>

      <span
        className={`fixed bottom-10 right-10 transition-all duration-300  z-100 `}
      >
        <AiFillLike
          className={`transition-all duration-300 text-white text-8xl ${
            checkMeet?.checkMeetBlack || checkMeet?.checkMeetWhite
              ? "rotate-0"
              : "rotate-180"
          }`}
        />
      </span>
      <div
        className="fixed top-0 bottom-0 left-0 w-[100px] z-90
       bg-[rgba(255,255,255,0.23)] backdrop-blur-xl border-r-[1px] border-white
       flex flex-col items-center justify-center gap-5"
      >
        {initailSquare.map(
          (nut) =>
            nut.player == "white" && (
              <span
                draggable={true}
                onDragStart={(event) => dragStartHandler(event, nut)}
                className="text-white text-5xl cursor-pointer"
              >
                {nut.nut}
              </span>
            )
        )}
      </div>
      <div
        className="fixed top-0 bottom-0 right-0 w-[100px] z-90
       bg-[rgba(255,255,255,0.23)] backdrop-blur-xl border-l-[1px] border-white
       flex flex-col items-center justify-center gap-5"
      >
        {initailSquare.map(
          (nut) =>
            nut.player == "black" && (
              <span
                className="text-black text-5xl cursor-pointer"
                draggable={true}
                onDragStart={(event) => dragStartHandler(event, nut)}
              >
                {nut.nut}
              </span>
            )
        )}
      </div>
      <button
        onClick={clickHandler}
        className="fixed top-84  left-60 text-white bg-[rgba(255,255,255,0.1)]
         backdrop-blur-md px-5 py-4 z-100 border-[rgba(255,255,255,0.5)]
         border-[1px] rounded-xl hover:scale-110 transition-all duration-300
         cursor-pointer"
      >
        result goal test function
      </button>
    </div>
  );
}
