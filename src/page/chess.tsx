// import dependency
import { useContext, type JSX } from "react";

// import compoenent
import Square from "../component/square/square";
import Capture from "../component/capture/capture";

// import context
import { ChessContext } from "../context/chess";

export default function Chess(): JSX.Element {
  const { square, allCapture } = useContext(ChessContext);

  return (
    <div
      className="flex gap-10 h-screen w-full
     items-center justify-center bg-[#92cdf770] "
    >
      <div className={`self-start mt-24 grid "grid-rows-8 gap-5 grid-cols-3 `}>
        {allCapture.map((capture) => {
          if (capture.player == "white") {
            return <Capture key={capture.id} {...capture} />;
          }
        })}
      </div>
      <div className="p-4 rounded-xl bg-[#68c0ff70] shadow-[0px_0px_10px_rgb(255,255,255,1)]">
        <div className="p-4 rounded-xl bg-[#559bcd70] shadow-[0px_0px_10px_rgb(255,255,255,0.8)]">
          <div className="p-4 rounded-xl bg-[#31587570] shadow-[0px_0px_10px_rgb(255,255,255,0.8)]">
            <div className="bg-[#2a5c8070] p-4 rounded-xl shadow-[0px_0px_10px_rgb(255,255,255,0.8)]">
              <div className="grid grid-cols-8 shadow-[0px_0px_10px_rgb(255,255,255,0.8)] rounded-xl overflow-hidden">
                {square.map((s) => (
                  <Square key={s.id} {...s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`self-start mt-24 grid "grid-rows-8 gap-5 grid-cols-3 `}>
        {allCapture.map((capture) => {
          if (capture.player == "black") {
            return <Capture key={capture.id} {...capture} />;
          }
        })}
      </div>
    </div>
  );
}
