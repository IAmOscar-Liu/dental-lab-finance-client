import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetDentalLabsQuery } from "../../redux/dentalLabApi";
import {
  DENTAL_DISPLAY_TYPE_SELECTIONS,
  DentalDisplayType,
  DentalLab,
  getDentalStatusPriority,
  getDentalStatusText,
} from "../../types/dentalLabTypes";
import style from "../Management.module.css";

function DentalManagement() {
  const { data, isLoading, error } = useGetDentalLabsQuery();
  const [filter, setFilter] = useState<DentalDisplayType>("ALL");
  const filterHistory = useRef<Map<any, DentalLab[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: DentalDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: DentalLab[] = [];
    if (_filter === "ALL") results = data;
    else results = data.filter((e) => e.status === _filter);

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="牙技所管理" />
      <div className={style["title-and-search"]}>
        <h5>牙技所總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢牙技所" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {DENTAL_DISPLAY_TYPE_SELECTIONS.map((displayType) => (
              <button
                key={displayType}
                disabled={displayType === filter}
                onClick={() => setFilter(displayType)}
              >
                {displayType === "ALL"
                  ? "全部"
                  : getDentalStatusText(displayType)}{" "}
                ({getFilteredData(displayType).length})
              </button>
            ))}
            <button onClick={() => navigate("/dental-lab-management/new")}>
              新增牙技所
            </button>
          </div>
          <CustomTableGroup
            columnWidths={[
              "max(10ch, 10%)",
              "auto",
              "9ch",
              "max(9ch, 9%)",
              "max(12ch, 12%)",
              "max(12ch, 12%)",
              "max(18ch, 18%)",
              "10ch",
            ]}
            tableGroupData={{
              title: "",
              heads: [
                { text: "統一編號", sortFn: (a, b) => a.localeCompare(b) },
                { text: "牙技所名稱", sortFn: (a, b) => a.localeCompare(b) },
                {
                  text: "狀態",
                  sortFn: (a, b) =>
                    getDentalStatusPriority(a) - getDentalStatusPriority(b),
                },
                { text: "國家", sortFn: (a, b) => a.localeCompare(b) },
                { text: "City/State", sortFn: (a, b) => a.localeCompare(b) },
                { text: "電話" },
                { text: "Email" },
                { text: "查看細節" },
              ],
              data: getFilteredData(filter).map((dental) => [
                dental.uniformNo ?? "",
                dental.name ?? "",
                getDentalStatusText(dental.status),
                dental.country ?? "",
                [dental.city, dental.state].filter((e) => !!e).join(" / "),
                dental.phoneNumber ?? "",
                dental.email ?? "",
                <Link to={`/dental-lab-management/overview/${dental.id}`}>
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

export default DentalManagement;
