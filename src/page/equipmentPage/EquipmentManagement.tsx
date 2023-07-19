import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetEquipmentsQuery } from "../../redux/equipmentApi";
import {
  EQUIPMENT_DISPLAY_TYPES,
  EquipmentDetail,
  EquipmentDisplayType,
  getEquipmentStatusText,
} from "../../types/equipmentTypes";
import style from "../Management.module.css";

function EquipmentManagement() {
  const { data, isLoading, error } = useGetEquipmentsQuery();
  const [filter, setFilter] = useState<EquipmentDisplayType>(
    EquipmentDisplayType.ALL
  );
  const filterHistory = useRef<Map<any, EquipmentDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: EquipmentDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: EquipmentDetail[] = [];
    if (_filter === EquipmentDisplayType.ALL) results = data;
    if (_filter === EquipmentDisplayType.UNKNOWN)
      results = data.filter((e) => e.equipmentStatus === "Unknown");
    if (_filter === EquipmentDisplayType.AVAILABLE)
      results = data.filter((e) => e.equipmentStatus === "Available");
    if (_filter === EquipmentDisplayType.SOLD)
      results = data.filter((e) => e.equipmentStatus === "Sold");
    if (_filter === EquipmentDisplayType.LEASING)
      results = data.filter((e) => e.equipmentStatus === "Leasing");
    if (_filter === EquipmentDisplayType.UNAVAILABLE)
      results = data.filter((e) => e.equipmentStatus === "UnAvailable");

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
        <div>Error: {JSON.stringify(error)}</div>
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {EQUIPMENT_DISPLAY_TYPES.map((displayType) => (
              <button
                key={displayType.type}
                disabled={displayType.type === filter}
                onClick={() => setFilter(displayType.type)}
              >
                {displayType.text} ({getFilteredData(displayType.type).length})
              </button>
            ))}
            <button onClick={() => navigate("/equipment-management/new")}>
              新增設備
            </button>
          </div>
          <CustomTableGroup
            columnWidths={[
              "auto",
              "max(10ch, 10%)",
              "max(10ch, 10%)",
              "9ch",
              "10ch",
              "12ch",
              "12ch",
              "9ch",
              "10ch",
            ]}
            tableGroupData={{
              title: "",
              heads: [
                "設備序號",
                "設備種類",
                "設備狀態",
                "幣別",
                "單價",
                "保固期限",
                "到貨日",
                "時間(月)",
                "查看細節",
              ],
              data: getFilteredData(filter).map((equipment) => [
                equipment.serialNumber ?? "",
                equipment.equipmentType ?? "",
                getEquipmentStatusText(equipment.equipmentStatus),
                equipment.currency ?? "",
                (equipment.amount ?? 0) + "",
                (equipment.warrantyDate ?? "").slice(0, 10),
                (equipment.receivedDate ?? "").slice(0, 10),
                (equipment.serviceLife ?? 0) + "",
                <Link to={`/equipment-management/overview/${equipment.id}`}>
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

export default EquipmentManagement;
