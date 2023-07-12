import style from "./Header.module.css";
import { BsGlobe2 } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";

function Header() {
  return (
    <header className={style.header}>
      <h1>牙技財務暨設備管理平台</h1>
      <div className="flex"></div>
      <div className={style["control-btn"]}>
        <button>
          <BsGlobe2 />
        </button>
        <button>
          <IoMdNotifications />
        </button>
      </div>
      <div className={style["user-info"]}>
        <div className={style["img-wrapper"]}>
          <img src="/default_user.jpg" alt="" />
        </div>
        <p>
          <span>牙技平台管理人</span>
          <span>王小明</span>
        </p>
        <button>
          <BiChevronDown />
        </button>
      </div>
    </header>
  );
}

export default Header;
