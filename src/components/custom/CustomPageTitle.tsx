import style from "./CustomPageTitle.module.css";

function CustomPageTitle({
  icon,
  title,
  tailing,
}: {
  icon: JSX.Element;
  title: string;
  tailing?: JSX.Element;
}) {
  return (
    <div className={style["title-wrapper"]}>
      {icon}
      <h3>{title}</h3>
      <div className="flex"></div>
      {tailing && <div className={style.tailing}>{tailing}</div>}
    </div>
  );
}

export default CustomPageTitle;
