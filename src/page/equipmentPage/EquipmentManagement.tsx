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
  EQUIPMENT_DISPLAY_TYPE_SELECTIONS,
  getEquipmentStatusPriority,
  getEquipmentStatusText,
  getEquipmentTypePriority,
  getEquipmentTypeText,
} from "../../constant/equipment";
import useFilter from "../../hooks/useFilter";
import { useGetEquipmentsPaginationQuery } from "../../hooks/useGetPaginationQuery";
import { EquipmentDetail, EquipmentDisplayType } from "../../types/equipment";
import {
  formatDollarString,
  getLocalISOStringFromUTC,
} from "../../utils/formatString";
import style from "../Management.module.css";

function EquipmentManagement() {
  const {
    paginationValue,
    updatePaginationValue,
    data,
    isLoading,
    isFetching,
    error,
  } = useGetEquipmentsPaginationQuery({ pageNo: 1, pageSize: 10 });
  const { filter, setFilter, getFilteredData } = useFilter<
    EquipmentDisplayType,
    EquipmentDetail
  >({ data: data?.result, filterBy: (value) => value.equipmentStatus });
  const navigate = useNavigate();

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="設備管理" />
      <div className={style["title-and-search"]}>
        <h5>設備總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢設備" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {EQUIPMENT_DISPLAY_TYPE_SELECTIONS.map((displayType) => (
              <button
                key={displayType}
                disabled={displayType === filter}
                onClick={() => setFilter(displayType)}
              >
                {displayType === "ALL"
                  ? "全部"
                  : getEquipmentStatusText(displayType)}{" "}
                ({getFilteredData(displayType).length})
              </button>
            ))}
            <button onClick={() => navigate("/equipment-management/new")}>
              <MdOutlineAdd />
              新增設備
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
                tableMinWidth={840}
                columnWidths={[
                  "1fr",
                  "1fr",
                  "max(10ch, 10%)",
                  "9ch",
                  "10ch",
                  "12ch",
                  "12ch",
                  "8ch",
                  "10ch",
                ]}
                tableGroupData={{
                  heads: [
                    { text: "設備序號", sortFn: (a, b) => a.localeCompare(b) },
                    {
                      text: "設備種類",
                      sortFn: (a, b) =>
                        getEquipmentTypePriority(a) -
                        getEquipmentTypePriority(b),
                    },
                    {
                      text: "設備狀態",
                      sortFn: (a, b) =>
                        getEquipmentStatusPriority(a) -
                        getEquipmentStatusPriority(b),
                    },
                    { text: "幣別", sortFn: (a, b) => a.localeCompare(b) },
                    {
                      text: "單價",
                      sortFn: (a, b) =>
                        +a.replace(/[^\d]/g, "") - +b.replace(/[^\d]/g, ""),
                    },
                    { text: "保固期限", sortFn: (a, b) => a.localeCompare(b) },
                    { text: "到貨日", sortFn: (a, b) => a.localeCompare(b) },
                    {
                      text: "年限",
                      sortFn: (a, b) =>
                        +a.replace("mo", "") - +b.replace("mo", ""),
                    },
                    { text: "查看細節" },
                  ],
                  data: getFilteredData(filter).map((equipment) => [
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
                    <Link to={`/equipment-management/overview/${equipment.id}`}>
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

export default EquipmentManagement;
