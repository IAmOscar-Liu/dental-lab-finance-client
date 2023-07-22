import { useRef, useState } from "react";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { useGetContractsQuery } from "../../redux/contractApi";
import {
  CONTRACT_DISPLAY_TYPE_SELECTIONS,
  ContractDetail,
  ContractDisplayType,
  getContractStatusPriority,
  getContractStatusText,
  getContractTypePriority,
  getContractTypeText,
} from "../../types/contractTypes";
import { getLocalISOStringFromUTC as UTC2Local } from "../../utils/formatString";
import style from "../Management.module.css";

function ContractManagement() {
  const { data, isLoading, error } = useGetContractsQuery();
  const [filter, setFilter] = useState<ContractDisplayType>("ALL");
  const filterHistory = useRef<Map<any, ContractDetail[]>>();
  const navigate = useNavigate();

  const getFilteredData = (_filter: ContractDisplayType) => {
    if (!data) return [];

    if (filterHistory.current?.has(_filter))
      return filterHistory.current.get(_filter)!;

    let results: ContractDetail[] = [];
    if (_filter === "ALL") results = data;
    else results = results = data.filter((e) => e.type === _filter);

    filterHistory.current?.set(_filter, results);
    return results;
  };

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="合約管理" />
      <div className={style["title-and-search"]}>
        <h5>合約總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢合約" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {CONTRACT_DISPLAY_TYPE_SELECTIONS.map((displayType) => (
              <button
                key={displayType}
                disabled={displayType === filter}
                onClick={() => setFilter(displayType)}
              >
                {displayType === "ALL"
                  ? "全部"
                  : getContractTypeText(displayType).slice(0, -2)}{" "}
                ({getFilteredData(displayType).length})
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
              "12ch",
              "12ch",
              "12ch",
              "max(12ch, 12%)",
              "10ch",
            ]}
            tableGroupData={{
              title: "",
              heads: [
                { text: "合約編號", sortFn: (a, b) => a.localeCompare(b) },
                { text: "合約名稱", sortFn: (a, b) => a.localeCompare(b) },
                {
                  text: "合約種類",
                  sortFn: (a, b) =>
                    getContractTypePriority(a + "合約") -
                    getContractTypePriority(b + "合約"),
                },
                {
                  text: "合約狀態",
                  sortFn: (a, b) =>
                    getContractStatusPriority(a) - getContractStatusPriority(b),
                },
                { text: "簽約日", sortFn: (a, b) => a.localeCompare(b) },
                { text: "客戶名稱", sortFn: (a, b) => a.localeCompare(b) },
                { text: "合約細節" },
              ],
              data: getFilteredData(filter).map((contract) => [
                contract.contractNo ?? "",
                contract.name ?? "",
                getContractTypeText(contract.type).slice(0, -2),
                getContractStatusText(contract.status),
                (UTC2Local(contract.signingDate) ?? "").slice(0, 10),
                contract.customerName ?? "",
                <Link
                  to={`/contract-management/overview/${contract.type}/${contract.id}`}
                >
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

export default ContractManagement;
