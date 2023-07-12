import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetContractsBriefQuery } from "../../redux/contractApi";

import style from "../Management.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ContractBrief, ContractDisplayType } from "../../types/contractTypes";

const CONTRACT_DISPLAY_TYPES = [
  { type: ContractDisplayType.ALL, text: "全部" },
  { type: ContractDisplayType.PLATFORM, text: "服務平台" },
  { type: ContractDisplayType.LEASE, text: "設備租賃" },
  { type: ContractDisplayType.SELLING, text: "設備買賣" },
];

function ContractManagement() {
  const { data, isLoading, error } = useGetContractsBriefQuery();
  const [filter, setFilter] = useState<ContractDisplayType>(
    ContractDisplayType.ALL
  );
  const filterHistory = useRef<Map<any, ContractBrief[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: ContractDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: ContractBrief[] = [];
    if (_filter === ContractDisplayType.ALL) results = data;
    if (_filter === ContractDisplayType.PLATFORM)
      results = data.filter((e) => e.type === "SERVICE");
    if (_filter === ContractDisplayType.LEASE)
      results = data.filter((e) => e.type === "LEASE");
    if (_filter === ContractDisplayType.SELLING)
      results = data.filter((e) => e.type === "SELL");

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="合約管理" />
      <div className={style["title-and-search"]}>
        <h5>合約總覽</h5>
        <CustomSearchInputText placeholder="查詢合約" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>Error: {JSON.stringify(error)}</div>
      ) : (
        <div>
          <div className={style["filter-btns"]}>
            {CONTRACT_DISPLAY_TYPES.map((displayType) => (
              <button
                key={displayType.type}
                disabled={displayType.type === filter}
                onClick={() => setFilter(displayType.type)}
              >
                {displayType.text} ({getFilteredData(displayType.type).length})
              </button>
            ))}
            <button onClick={() => navigate("/contract-management/new")}>
              新增合約
            </button>
          </div>
          <CustomTableGroup
            columnWidths={[
              "max(15ch, 15%)",
              "auto",
              "15ch",
              "12ch",
              "12ch",
              "max(12ch, 12%)",
              "10ch",
            ]}
            tableGroupData={{
              title: "",
              heads: [
                "合約編號",
                "合約名稱",
                "合約種類",
                "簽約日",
                "收費日",
                "牙技所名稱",
                "合約細節",
              ],
              data: getFilteredData(filter).map((contract) => [
                contract.contractNo ?? "",
                contract.name ?? "",
                contract.type === "SERVICE"
                  ? "服務平台合約"
                  : contract.type === "LEASE"
                  ? "設備租賃合約"
                  : "設備買賣合約",
                (contract.createdTime ?? "").slice(0, 10),
                (contract.chargeDate ?? "").slice(0, 10),
                contract.customerName ?? "",
                <Link
                  to={`/contract-management/overview/${contract.type}/${contract.id}`}
                >
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

export default ContractManagement;
