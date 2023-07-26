import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetCustomStockQuery } from "../../hooks/useGetCustomQuery";
import { centerTextStyle } from "../../types";
import { stockDetailkeyNameTable } from "../../types/StockTypes";
import {
  getEquipmentStatusText,
  getEquipmentTypeText,
} from "../../types/equipmentTypes";
import {
  formatDollarString,
  getLocalISOStringFromUTC,
} from "../../utils/formatString";
import style from "../Single.module.css";

function SingleStock() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCustomStockQuery({ stockId });

  if (!stockId) return <Navigate to="/stock-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiFillEye />}
        title="庫存管理/瀏覽庫存"
        tailing={
          <Link to="/stock-management">
            <AiOutlineLeft />
            回庫存管理
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
            <span>庫存明細</span>
            <button
              onClick={() => navigate(`/stock-management/update/${data?.id}`)}
            >
              <MdUpdate />
              更新庫存
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            <p className={style.title}>入庫/出庫資料</p>
            {Object.entries(stockDetailkeyNameTable)
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
            {data?.equipments && data.equipments.length > 0 && (
              <>
                <p className={style.title}>設備明細</p>
                <div className={style["detail-table"]}>
                  <CustomTableGroup
                    tableMinWidth={800}
                    tableGroupData={{
                      heads: [
                        { text: "設備序號" },
                        { text: "設備種類", style: centerTextStyle },
                        { text: "設備狀態", style: centerTextStyle },
                        { text: "幣別", style: centerTextStyle },
                        { text: "單價", style: centerTextStyle },
                        { text: "保固期限", style: centerTextStyle },
                        { text: "到貨日", style: centerTextStyle },
                        { text: "年限", style: centerTextStyle },
                        { text: "查看細節", style: centerTextStyle },
                      ],
                      data: data.equipments.map((equipment) => [
                        equipment.serialNumber ?? "",
                        <span style={centerTextStyle}>
                          {getEquipmentTypeText(equipment.equipmentType)}
                        </span>,
                        <span style={centerTextStyle}>
                          {getEquipmentStatusText(equipment.equipmentStatus)}
                        </span>,
                        <span style={centerTextStyle}>
                          {equipment.currency ?? ""}
                        </span>,
                        <span style={centerTextStyle}>
                          {(formatDollarString(equipment.amount) ?? 0) + ""}
                        </span>,
                        <span style={centerTextStyle}>
                          {(
                            getLocalISOStringFromUTC(equipment.warrantyDate) ??
                            ""
                          ).slice(0, 10)}
                        </span>,
                        <span style={centerTextStyle}>
                          {(
                            getLocalISOStringFromUTC(equipment.receivedDate) ??
                            ""
                          ).slice(0, 10)}
                        </span>,
                        <span style={centerTextStyle}>
                          {(equipment.serviceLife ?? 0) + " mo"}
                        </span>,
                        <Link
                          style={centerTextStyle}
                          to={`/equipment-management/overview/${equipment.id}`}
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

export default SingleStock;
