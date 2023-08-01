import { AiFillEye, AiFillHeart, AiFillHome } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaFileContract } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { MdUpdate, MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { AppLink } from "../types";
import { isLinkActive } from "../utils/isLinkActive";
import style from "./Sidebar.module.css";

const LINKS: AppLink[] = [
  {
    icon: <AiFillHome />,
    title: "Home",
    pathname: "/",
    hasChildren: false,
  },
  {
    icon: <AiFillHeart />,
    title: "Favorites",
    pathname: "/favorites",
    hasChildren: false,
  },
  {
    icon: <MdOutlineStickyNote2 />,
    title: "設備管理",
    pathname: "/equipment-management",
    hasChildren: true,
  },
  {
    icon: <IoIosAddCircle />,
    title: "新增設備",
    pathname: "/equipment-management/new",
    hasChildren: false,
  },
  {
    icon: <AiFillEye />,
    title: "瀏覽設備",
    pathname: "/equipment-management/overview",
    hasChildren: false,
  },
  {
    icon: <MdUpdate />,
    title: "更新設備",
    pathname: "/equipment-management/update",
    hasChildren: false,
  },
  {
    icon: <MdOutlineStickyNote2 />,
    title: "入/出庫管理",
    pathname: "/stock-management",
    hasChildren: true,
  },
  {
    icon: <IoIosAddCircle />,
    title: "新增入/出庫",
    pathname: "/stock-management/new",
    hasChildren: false,
  },
  {
    icon: <MdUpdate />,
    title: "更新入/出庫",
    pathname: "/stock-management/update",
    hasChildren: false,
  },
  {
    icon: <AiFillEye />,
    title: "瀏覽入/出庫",
    pathname: "/stock-management/overview",
    hasChildren: false,
  },
  {
    icon: <MdOutlineStickyNote2 />,
    title: "牙技所管理",
    pathname: "/dental-lab-management",
    hasChildren: true,
  },
  {
    icon: <IoIosAddCircle />,
    title: "新增牙技所",
    pathname: "/dental-lab-management/new",
    hasChildren: false,
  },
  {
    icon: <AiFillEye />,
    title: "瀏覽牙技所",
    pathname: "/dental-lab-management/overview",
    hasChildren: false,
  },
  {
    icon: <MdUpdate />,
    title: "更新牙技所",
    pathname: "/dental-lab-management/update",
    hasChildren: false,
  },
  {
    icon: <MdOutlineStickyNote2 />,
    title: "合約管理",
    pathname: "/contract-management",
    hasChildren: true,
  },
  {
    icon: <IoIosAddCircle />,
    title: "新增合約",
    pathname: "/contract-management/new",
    hasChildren: false,
  },
  {
    icon: <AiFillEye />,
    title: "瀏覽合約",
    pathname: "/contract-management/overview",
    hasChildren: false,
  },
  {
    icon: <MdUpdate />,
    title: "更新合約",
    pathname: "/contract-management/update",
    hasChildren: false,
  },
  {
    icon: <MdOutlineStickyNote2 />,
    title: "財務管理",
    pathname: "/account-receivable-management",
    hasChildren: true,
  },
  {
    icon: <FaFileContract />,
    title: "財務報表",
    pathname: "/finance",
    hasChildren: false,
  },
];

function Sidebar() {
  const { pathname } = useLocation();

  const isTopPath = (_pathname: string) =>
    _pathname.split("/").filter((e) => !!e).length <= 1;

  return (
    <aside className={style.sidebar}>
      <div className={style.logo}>
        <img src="/tsmc.svg" alt="" />
      </div>
      <div className={style["links-wrapper"]}>
        <ul>
          {LINKS.map((link) => (
            <li
              key={link.pathname}
              className={
                isTopPath(link.pathname) ? style["with-margin-top"] : ""
              }
            >
              <Link
                to={link.pathname}
                className={
                  isLinkActive({
                    myPathname: link.pathname,
                    currentPathname: pathname,
                  })
                    ? style.active
                    : ""
                }
              >
                <div
                  style={{ marginLeft: isTopPath(link.pathname) ? 0 : 12 }}
                  className={style.icon}
                >
                  {link.icon}
                </div>
                <h2>{link.title}</h2>
                {link.hasChildren && (
                  <div className={style.icon}>
                    <BiDotsVerticalRounded />
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
