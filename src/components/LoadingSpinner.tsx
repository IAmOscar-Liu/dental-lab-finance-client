import { CSSProperties } from "react";
import style from "./LoadingSpinner.module.css";

function LoadingSpinner({ totalHeight }: { totalHeight?: number }) {
  return (
    <div
      style={
        {
          "--total-height": totalHeight ? totalHeight + "px" : "auto",
        } as CSSProperties
      }
      className={style["spinner-container"]}
    >
      <div className={style["loading-spinner"]}></div>
    </div>
  );
}

export default LoadingSpinner;
