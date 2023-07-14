import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetContractsQuery } from "../../redux/contractApi";

import { Link, useNavigate } from "react-router-dom";
import {
  CONTRACT_DISPLAY_TYPES,
  ContractDetail,
  ContractDisplayType,
  getContractStatusText,
  getContractTypeText,
} from "../../types/contractTypes";
import style from "../Management.module.css";

function ContractManagement() {
  const { data, isLoading, error } = useGetContractsQuery();
  const [filter, setFilter] = useState<ContractDisplayType>(
    ContractDisplayType.ALL
  );
  const filterHistory = useRef<Map<any, ContractDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: ContractDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: ContractDetail[] = [];
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
                "合約狀態",
                "合約收費日",
                "客戶名稱",
                "合約細節",
              ],
              data: getFilteredData(filter).map((contract) => [
                contract.contractNo ?? "",
                contract.name ?? "",
                getContractTypeText(contract.type),
                getContractStatusText(contract.status),
                (contract.signingDate ?? "").slice(0, 10),
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
