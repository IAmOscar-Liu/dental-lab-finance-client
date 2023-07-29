import { InputHTMLAttributes } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import style from "./CustomSearchInputText.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

function CustomSearchInputText({ ...rest }: Props) {
  return (
    <div className={style["search-container"]}>
      <AiOutlineSearch />
      <input {...rest} />
    </div>
  );
}

export default CustomSearchInputText;
