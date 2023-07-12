import { AiOutlineLeft, AiOutlineSearch } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { useGetContractQuery } from "../../redux/contractApi";
import style from "./SingleContract.module.css";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import {
  CONTRACT_TYPE_SELECTIONS,
  ContractType,
} from "../../types/contractTypes";

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
            回牙技所管理
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className={style["contract-detail"]}>
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
          <div className={style["contract-detail-body"]}>
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
              <span>牙技所ID</span>
              <span>{data?.customerId}</span>
            </p>
            <p>
              <span>牙技所名稱</span>
              <span>{data?.customerName}</span>
            </p>
            <p>
              <span>合約狀態</span>
              <span>{data?.status === "PROCESS" ? "進行中" : "已終止"}</span>
            </p>
            <p>
              <span>合約收費日</span>
              <span>{new Date(data?.chargeDate as any).toLocaleString()}</span>
            </p>
            <p>
              <span>createdTime</span>
              <span>{new Date(data?.createdTime as any).toLocaleString()}</span>
            </p>
            <p>
              <span>modifiedTime</span>
              <span>
                {new Date(data?.modifiedTime as any).toLocaleString()}
              </span>
            </p>
            <p>
              <span>合約附件</span>
              <span>{data?.attachment}</span>
            </p>
            <p>
              <span>備註</span>
              <span>{data?.remark}</span>
            </p>
            {data?.type === "SERVICE" && (
              <>
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
                  <span>{data.billing?.basePrice}</span>
                </p>
                <p>
                  <span>Billing Unit</span>
                  <span>{data.billing?.billingUnit}</span>
                </p>
                <p>
                  <span>Billing Free Quota</span>
                  <span>{data.billing?.freeQuota}</span>
                </p>
                <p>
                  <span>Billing Unit Charge</span>
                  <span>{data.billing?.unitCharge}</span>
                </p>
                <p>
                  <span>Billing Created Time</span>
                  <span>
                    {new Date(
                      data.billing?.createdTime as any
                    ).toLocaleString()}
                  </span>
                </p>
                <p>
                  <span>Billing Modified Time</span>
                  <span>
                    {new Date(
                      data?.billing?.modifiedTime as any
                    ).toLocaleString()}
                  </span>
                </p>
              </>
            )}
            {data?.type === "SELL" && (
              <>
                <p>
                  <span>Currency</span>
                  <span>{data.currency}</span>
                </p>
                <p>
                  <span>Amount</span>
                  <span>{data.amount}</span>
                </p>
                <div className={style["equipment-table"]}>
                  {data.equipments && data.equipments.length > 0 && (
                    <CustomTableGroup
                      tableGroupData={{
                        title: "Equipments",
                        heads: Object.keys(data.equipments[0]),
                        data: data.equipments.map((eq) =>
                          Object.entries(eq).map(([key, value]) =>
                            key === "createdTime" || key === "modifiedTime"
                              ? new Date(value as any).toLocaleString()
                              : value + ""
                          )
                        ),
                      }}
                    />
                  )}
                </div>
              </>
            )}
            {data?.type === "LEASE" && (
              <>
                <p>
                  <span>Equipment Type</span>
                  <span>{data.equipmentType}</span>
                </p>
                <p>
                  <span>Quantity</span>
                  <span>{data.quantity}</span>
                </p>
                <p>
                  <span>Start Time</span>
                  <span>{data.startTime}</span>
                </p>
                <p>
                  <span>End Time</span>
                  <span>{data.endTime}</span>
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
                  <span>Billing Amount</span>
                  <span>{data.billing?.amount}</span>
                </p>
                <p>
                  <span>Billing FreeQuota</span>
                  <span>{data.billing?.freeQuota}</span>
                </p>
                <p>
                  <span>Billing Unit Charge</span>
                  <span>{data.billing?.unitCharge}</span>
                </p>
                <p>
                  <span>Billing Created Time</span>
                  <span>
                    {new Date(
                      data.billing?.createdTime as any
                    ).toLocaleString()}
                  </span>
                </p>
                <p>
                  <span>Billing Modified Time</span>
                  <span>
                    {new Date(
                      data.billing?.modifiedTime as any
                    ).toLocaleString()}
                  </span>
                </p>
                <div className={style["equipment-table"]}>
                  {data.equipments && data.equipments.length > 0 && (
                    <CustomTableGroup
                      tableGroupData={{
                        title: "Equipments",
                        heads: Object.keys(data.equipments[0]),
                        data: data.equipments.map((eq) =>
                          Object.entries(eq).map(([key, value]) =>
                            key === "createdTime" || key === "modifiedTime"
                              ? new Date(value as any).toLocaleString()
                              : value + ""
                          )
                        ),
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleContract;
