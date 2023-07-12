import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetDentalLabsQuery } from "../../redux/dentalLabApi";
import { DentalDisplayType, DentalLab } from "../../types/dentalLabTypes";
import style from "../Management.module.css";
import { Link, useNavigate } from "react-router-dom";

const DENTAL_DISPLAY_TYPES = [
  { type: DentalDisplayType.ALL, text: "全部" },
  { type: DentalDisplayType.CONTACT, text: "聯繫中" },
  { type: DentalDisplayType.UNDER_CONTRACT, text: "合約中" },
  { type: DentalDisplayType.TERMINATED, text: "已解約" },
];

function DentalManagement() {
  const { data, isLoading, error } = useGetDentalLabsQuery();
  const [filter, setFilter] = useState<DentalDisplayType>(
    DentalDisplayType.ALL
  );
  const filterHistory = useRef<Map<any, DentalLab[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: DentalDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: DentalLab[] = [];
    if (_filter === DentalDisplayType.ALL) results = data;
    if (_filter === DentalDisplayType.CONTACT)
      results = data.filter((e) => e.status === "CONTACT");
    if (_filter === DentalDisplayType.UNDER_CONTRACT)
      results = data.filter((e) => e.status === "UNDER_CONTRACT");
    if (_filter === DentalDisplayType.TERMINATED)
      results = data.filter((e) => e.status === "TERMINATED");

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="牙技所管理" />
      <div className={style["title-and-search"]}>
        <h5>牙技所總覽</h5>
        <CustomSearchInputText placeholder="查詢牙技所" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>Error: {JSON.stringify(error)}</div>
      ) : (
        <div>
          <div className={style["filter-btns"]}>
            {DENTAL_DISPLAY_TYPES.map((displayType) => (
              <button
                key={displayType.type}
                disabled={displayType.type === filter}
                onClick={() => setFilter(displayType.type)}
              >
                {displayType.text} ({getFilteredData(displayType.type).length})
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
              "max(9ch, 8%)",
              "max(10ch, 10%)",
              "max(12ch, 12%)",
              "max(18ch, 18%)",
              "10ch",
            ]}
            tableGroupData={{
              title: "",
              heads: [
                "統一編號",
                "牙技所名稱",
                "狀態",
                "國家",
                "City/State",
                "電話",
                "Email",
                "查看細節",
              ],
              data: getFilteredData(filter).map((dental) => [
                dental.uniformNo ?? "",
                dental.name ?? "",
                dental.status === "CONTACT"
                  ? "聯繫中"
                  : dental.status === "UNDER_CONTRACT"
                  ? "合約中"
                  : "已解約",
                dental.country ?? "",
                [dental.city, dental.state].filter((e) => !!e).join(", "),
                dental.phoneNumber ?? "",
                dental.email ?? "",
                <Link to={`/dental-lab-management/overview/${dental.id}`}>
                  查看細節
                </Link>,
              ]),
            }}
          />
        </div>
      )}
    </div>
  );
}

export default DentalManagement;
