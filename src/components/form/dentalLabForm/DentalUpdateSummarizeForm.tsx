import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function DentalUpdateSummarizeForm() {
  const updateData = useAppSelector((state) => state.dentalLab.updateData);

  const keyNameTable: Record<keyof typeof updateData, string> = {
    id: "牙技所ID",
    name: "牙技所名稱",
    uniformNo: "牙技所統一編號",
    status: "牙技所狀態",
    region: "牙技所區域",
    country: "牙技所所在國家",
    state: "State",
    city: "City",
    address: "牙技所地址",
    phoneCode: "牙技所電話國碼",
    phoneNumber: "牙技所電話",
    contactPerson: "牙技所聯絡人",
    email: "牙技所email",
    remark: "備註",
  };

  return (
    <div className={style.summarize}>
      <h1>牙技所內容確認</h1>

      <div className={style.detail}>
        <h2>牙技所資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateData).map(([key, value]) => (
            <p key={key}>
              <span>
                {keyNameTable[key as keyof Omit<typeof updateData, "id">]}
              </span>
              <span>{value || "無"}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DentalUpdateSummarizeForm;
