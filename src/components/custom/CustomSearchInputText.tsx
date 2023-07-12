import style from "./CustomSearchInputText.module.css";
import { AiOutlineSearch } from "react-icons/ai";

function CustomSearchInputText({ placeholder }: { placeholder: string }) {
  return (
    <div className={style["search-container"]}>
      <AiOutlineSearch />
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default CustomSearchInputText;
