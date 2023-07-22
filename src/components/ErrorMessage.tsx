import { CSSProperties } from "react";
import style from "./ErrorMessage.module.css";

function ErrorMessage({
  error,
  style: CSSStyle = {},
}: {
  error: any;
  style?: CSSProperties;
}) {
  return (
    <div className={style.error} style={CSSStyle}>
      <h1>Error !!!</h1>
      <div className={style["error-content"]}>
        <pre>{JSON.stringify(error, null, 4)}</pre>
      </div>
    </div>
  );
}

export default ErrorMessage;
