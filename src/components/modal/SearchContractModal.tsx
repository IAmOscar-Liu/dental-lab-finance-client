import { CSSProperties, forwardRef } from "react";
import { useGetContractsQuery } from "../../redux/contractApi";
import { RootState, useAppSelector } from "../../redux/store";
import {
  ContractDetail,
  getContractStatusText,
  getContractTypeText,
} from "../../types/contractTypes";
import LoadingSpinner from "../LoadingSpinner";
import CustomSearchInputText from "../custom/CustomSearchInputText";
import style from "./SearchModal.module.css";

const SearchContractModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    onChange: (value: ContractDetail) => void;
    contractSelectors: (state: RootState) => string;
  }
>(({ closeModal, onChange, contractSelectors }, ref) => {
  const { data, isLoading, error } = useGetContractsQuery();
  const contractId = useAppSelector(contractSelectors);

  return (
    <div className={style.modal}>
      <div ref={ref} className={style["modal-body"]}>
        <header className={style.header}>
          <h1>選擇合約</h1>
          <CustomSearchInputText placeholder="查詢合約" />
        </header>
        {isLoading ? (
          <LoadingSpinner totalHeight={250} />
        ) : error ? (
          <div>{JSON.stringify(error)}</div>
        ) : (
          <div className={style["modal-body-result"]}>
            <ul
              style={
                {
                  "--grid-template-columns": "2.5fr 3fr 10ch 10ch 2fr",
                } as CSSProperties
              }
            >
              <li className={style.header}>
                <p>合約編號</p>
                <p>合約名稱</p>
                <p>合約種類</p>
                <p>合約狀態</p>
                <p>客戶名稱</p>
              </li>
              {data?.map((contract) => (
                <li
                  key={contract.id}
                  className={contract.id === contractId ? style.active : ""}
                  onClick={() => onChange(contract)}
                >
                  <p>{contract.contractNo ?? ""}</p>
                  <p>{contract.name ?? ""}</p>
                  <p>{getContractTypeText(contract.type).slice(0, -2)}</p>
                  <p>{getContractStatusText(contract.status)}</p>
                  <p>{contract.customerName}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex"></div>
        <footer className={style.footer}>
          <button onClick={closeModal}>OK</button>
        </footer>
      </div>
    </div>
  );
});

export default SearchContractModal;
