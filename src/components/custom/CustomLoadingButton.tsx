import { ButtonHTMLAttributes } from "react";
import LoadingSpinner from "../LoadingSpinner";
import style from "./CustomLoadingButton.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
}

function CustomLoadingButton({ text, isLoading = false, ...rest }: Props) {
  return (
    <button className={style.button} {...rest}>
      <span style={{ opacity: isLoading ? 0 : 1 }}>{text}</span>
      {isLoading && (
        <div className={style["spinner-wrapper"]}>
          <LoadingSpinner />
        </div>
      )}
    </button>
  );
}

export default CustomLoadingButton;
