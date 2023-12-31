import { useAppSelector } from "../../../redux/store";
import { createDentalLabkeyNameTable } from "../../../types/dentalLabTypes";
import style from "../SummarizeForm.module.css";

function DentalFormSummary() {
  const createData = useAppSelector((state) => state.dentalLab.createData);

  return (
    <div className={style.summarize}>
      <h1>牙技所內容確認</h1>

      <div className={style.detail}>
        <h2>牙技所資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(createDentalLabkeyNameTable).map(([key, value]) => (
            <p key={key}>
              <span>{value.text}</span>
              <span>
                {value.formatter(createData[key as keyof typeof createData])}
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DentalFormSummary;
