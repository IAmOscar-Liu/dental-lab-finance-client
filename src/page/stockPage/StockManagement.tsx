import { useRef, useState } from "react";
import { MdOutlineAdd, MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomQueryController from "../../components/custom/CustomQueryController";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetStocksPaginationQuery } from "../../hooks/useGetPaginationQuery";
import { MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER } from "../../constant";
import { getLocalISOStringFromUTC } from "../../utils/formatString";
import style from "../Management.module.css";
import {
  STOCK_DISPLAY_TYPE_SELECTIONS,
  getStockTypeText,
  getStockTypePriority,
} from "../../constant/stock";
import { StockDisplayType, StockInOutDetail } from "../../types/stock";

function StockManagement() {
  const {
    paginationValue,
    updatePaginationValue,
    data,
    isLoading,
    isFetching,
    error,
  } = useGetStocksPaginationQuery({ pageNo: 1, pageSize: 10 });
  const [filter, setFilter] = useState<StockDisplayType>("ALL");
  const filterHistory = useRef<Map<any, StockInOutDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: StockDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: StockInOutDetail[] = [];
    if (_filter === "ALL") results = data.result;
    else results = data.result.filter((e) => e.inOutType === _filter);

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
        <ErrorMessage error={error} />
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
              <MdOutlineAdd />
              新增入/出庫
            </button>
          </div>
          <CustomQueryController
            paginationValue={paginationValue}
            updatePaginationValue={updatePaginationValue}
          />
          {isFetching ? (
            <LoadingSpinner totalHeight={350} />
          ) : (
            <>
              <CustomTableGroup
                tableMinWidth={600}
                columnWidths={["1fr", "1fr", "1fr", "1fr", "12ch"]}
                tableGroupData={{
                  heads: [
                    {
                      text: "入/出庫",
                      sortFn: (a, b) =>
                        getStockTypePriority(a) - getStockTypePriority(b),
                    },
                    {
                      text: "入/出庫日期",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "設備數量",
                      sortFn: (a, b) =>
                        +a.replace("台", "") - +b.replace("台", ""),
                    },
                    {
                      text: "Operator",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    { text: "查看細節" },
                  ],
                  data: getFilteredData(filter).map((stock) => [
                    getStockTypeText(stock.inOutType) ?? "",
                    (getLocalISOStringFromUTC(stock.inOutTime) ?? "").slice(
                      0,
                      10
                    ),
                    (stock.equipments || []).length + " 台",
                    stock.operator ?? "",
                    <Link to={`/stock-management/overview/${stock.id}`}>
                      查看細節
                    </Link>,
                  ]),
                }}
              />
              {getFilteredData(filter).length >=
                MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER && (
                <CustomQueryController
                  paginationValue={paginationValue}
                  updatePaginationValue={updatePaginationValue}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default StockManagement;
