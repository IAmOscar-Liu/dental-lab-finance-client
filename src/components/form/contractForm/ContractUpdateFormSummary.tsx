import { useAppSelector } from "../../../redux/store";
import { updateContractKeyNameTable } from "../../../types/contractTypes";
import { formatDollarString } from "../../../utils/formatString";
import style from "../SummarizeForm.module.css";

function ContractUpdateFormSummary() {
  const updateData = useAppSelector((state) => state.contract.updateData);

  return (
    <div className={style.summarize}>
      <h1>合約內容確認</h1>

      <div className={style.detail}>
        <h2>合約基本資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateContractKeyNameTable).map(([key, value]) => (
            <p
              key={key}
              style={value.text === "備註" ? { gridColumn: "1/-1" } : {}}
            >
              <span>{value.text}</span>
              <span>
                {value.formatter
                  ? value.formatter((updateData as any)[key])
                  : (updateData as any)[key]}
              </span>
            </p>
          ))}
        </div>
      </div>

      {updateData.type === "SERVICE" && (
        <div className={style.detail}>
          <h2>服務平台合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Contract Period</span>
              <span>{updateData.serviceContractDetail.contractPeriod}</span>
            </p>
            <p>
              <span>Billing Plan</span>
              <span>{updateData.serviceContractDetail.billing.plan}</span>
            </p>
            <p>
              <span>Billing Period Unit</span>
              <span>{updateData.serviceContractDetail.billing.periodUnit}</span>
            </p>
            <p>
              <span>Billing Currency</span>
              <span>{updateData.serviceContractDetail.billing.currency}</span>
            </p>
            <p>
              <span>Billing Base Price</span>
              <span>
                {formatDollarString(
                  updateData.serviceContractDetail.billing.basePrice
                )}
              </span>
            </p>
            <p>
              <span>Billing Unit</span>
              <span>
                {updateData.serviceContractDetail.billing.billingUnit}
              </span>
            </p>
            <p>
              <span>Billing Free Quota</span>
              <span>
                {formatDollarString(
                  updateData.serviceContractDetail.billing.freeQuota
                )}
              </span>
            </p>
            <p>
              <span>Billing Unit Charge</span>
              <span>
                {formatDollarString(
                  updateData.serviceContractDetail.billing.unitCharge
                )}
              </span>
            </p>
          </div>
        </div>
      )}

      {updateData.type === "LEASE" && (
        <div className={style.detail}>
          <h2>設備租賃合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Equipment Type</span>
              <span>{updateData.leaseContractDetail.equipmentType}</span>
            </p>
            <p>
              <span>Contract Period</span>
              <span>{updateData.leaseContractDetail.contractPeriod}</span>
            </p>
            <p>
              <span>Currency</span>
              <span>{updateData.leaseContractDetail.currency}</span>
            </p>
            <p>
              <span>Quantity</span>
              <span>{updateData.leaseContractDetail.quantity}</span>
            </p>
            <p>
              <span>Amount</span>
              <span>
                {formatDollarString(updateData.leaseContractDetail.amount)}
              </span>
            </p>
            {updateData.leaseContractDetail.totalAmount && (
              <p>
                <span>Total Amount</span>
                <span>
                  {formatDollarString(
                    updateData.leaseContractDetail.totalAmount
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      )}

      {updateData.type === "SELL" && (
        <div className={style.detail}>
          <h2>設備買賣合約細節</h2>
          <div className={style["detail-body"]}>
            <p>
              <span>Equipment Type</span>
              <span>{updateData.sellContractDetail.equipmentType}</span>
            </p>
            <p>
              <span>Currency</span>
              <span>{updateData.sellContractDetail.currency}</span>
            </p>
            <p>
              <span>Quantity</span>
              <span>{updateData.sellContractDetail.quantity}</span>
            </p>
            <p>
              <span>Amount</span>
              <span>
                {formatDollarString(updateData.sellContractDetail.amount)}
              </span>
            </p>
            {updateData.sellContractDetail.totalAmount && (
              <p>
                <span>Total Amount</span>
                <span>
                  {formatDollarString(
                    updateData.sellContractDetail.totalAmount
                  )}
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ContractUpdateFormSummary;
