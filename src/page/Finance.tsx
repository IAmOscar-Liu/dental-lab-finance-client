import CustomPageTitle from "../components/custom/CustomPageTitle";
import { FaFileContract } from "react-icons/fa";
import style from "./Finance.module.css";
import CustomDropdownMenu from "../components/custom/CustomDropdownMenu";
import { useState } from "react";
import { TableGroupData } from "../types";
import CustomTableGroup from "../components/custom/CustomTableGroup";

const ORDER_TWD: TableGroupData = {
  title: "幣別: TWD",
  heads: ["訂單編號", "交易金額"],
  data: [
    ["S202301010001", "10,000"],
    ["S202301010001", "20,000"],
  ],
  tails: ["小計", "30,000"],
};

const ORDER_USD: TableGroupData = {
  title: "幣別: USD",
  heads: ["訂單編號", "交易金額"],
  data: [["S202301010003", "1,000"]],
  tails: ["小計", "1,000"],
};

const TRANSACTION_AMOUNT_TRANSFER: TableGroupData = {
  title: "交易金額換算",
  heads: ["交易幣別", "交易金額", "預設匯率(TWD)", "換算金額(TWD)"],
  data: [
    ["TWD", "30,000", "1", "30,000"],
    ["USD", "1,000", "30", "30,000"],
  ],
};

const SERVICE_CHARGE: TableGroupData = {
  title: "服務費(TWD)",
  data: [
    ["基本費", "25,000"],
    ["免費額度", "50,000"],
    ["交易金額", "60,000"],
    ["超額金額", "10,000"],
    ["超額服務費(10%)", "1,000"],
  ],
  tails: ["總計", "26,000"],
};

function Finance() {
  const [dentalLabName, setDentalLabName] = useState("");
  const [reportType, setReportType] = useState("");

  return (
    <div className={style.finance}>
      <CustomPageTitle icon={<FaFileContract />} title="財務報表" />

      <h2>
        {dentalLabName || "XX牙技所"}
        {reportType || "XX結算報表"} 2023/01/05 ~ 2023/02/04
      </h2>

      <div className={style.dropmenu}>
        <CustomDropdownMenu
          defaultSelection="選擇牙技所"
          data={["台北牙技所", "新竹牙技所", "台中牙技所", "高雄牙技所"]}
          onItemChange={setDentalLabName}
        />
        <CustomDropdownMenu
          menuWidth={250}
          defaultSelection="選擇報表"
          data={["服務費結算表", "區域平台服務費總算表", "平台服務費總表"]}
          onItemChange={setReportType}
        />
      </div>

      <CustomTableGroup tableGroupData={ORDER_TWD} />
      <CustomTableGroup tableGroupData={ORDER_USD} />
      <CustomTableGroup tableGroupData={TRANSACTION_AMOUNT_TRANSFER} />
      <CustomTableGroup tableGroupData={SERVICE_CHARGE} />
    </div>
  );
}

export default Finance;
