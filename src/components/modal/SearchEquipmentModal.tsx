import { CSSProperties, forwardRef } from "react";
import { useGetEquipmentsQuery } from "../../redux/equipmentApi";
import { RootState, useAppSelector } from "../../redux/store";
import {
  EquipmentDetail,
  getEquipmentStatusText,
  getEquipmentTypeText,
} from "../../types/equipmentTypes";
import LoadingSpinner from "../LoadingSpinner";
import CustomSearchInputText from "../custom/CustomSearchInputText";
import style from "./SearchModal.module.css";

const SearchEquipmentModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    onChange: (value: EquipmentDetail) => void;
    equipmentSelectors: (
      state: RootState
    ) => Pick<EquipmentDetail, "id" | "serialNumber">[];
  }
>(({ closeModal, onChange, equipmentSelectors }, ref) => {
  const { data, isLoading, error } = useGetEquipmentsQuery();
  const equipments = useAppSelector(equipmentSelectors);

  return (
    <div className={style.modal}>
      <div ref={ref} className={style["modal-body"]}>
        <header className={style.header}>
          <h1>選擇設備</h1>
          <CustomSearchInputText placeholder="查詢設備" />
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
                  "--grid-template-columns": "2fr 1fr 1fr 1.5fr 1fr",
                } as CSSProperties
              }
            >
              <li className={style.header}>
                <p>設備序號</p>
                <p>設備種類</p>
                <p>設備狀態</p>
                <p>幣別/單價</p>
                <p>租期</p>
              </li>
              {data?.map((equipment) => (
                <li
                  key={equipment.id}
                  className={
                    equipments.find((eq) => eq.id === equipment.id)
                      ? `${style["active"]} ${style["allow-multi-selections"]}`
                      : ""
                  }
                  onClick={() => onChange(equipment)}
                >
                  <p>{equipment.serialNumber ?? ""}</p>
                  <p>{getEquipmentTypeText(equipment.equipmentType)}</p>
                  <p>{getEquipmentStatusText(equipment.equipmentStatus)}</p>
                  <p>
                    {[equipment.currency, equipment.amount]
                      .filter((e) => !!e)
                      .join(" / ")}
                  </p>
                  <p>{(equipment.serviceLife ?? 0) + " mo"}</p>
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

export default SearchEquipmentModal;
