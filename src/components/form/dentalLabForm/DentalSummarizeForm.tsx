import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function DentalSummarizeForm() {
  const createData = useAppSelector((state) => state.dentalLab.createData);

  const keyNameTable: Record<keyof typeof createData, string> = {
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

export default DentalSummarizeForm;
