import { forwardRef } from "react";
import { useGetDentalLabsQuery } from "../redux/dentalLabApi";
import { DentalLab } from "../types/dentalLabTypes";
import style from "./DentalLabModal.module.css";
import LoadingSpinner from "./LoadingSpinner";
import { RootState, useAppSelector } from "../redux/store";

const DentalLabModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    onChange: (value: DentalLab) => void;
    dentalLabSelector: (state: RootState) => string;
  }
>(({ closeModal, onChange, dentalLabSelector }, ref) => {
  const { data, isLoading, error } = useGetDentalLabsQuery();
  const dentalLabId = useAppSelector(dentalLabSelector);

  return (
    <div className={style.modal}>
      <div ref={ref} className={style["modal-body"]}>
        <h1>選擇牙技所</h1>
        {isLoading ? (
          <LoadingSpinner totalHeight={250} />
        ) : error ? (
          <div>{JSON.stringify(error)}</div>
        ) : (
          <div className={style["modal-body-result"]}>
            <ul>
              <li className={style.header}>
                <p>牙技所名稱</p>
                <p>國家</p>
                <p>City / State</p>
                <p>牙技所統一編號</p>
              </li>
              {data?.map((dentalLab) => (
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
        <button onClick={closeModal}>OK</button>
      </div>
    </div>
  );
});

export default DentalLabModal;
