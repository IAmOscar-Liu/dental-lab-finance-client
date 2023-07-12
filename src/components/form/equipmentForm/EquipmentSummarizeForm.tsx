import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function EquipmentSummarizeForm() {
  const createData = useAppSelector((state) => state.equipment.createData);

  const keyNameTable: Record<keyof typeof createData, string> = {
    serialNumber: "設備序號",
    equipmentType: "設備類型",
    equipmentStatus: "設備狀態",
    ownerId: "設備擁有者ID",
    ownerName: "設備擁有者名稱",
    ownerType: "設備擁有者類型",
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
          {Object.entries(keyNameTable).map(([key, value]) => (
            <p key={key}>
              <span>{value}</span>
              <span>{createData[key as keyof typeof createData]}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EquipmentSummarizeForm;
