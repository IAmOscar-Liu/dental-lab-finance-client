import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { centerTextStyle } from "../../constant";
import { equipmentDetailkeyNameTable } from "../../constant/equipment";
import { getStockTypeText } from "../../constant/stock";
import { useGetCustomEquipmentQuery } from "../../hooks/useGetCustomQuery";
import { getLocalISOStringFromUTC } from "../../utils/formatString";
import style from "../Single.module.css";

function SingleEquipment() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCustomEquipmentQuery({
    equipmentId,
    withStockHistory: true,
  });

  if (!equipmentId) return <Navigate to="/equipment-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiFillEye />}
        title="設備管理/瀏覽設備"
        tailing={
          <Link to="/equipment-management">
            <AiOutlineLeft />
            回設備管理
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
              <q>
                {data?.equipmentType} <small>{data?.serialNumber}</small>
              </q>{" "}
              設備資料
            </span>
            <button
              onClick={() =>
                navigate(`/equipment-management/update/${data?.id}`)
              }
            >
              <MdUpdate />
              更新設備
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            <p className={style.title}>設備資料</p>
            {Object.entries(equipmentDetailkeyNameTable)
              .filter(([_, value]) => value.text !== "備註")
              .map(([key, value]) => (
                <p key={key}>
                  <span>{value.text}</span>
                  <span>
                    {value.formatter
                      ? value.formatter(data![key as keyof typeof data])
                      : data![key as keyof typeof data]}
                    {key === "ownerName" && data?.ownerName && (
                      <Link
                        to={`/dental-lab-management/overview/${data?.ownerId}`}
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
            {data?.stockHistory && data.stockHistory.length > 0 && (
              <>
                <p className={style.title}>入/出庫明細</p>
                <div className={style["detail-table"]}>
                  <CustomTableGroup
                    tableMinWidth={800}
                    tableGroupData={{
                      heads: [
                        { text: "入/出庫", style: centerTextStyle },
                        { text: "入/出庫日期", style: centerTextStyle },
                        { text: "設備數量", style: centerTextStyle },
                        { text: "Operator", style: centerTextStyle },
                        { text: "查看細節", style: centerTextStyle },
                      ],
                      data: data.stockHistory.map((stock) => [
                        <span style={centerTextStyle}>
                          {getStockTypeText(stock.inOutType) ?? ""}
                        </span>,
                        <span style={centerTextStyle}>
                          {(
                            getLocalISOStringFromUTC(stock.inOutTime) ?? ""
                          ).slice(0, 10)}
                        </span>,
                        <span style={centerTextStyle}>
                          {stock.equipmentCount + " 台"}
                        </span>,
                        <span style={centerTextStyle}>
                          {stock.operator ?? ""}
                        </span>,
                        <Link
                          style={centerTextStyle}
                          to={`/stock-management/overview/${stock.id}`}
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

export default SingleEquipment;
