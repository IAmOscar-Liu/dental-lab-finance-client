import { useAppSelector } from "../../../redux/store";
import { updateStockKeyNameTable } from "../../../types/StockTypes";
import style from "../SummarizeForm.module.css";

function StockUpdateFormSummary() {
  const updateData = useAppSelector((state) => state.stock.updateData);

  return (
    <div className={style.summarize}>
      <h1>庫存內容確認</h1>

      <div className={style.detail}>
        <h2>庫存資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateStockKeyNameTable).map(([key, value]) => (
            <p
              key={key}
              style={value.text === "備註" ? { gridColumn: "1/-1" } : {}}
            >
              <span>{value.text}</span>
              <span>
                {value.formatter
                  ? value.formatter(updateData[key as keyof typeof updateData])
                  : updateData[key as keyof typeof updateData]}
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className={style.detail}>
        <h2>設備明細</h2>
        <div className={style["detail-body"]}>
          {updateData.equipments.map((eq) => (
            <p key={eq.id}>
              <span>{eq.equipmentType}</span>
              <span>{eq.serialNumber}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockUpdateFormSummary;
