import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetStocksQuery } from "../../redux/stockApi";
import {
  STOCK_DISPLAY_TYPE_SELECTIONS,
  StockDisplayType,
  StockInOutDetail,
  getStockTypePriority,
  getStockTypeText,
} from "../../types/StockTypes";
import { getLocalISOStringFromUTC } from "../../utils/formatString";
import style from "../Management.module.css";

function StockManagement() {
  const { data, isLoading, error } = useGetStocksQuery();
  const [filter, setFilter] = useState<StockDisplayType>("ALL");
  const filterHistory = useRef<Map<any, StockInOutDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: StockDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: StockInOutDetail[] = [];
    if (_filter === "ALL") results = data;
    else results = data.filter((e) => e.inOutType === _filter);

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="庫存管理" />
      <div className={style["title-and-search"]}>
        <h5>庫存總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢庫存" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>Error: {JSON.stringify(error)}</div>
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {STOCK_DISPLAY_TYPE_SELECTIONS.map((displayType) => (
              <button
                key={displayType}
                disabled={displayType === filter}
                onClick={() => setFilter(displayType)}
              >
                {displayType === "ALL" ? "全部" : getStockTypeText(displayType)}{" "}
                ({getFilteredData(displayType).length})
              </button>
            ))}
            <button onClick={() => navigate("/stock-management/new")}>
              新增庫存
            </button>
          </div>
          <CustomTableGroup
            columnWidths={["1fr", "1fr", "1fr", "1fr", "10ch"]}
            tableGroupData={{
              title: "",
              heads: [
                {
                  text: "入庫/出庫",
                  sortFn: (a, b) =>
                    getStockTypePriority(a) - getStockTypePriority(b),
                },
                {
                  text: "入出庫日期",
                  sortFn: (a, b) => a.localeCompare(b),
                },
                {
                  text: "Operator",
                  sortFn: (a, b) => a.localeCompare(b),
                },
                { text: "設備數量", sortFn: (a, b) => +a - +b },
                { text: "查看細節" },
              ],
              data: getFilteredData(filter).map((stock) => [
                getStockTypeText(stock.inOutType),
                (getLocalISOStringFromUTC(stock.inOutTime) ?? "").slice(0, 10),
                stock.operator ?? "",
                (stock.equipments?.length ?? 0) + "",
                <Link to={`/stock-management/overview/${stock.id}`}>
                  查看細節
                </Link>,
              ]),
            }}
          />
        </>
      )}
    </div>
  );
}

export default StockManagement;
