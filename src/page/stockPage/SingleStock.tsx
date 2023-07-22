import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetStockQuery } from "../../redux/stockApi";
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
  const { data, isLoading, error } = useGetStockQuery(
    {
      stockId: stockId ?? "",
    },
    {
      skip: !stockId,
    }
  );

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
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className={style["single-detail"]}>
          <h1>
            <span>庫存明細</span>
            <button
              onClick={() => navigate(`/stock-management/update/${data?.id}`)}
            >
              更新庫存
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
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
            <div className={style["equipment-table"]}>
              {data?.equipments && data.equipments.length > 0 && (
                <CustomTableGroup
                  tableGroupData={{
                    title: <p className={style["table-title"]}>設備明細</p>,
                    heads: [
                      { text: "設備序號" },
                      { text: "設備種類" },
                      { text: "設備狀態" },
                      { text: "幣別" },
                      { text: "單價" },
                      { text: "保固期限" },
                      { text: "到貨日" },
                      { text: "租期" },
                    ],
                    data: data.equipments.map((equipment) => [
                      equipment.serialNumber ?? "",
                      getEquipmentTypeText(equipment.equipmentType),
                      getEquipmentStatusText(equipment.equipmentStatus),
                      equipment.currency ?? "",
                      (formatDollarString(equipment.amount) ?? 0) + "",
                      (
                        getLocalISOStringFromUTC(equipment.warrantyDate) ?? ""
                      ).slice(0, 10),
                      (
                        getLocalISOStringFromUTC(equipment.receivedDate) ?? ""
                      ).slice(0, 10),
                      (equipment.serviceLife ?? 0) + " mo",
                    ]),
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleStock;
