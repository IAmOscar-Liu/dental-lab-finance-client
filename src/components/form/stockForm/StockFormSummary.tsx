import { useAppSelector } from "../../../redux/store";
import { createStockKeyNameTable } from "../../../types/StockTypes";
import style from "../SummarizeForm.module.css";

function StockFormSummary() {
  const createData = useAppSelector((state) => state.stock.createData);

  return (
    <div className={style.summarize}>
      <h1>庫存內容確認</h1>

      <div className={style.detail}>
        <h2>庫存資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(createStockKeyNameTable).map(([key, value]) => (
            <p
              key={key}
              style={value.text === "備註" ? { gridColumn: "1/-1" } : {}}
            >
              <span>{value.text}</span>
              <span>
                {value.formatter
                  ? value.formatter(createData[key as keyof typeof createData])
                  : createData[key as keyof typeof createData]}
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className={style.detail}>
        <h2>設備明細</h2>
        <div className={style["detail-body"]}>
          {createData.equipments.map((eq, eqIdx) => (
            <p key={eq.id}>
              <span>
                <b
                  style={{
                    width: "3ch",
                    display: "inline-block",
                    fontWeight: 500,
                  }}
                >
                  {eqIdx + 1}.
                </b>{" "}
                {eq.equipmentType}
              </span>
              <span>{eq.serialNumber}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockFormSummary;
