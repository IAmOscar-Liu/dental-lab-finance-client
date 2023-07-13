import { useAppSelector } from "../../../redux/store";
import { createContractKeyNameTable } from "../../../types/contractTypes";
import style from "../SummarizeForm.module.css";

function ContractFormSummary() {
  const createData = useAppSelector((state) => state.contract.createData);

  return (
    <div className={style.summarize}>
      <h1>合約內容確認</h1>

      <div className={style.detail}>
        <h2>合約基本資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(createContractKeyNameTable).map(([key, value]) => (
            <p key={key} style={value === "備註" ? { gridColumn: "1/-1" } : {}}>
              <span>{value}</span>
              <span>{(createData as any)[key]}</span>
            </p>
          ))}
        </div>
      </div>

      {createData.type === "SERVICE" && (
        <div className={style.detail}>
          <h2>服務平台合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Contract Period</span>
              <span>{createData.serviceContractDetail.contractPeriod}</span>
            </p>
            <p>
              <span>Billing Plan</span>
              <span>{createData.serviceContractDetail.billing.plan}</span>
            </p>
            <p>
              <span>Billing Period Unit</span>
              <span>{createData.serviceContractDetail.billing.periodUnit}</span>
            </p>
            <p>
              <span>Billing Currency</span>
              <span>{createData.serviceContractDetail.billing.currency}</span>
            </p>
            <p>
              <span>Billing Base Price</span>
              <span>
                ${" "}
                {(
                  createData.serviceContractDetail.billing.basePrice || ""
                ).toLocaleString()}
              </span>
            </p>
            <p>
              <span>Billing Unit</span>
              <span>
                {createData.serviceContractDetail.billing.billingUnit}
              </span>
            </p>
            <p>
              <span>Billing Free Quota</span>
              <span>
                ${" "}
                {(
                  createData.serviceContractDetail.billing.freeQuota || ""
                ).toLocaleString()}
              </span>
            </p>
            <p>
              <span>Billing Unit Charge</span>
              <span>
                ${" "}
                {(
                  createData.serviceContractDetail.billing.unitCharge || ""
                ).toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      )}

      {createData.type === "LEASE" && (
        <div className={style.detail}>
          <h2>設備租賃合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Equipment Type</span>
              <span>{createData.leaseContractDetail.equipmentType}</span>
            </p>
            <p>
              <span>Contract Period</span>
              <span>{createData.leaseContractDetail.contractPeriod}</span>
            </p>
            <p>
              <span>Currency</span>
              <span>{createData.leaseContractDetail.currency}</span>
            </p>
            <p>
              <span>Quantity</span>
              <span>{createData.leaseContractDetail.quantity}</span>
            </p>
            <p>
              <span>Amount</span>
              <span>
                ${" "}
                {(createData.leaseContractDetail.amount || "").toLocaleString()}
              </span>
            </p>
            {createData.leaseContractDetail.totalAmount && (
              <p>
                <span>Total Amount</span>
                <span>
                  ${" "}
                  {createData.leaseContractDetail.totalAmount.toLocaleString()}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {createData.type === "SELL" && (
        <div className={style.detail}>
          <h2>設備買賣合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Equipment Type</span>
              <span>{createData.sellContractDetail.equipmentType}</span>
            </p>
            <p>
              <span>Currency</span>
              <span>{createData.sellContractDetail.currency}</span>
            </p>
            <p>
              <span>Quantity</span>
              <span>{createData.sellContractDetail.quantity}</span>
            </p>
            <p>
              <span>Amount</span>
              <span>
                ${" "}
                {(createData.sellContractDetail.amount || "").toLocaleString()}
              </span>
            </p>
            {createData.sellContractDetail.totalAmount && (
              <p>
                <span>Total Amount</span>
                <span>
                  ${" "}
                  {(
                    createData.sellContractDetail.totalAmount || ""
                  ).toLocaleString()}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractFormSummary;
