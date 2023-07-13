import { useAppSelector } from "../../../redux/store";
import { updateEquipmentkeyNameTable } from "../../../types/equipmentTypes";
import style from "../SummarizeForm.module.css";

function EquipmentUpdateFormSummary() {
  const updateData = useAppSelector((state) => state.equipment.updateData);

  return (
    <div className={style.summarize}>
      <h1>設備內容確認</h1>

      <div className={style.detail}>
        <h2>設備資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateEquipmentkeyNameTable).map(([key, value]) => (
            <p key={key}>
              <span>{value}</span>
              <span>{updateData[key as keyof typeof updateData]}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EquipmentUpdateFormSummary;
