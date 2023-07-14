import { useAppSelector } from "../../../redux/store";
import { createEquipmentkeyNameTable } from "../../../types/equipmentTypes";
import style from "../SummarizeForm.module.css";

function EquipmentFormSummary() {
  const createData = useAppSelector((state) => state.equipment.createData);

  return (
    <div className={style.summarize}>
      <h1>設備內容確認</h1>

      <div className={style.detail}>
        <h2>設備資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(createEquipmentkeyNameTable).map(([key, value]) => (
            <p
              key={key}
              style={value.text === "備註" ? { gridColumn: "1/-1" } : {}}
            >
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

export default EquipmentFormSummary;
