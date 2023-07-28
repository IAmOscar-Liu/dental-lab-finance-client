import { updateEquipmentkeyNameTable } from "../../../constant/equipment";
import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function EquipmentUpdateFormSummary() {
  const updateData = useAppSelector((state) => state.equipment.updateData);

  return (
    <div className={style.summarize}>
      <h1>設備內容確認</h1>

      <div className={style.detail}>
        <h2>設備資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateEquipmentkeyNameTable)
            .filter(([_, value]) => !value.hideInFormSummary)
            .map(([key, value]) => (
              <p
                key={key}
                style={value.text === "備註" ? { gridColumn: "1/-1" } : {}}
              >
                <span>{value.text}</span>
                <span>
                  {value.formatter
                    ? value.formatter(
                        updateData[key as keyof typeof updateData]
                      )
                    : updateData[key as keyof typeof updateData]}
                </span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default EquipmentUpdateFormSummary;
