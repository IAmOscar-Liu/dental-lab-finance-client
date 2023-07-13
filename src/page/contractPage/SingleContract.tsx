import { AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { useGetContractQuery } from "../../redux/contractApi";
import {
  CONTRACT_TYPE_SELECTIONS,
  ContractType,
} from "../../types/contractTypes";
import style from "../Single.module.css";

function getContractType(contractType: string | undefined) {
  if (CONTRACT_TYPE_SELECTIONS.find((e) => e === contractType))
    return contractType as ContractType;
  return "SERVICE" as ContractType;
}

function SingleContract() {
  const { contractType, contractId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetContractQuery(
    {
      contractType: getContractType(contractType),
      contractId: contractId ?? "",
    },
    {
      skip: !contractType || !contractId,
    }
  );

  if (!contractType || !contractId)
    return <Navigate to="/contract-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiOutlineSearch />}
        title="合約管理/瀏覽合約"
        tailing={
          <Link to="/contract-management">
            <AiOutlineLeft />
            回合約管理
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className={style["single-detail"]}>
          <h1>
            <span>
              <q>{data?.name}</q> 合約資料
            </span>
            <button
              onClick={() =>
                navigate(`/contract-management/update/${data?.id}`)
              }
            >
              更新合約
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            <p className={style.title}>基本資料</p>
            <p>
              <span>合約ID</span>
              <span>{data?.id}</span>
            </p>
            <p>
              <span>合約編號</span>
              <span>{data?.contractNo}</span>
            </p>
            <p>
              <span>合約名稱</span>
              <span>{data?.name}</span>
            </p>
            <p>
              <span>客戶ID</span>
              <span>{data?.customerId}</span>
            </p>
            <p>
              <span>客戶名稱</span>
              <span>{data?.customerName}</span>
            </p>
            <p>
              <span>合約種類</span>
              <span>
                {data?.type === "SERVICE"
                  ? "服務平台合約"
                  : data?.type === "LEASE"
                  ? "設備租賃合約"
                  : "設備買賣合約"}
              </span>
            </p>
            <p>
              <span>合約狀態</span>
              <span>
                {data?.status === "CONFIRMING"
                  ? "確認中"
                  : data?.status === "EXECUTING"
                  ? "履行中"
                  : data?.status === "END"
                  ? "已解約"
                  : "已終止"}
              </span>
            </p>
            <p>
              <span>合約附件</span>
              <span>{data?.attachment}</span>
            </p>

            <p>
              <span>合約簽約日</span>
              <span>
                {data?.signingDate
                  ? new Date(data.signingDate).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>合約收費日</span>
              <span>
                {data?.chargeDate
                  ? new Date(data.chargeDate).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>Created Time</span>
              <span>
                {data?.createdTime
                  ? new Date(data.createdTime).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>Modified Time</span>
              <span>
                {data?.modifiedTime
                  ? new Date(data.modifiedTime).toLocaleString()
                  : ""}
              </span>
            </p>
            <p style={{ gridColumn: "1/-1" }}>
              <span>備註</span>
              <span>{data?.remark}</span>
            </p>
            {data?.type === "SERVICE" && (
              <>
                <p className={style.title}>服務平台合約細節</p>
                <p>
                  <span>Contract Period</span>
                  <span>{data.contractPeriod}</span>
                </p>
                <p>
                  <span>Billing ID</span>
                  <span>{data.billing?.id}</span>
                </p>
                <p>
                  <span>Billing Plan</span>
                  <span>{data.billing?.plan}</span>
                </p>
                <p>
                  <span>Billing Period Unit</span>
                  <span>{data.billing?.periodUnit}</span>
                </p>
                <p>
                  <span>Billing Currency</span>
                  <span>{data.billing?.currency}</span>
                </p>
                <p>
                  <span>Billing Base Price</span>
                  <span>
                    $ {(data.billing?.basePrice || "").toLocaleString()}
                  </span>
                </p>
                <p>
                  <span>Billing Unit</span>
                  <span>{data.billing?.billingUnit}</span>
                </p>
                <p>
                  <span>Billing Free Quota</span>
                  <span>
                    $ {(data.billing?.freeQuota || "").toLocaleString()}
                  </span>
                </p>
                <p>
                  <span>Billing Unit Charge</span>
                  <span>
                    $ {(data.billing?.unitCharge || "").toLocaleString()}
                  </span>
                </p>
                <p>
                  <span>Billing Created Time</span>
                  <span>
                    {data.billing?.createdTime
                      ? new Date(data.billing.createdTime).toLocaleString()
                      : ""}
                  </span>
                </p>
                <p>
                  <span>Billing Modified Time</span>
                  <span>
                    {data.billing?.modifiedTime
                      ? new Date(data.billing.modifiedTime).toLocaleString()
                      : ""}
                  </span>
                </p>
              </>
            )}
            {data?.type === "SELL" && (
              <>
                <p className={style.title}>設備買賣合約細節</p>
                <p>
                  <span>Equipment Type</span>
                  <span>{data.equipmentType}</span>
                </p>
                <p>
                  <span>Currency</span>
                  <span>{data.currency}</span>
                </p>
                <p>
                  <span>Quantity</span>
                  <span>{data.quantity}</span>
                </p>
                <p>
                  <span>Amount</span>
                  <span>$ {(data.amount || "").toLocaleString()}</span>
                </p>
                {data.totalAmount && (
                  <p>
                    <span>Total Amount</span>
                    <span>$ {(data.totalAmount || "").toLocaleString()}</span>
                  </p>
                )}
              </>
            )}
            {data?.type === "LEASE" && (
              <>
                <p className={style.title}>設備租賃合約細節</p>
                <p>
                  <span>Equipment Type</span>
                  <span>{data.equipmentType}</span>
                </p>
                <p>
                  <span>Contract Period</span>
                  <span>{data.contractPeriod}</span>
                </p>
                <p>
                  <span>Currency</span>
                  <span>{data.currency}</span>
                </p>
                <p>
                  <span>Quantity</span>
                  <span>{data.quantity}</span>
                </p>
                <p>
                  <span>Amount</span>
                  <span>$ {(data.amount || "").toLocaleString()}</span>
                </p>
                {data.totalAmount && (
                  <p>
                    <span>Total Amount</span>
                    <span>$ {data.totalAmount.toLocaleString()}</span>
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleContract;
