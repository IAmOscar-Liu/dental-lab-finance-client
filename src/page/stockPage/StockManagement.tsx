import { MdOutlineAdd, MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomQueryController from "../../components/custom/CustomQueryController";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER } from "../../constant";
import {
  STOCK_TYPE_SELECTIONS,
  getStockTypePriority,
  getStockTypeText,
} from "../../constant/stock";
import { useGetStocksPaginationQuery } from "../../hooks/useGetPaginationQuery";
import useManagementFilter from "../../hooks/useManagementFilter";
import { StockInOutDetail, StockType } from "../../types/stock";
import { getLocalISOStringFromUTC } from "../../utils/formatString";
import style from "../Management.module.css";

function StockManagement() {
  const {
    paginationValue,
    updatePaginationValue,
    data,
    isLoading,
    isFetching,
    error,
  } = useGetStocksPaginationQuery({ pageNo: 1, pageSize: 10 });
  const { filter, setFilter, getFilteredData } = useManagementFilter<
    StockType,
    StockInOutDetail
  >({ data: data?.result, filterBy: (value) => value.inOutType });
  const navigate = useNavigate();

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
            {(["ALL", ...STOCK_TYPE_SELECTIONS] as const).map((displayType) => (
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
                    <span style={{ marginLeft: "1ch" }}>
                      {getStockTypeText(stock.inOutType) ?? ""}
                    </span>,
                    (getLocalISOStringFromUTC(stock.inOutTime) ?? "").slice(
                      0,
                      10
                    ),
                    <span style={{ marginLeft: "2ch" }}>
                      {(stock.equipments || []).length + " 台"}
                    </span>,
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
