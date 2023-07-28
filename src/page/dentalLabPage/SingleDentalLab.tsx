import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { centerTextStyle } from "../../constant";
import {
  getContractStatusText,
  getContractTypeText,
} from "../../constant/contract";
import { dentalDetailLabkeyNameTable } from "../../constant/dentalLab";
import { useGetCustomDentalLabQuery } from "../../hooks/useGetCustomQuery";
import { getLocalISOStringFromUTC } from "../../utils/formatString";
import style from "../Single.module.css";

function SingleDentalLab() {
  const { dentalLabId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCustomDentalLabQuery({
    dentalLabId,
  });

  if (!dentalLabId) return <Navigate to="/dental-lab-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiFillEye />}
        title="牙技所管理/瀏覽牙技所"
        tailing={
          <Link to="/dental-lab-management">
            <AiOutlineLeft />
            回牙技所管理
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
              <q>{data?.name}</q> 資料
            </span>
            <button
              onClick={() =>
                navigate(`/dental-lab-management/update/${data?.id}`)
              }
            >
              <MdUpdate />
              更新牙技所
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            <p className={style.title}>牙技所資料</p>
            {Object.entries(dentalDetailLabkeyNameTable)
              .filter(([_, value]) => value.text !== "備註")
              .map(([key, value]) => (
                <p key={key}>
                  <span>{value.text}</span>
                  <span>
                    {value.formatter
                      ? value.formatter(data![key as keyof typeof data])
                      : data![key as keyof typeof data]}
                  </span>
                </p>
              ))}
            <p style={{ gridColumn: "1/-1" }}>
              <span>{"備註"}</span>
              <span>{data?.remark ?? ""}</span>
            </p>
            {data?.contracts && data.contracts.length > 0 && (
              <>
                <p className={style.title}>合約明細</p>
                <div className={style["detail-table"]}>
                  <CustomTableGroup
                    tableMinWidth={800}
                    tableGroupData={{
                      heads: [
                        { text: "合約編號" },
                        { text: "合約名稱" },
                        { text: "合約種類", style: centerTextStyle },
                        { text: "合約狀態", style: centerTextStyle },
                        { text: "簽約日", style: centerTextStyle },
                        { text: "查看細節", style: centerTextStyle },
                      ],
                      data: data.contracts.map((contract) => [
                        contract.contractNo ?? "",
                        contract.name ?? "",
                        <span style={centerTextStyle}>
                          {(getContractTypeText(contract.type) ?? "").slice(
                            0,
                            -2
                          )}
                        </span>,
                        <span style={centerTextStyle}>
                          {getContractStatusText(contract.status) ?? ""}
                        </span>,
                        <span style={centerTextStyle}>
                          {(
                            getLocalISOStringFromUTC(contract.signingDate) ?? ""
                          ).slice(0, 10)}
                        </span>,
                        <Link
                          style={centerTextStyle}
                          to={`/contract-management/overview/${contract.type}/${contract.id}`}
                        >
                          查看細節
                        </Link>,
                      ]),
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleDentalLab;
