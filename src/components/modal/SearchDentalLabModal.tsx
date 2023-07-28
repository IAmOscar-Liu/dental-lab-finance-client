import { forwardRef } from "react";
import { useGetDentalLabsQuery } from "../../redux/dentalLabApi";
import { RootState, useAppSelector } from "../../redux/store";
import { DentalLabDetail } from "../../types/dentalLab";
import ErrorMessage from "../ErrorMessage";
import LoadingSpinner from "../LoadingSpinner";
import CustomSearchInputText from "../custom/CustomSearchInputText";
import style from "./SearchModal.module.css";

const SearchDentalLabModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    onChange: (value: DentalLabDetail) => void;
    dentalLabSelector: (state: RootState) => string;
  }
>(({ closeModal, onChange, dentalLabSelector }, ref) => {
  const { data, isLoading, error } = useGetDentalLabsQuery({
    pageSize: 1000,
    pageNo: 1,
  });
  const dentalLabId = useAppSelector(dentalLabSelector);

  return (
    <div className={style.modal}>
      <div ref={ref} className={style["modal-body"]}>
        <header className={style.header}>
          <h1>選擇牙技所</h1>
          <CustomSearchInputText placeholder="查詢牙技所" />
        </header>
        {isLoading ? (
          <LoadingSpinner totalHeight={250} />
        ) : error ? (
          <ErrorMessage error={error} style={{ marginInline: 30 }} />
        ) : (
          <div className={style["modal-body-result"]}>
            <ul>
              <li className={style.header}>
                <p>牙技所名稱</p>
                <p>國家</p>
                <p>City / State</p>
                <p>牙技所統一編號</p>
              </li>
              {data?.result.map((dentalLab) => (
                <li
                  key={dentalLab.id}
                  className={
                    dentalLab.id === dentalLabId ? style["active"] : ""
                  }
                  onClick={() => onChange(dentalLab)}
                >
                  <p>{dentalLab.name}</p>
                  <p>{dentalLab.country}</p>
                  <p>
                    {[dentalLab.city, dentalLab.state]
                      .filter((e) => !!e)
                      .join(" / ")}
                  </p>
                  <p>{dentalLab.uniformNo}</p>
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

export default SearchDentalLabModal;
