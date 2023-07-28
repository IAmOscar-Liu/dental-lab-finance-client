import {
  AiFillEye,
  AiOutlineAudit,
  AiOutlineDownload,
  AiOutlineLeft,
} from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import { CustomShowModalButton } from "../../components/custom/CustomFormField";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import ContractConfirmChargeDateModal from "../../components/modal/ContractConfirmChargeDateModal";
import ContractOperateModal from "../../components/modal/ContractOperateModal";
import ContractSubmitModal from "../../components/modal/ContractSubmitModal";
import {
  contractDetailKeyNameTable,
  getContractType,
} from "../../constant/contract";
import { useGetContractQuery } from "../../redux/contractApi";
import {
  formatDollarString,
  formatISOTimeString,
} from "../../utils/formatString";
import { handleDownloadPDF } from "../../utils/handleDownloadPDF";
import style from "../Single.module.css";

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
        icon={<AiFillEye />}
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
        <ErrorMessage error={error} />
      ) : (
        <div className={style["single-detail"]}>
          <h1>
            <span>
              <q>{data?.name}</q> 合約資料
            </span>
            <button
              onClick={() =>
                navigate(
                  `/contract-management/update/${data?.type}/${data?.id}`
                )
              }
            >
              <MdUpdate />
              更新合約
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            <p className={style.title}>基本資料</p>

            {Object.entries(contractDetailKeyNameTable)
              .filter(([_, value]) => value.text !== "備註")
              .map(([key, value]) => (
                <p key={key}>
                  <span>{value.text}</span>
                  <span>
                    {value.formatter
                      ? value.formatter(data![key as keyof typeof data])
                      : data![key as keyof typeof data]}
                    {key === "customerName" && data?.customerName && (
                      <Link
                        to={`/dental-lab-management/overview/${data?.customerId}`}
                      >
                        <AiFillEye />
                      </Link>
                    )}
                  </span>
                </p>
              ))}
            <p style={{ gridColumn: "1/-1" }}>
              <span>{"備註"}</span>
              <span>{data?.remark ?? ""}</span>
            </p>
            <div className={style["btn-groups"]}>
              {data?.status === "CONFIRMING" &&
                data?.contractNo &&
                data?.name && (
                  <CustomShowModalButton
                    text="送出合約審核(業務)"
                    icon={<AiOutlineAudit />}
                  >
                    {({ modalRef, closeModal }) => (
                      <ContractSubmitModal
                        closeModal={closeModal}
                        contractId={data.id}
                        contractNo={data.contractNo!}
                        contractName={data.name!}
                        ref={modalRef}
                      />
                    )}
                  </CustomShowModalButton>
                )}
              {data?.status === "SUBMIT_FOR_REVIEW" &&
                data?.contractNo &&
                data?.name && (
                  <CustomShowModalButton
                    text="進行合約審核(財務)"
                    icon={<AiOutlineAudit />}
                  >
                    {({ modalRef, closeModal }) => (
                      <ContractOperateModal
                        closeModal={closeModal}
                        contractId={data.id}
                        contractNo={data.contractNo!}
                        contractName={data.name!}
                        ref={modalRef}
                      />
                    )}
                  </CustomShowModalButton>
                )}
              {data?.status === "EFFECTED" &&
                data?.contractNo &&
                data?.name && (
                  <CustomShowModalButton
                    text="設定約定收費起始日(審核通過)"
                    icon={<AiOutlineAudit />}
                  >
                    {({ modalRef, closeModal }) => (
                      <ContractConfirmChargeDateModal
                        closeModal={closeModal}
                        contractId={data.id}
                        contractNo={data.contractNo!}
                        contractName={data.name!}
                        ref={modalRef}
                      />
                    )}
                  </CustomShowModalButton>
                )}
              <button onClick={() => {}}>
                <AiOutlineDownload />
                下載合約PDF
              </button>
            </div>

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
                  <span>{formatDollarString(data.billing?.basePrice)}</span>
                </p>
                <p>
                  <span>Billing Unit</span>
                  <span>{data.billing?.billingUnit}</span>
                </p>
                <p>
                  <span>Billing Free Quota</span>
                  <span>{formatDollarString(data.billing?.freeQuota)}</span>
                </p>
                <p>
                  <span>Billing Unit Charge</span>
                  <span>{formatDollarString(data.billing?.unitCharge)}</span>
                </p>
                <p>
                  <span>Billing Created Time</span>
                  <span>{formatISOTimeString(data.billing?.createdTime)}</span>
                </p>
                <p>
                  <span>Billing Modified Time</span>
                  <span>{formatISOTimeString(data.billing?.modifiedTime)}</span>
                </p>
                <div className={style["btn-groups"]}>
                  <button
                    onClick={() =>
                      data.billing?.id &&
                      handleDownloadPDF({
                        url: `${process.env.REACT_APP_SERVER_URL}/api/billings/download/${data.billing.id}`,
                        filename: `contract billing ${data.contractNo}`,
                      })
                    }
                  >
                    <AiOutlineDownload />
                    下載收費方案PDF
                  </button>
                </div>
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
                  <span>{formatDollarString(data.amount)}</span>
                </p>
                {data.totalAmount && (
                  <p>
                    <span>Total Amount</span>
                    <span>{formatDollarString(data.totalAmount)}</span>
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
                  <span>{formatDollarString(data.amount)}</span>
                </p>
                {data.totalAmount && (
                  <p>
                    <span>Total Amount</span>
                    <span>{formatDollarString(data.totalAmount)}</span>
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
