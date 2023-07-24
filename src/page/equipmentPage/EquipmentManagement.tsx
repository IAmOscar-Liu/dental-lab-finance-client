import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomQueryController from "../../components/custom/CustomQueryController";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetEquipmentsPaginationQuery } from "../../hooks/useGetPaginationQuery";
import {
  EQUIPMENT_DISPLAY_TYPE_SELECTIONS,
  EquipmentDetail,
  EquipmentDisplayType,
  getEquipmentStatusPriority,
  getEquipmentStatusText,
  getEquipmentTypePriority,
  getEquipmentTypeText,
} from "../../types/equipmentTypes";
import {
  formatDollarString,
  getLocalISOStringFromUTC,
} from "../../utils/formatString";
import style from "../Management.module.css";

function EquipmentManagement() {
  const { value, updateValue, data, isLoading, isFetching, error } =
    useGetEquipmentsPaginationQuery({ pageNo: 1, pageSize: 10 });
  const [filter, setFilter] = useState<EquipmentDisplayType>("ALL");
  const filterHistory = useRef<Map<any, EquipmentDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: EquipmentDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: EquipmentDetail[] = [];
    if (_filter === "ALL") results = data.result;
    else results = data.result.filter((e) => e.equipmentStatus === _filter);

    filterHistory.current?.set(_filter, results);
    return results;
  };

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
              新增設備
            </button>
          </div>
          <CustomQueryController value={value} updateValue={updateValue} />
          {isFetching ? (
            <LoadingSpinner totalHeight={350} />
          ) : (
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
                      getEquipmentTypePriority(a) - getEquipmentTypePriority(b),
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
                    text: "租期",
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
          )}
        </>
      )}
    </div>
  );
}

export default EquipmentManagement;
