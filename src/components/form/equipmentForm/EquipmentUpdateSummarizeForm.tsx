import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function EquipmentSummarizeForm() {
  const updateData = useAppSelector((state) => state.equipment.updateData);

  const keyNameTable: Record<keyof typeof updateData, string> = {
    id: "設備ID",
    equipmentType: "設備類型",
    equipmentStatus: "設備狀態",
    ownerId: "設備擁有者ID",
    ownerType: "設備擁有者類型",
    serialNumber: "設備序號",
    currency: "幣別",
    amount: "設備單價",
    warrantyDate: "設備保固期",
    receivedDate: "設備到貨日",
    serviceLife: "使用長度(月)",
    remark: "備註",
  };

  return (
    <div className={style.summarize}>
      <h1>設備內容確認</h1>

      <div className={style.detail}>
        <h2>設備資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateData).map(([key, value]) => (
            <p key={key}>
              <span>{keyNameTable[key as keyof typeof updateData]}</span>
              <span>{value || "無"}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EquipmentSummarizeForm;
