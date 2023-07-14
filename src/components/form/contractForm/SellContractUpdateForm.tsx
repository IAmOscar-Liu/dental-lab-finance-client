import { setUpdateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch, useAppSelector } from "../../../redux/store";
import { UpdateContractType } from "../../../types/contractTypes";
import { EQUIPMENT_TYPE_SELECTIONS } from "../../../types/equipmentTypes";
import {
  CustomInputSelect,
  CustomInputText,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function ShowTotalAmount() {
  const totalAmount = useAppSelector(
    (state) => state.contract.updateData.sellContractDetail.totalAmount
  );
  return (
    <CustomInputText
      labelname="設備總價"
      initialValue={(totalAmount ?? 0) + ""}
      handleChange={(_) => {}}
      editable={false}
    />
  );
}

function SellContractUpdateForm({
  updateData,
}: {
  updateData: UpdateContractType;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>設備買賣合約細節設定</h1>
      <div
        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        className={style["form-body"]}
      >
        <div></div>
        <div className={style["left-form"]}>
          <CustomInputSelect
            labelname="設備類型"
            initialValue={updateData.sellContractDetail.equipmentType}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  sellContractDetail: {
                    ...store.getState().contract.updateData.sellContractDetail,
                    equipmentType:
                      value as (typeof EQUIPMENT_TYPE_SELECTIONS)[number],
                  },
                })
              )
            }
            groupSelections={EQUIPMENT_TYPE_SELECTIONS}
            groupTexts={["Unknown", "ART"]}
          />
          <CustomInputText
            labelname="幣別"
            initialValue={updateData.sellContractDetail.currency}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  sellContractDetail: {
                    ...store.getState().contract.updateData.sellContractDetail,
                    currency: value,
                  },
                })
              )
            }
            required
          />
          <CustomInputText
            labelname="設備數量"
            type="number"
            initialValue={updateData.sellContractDetail.quantity + ""}
            handleChange={(value) => {
              const sellContractDetail =
                store.getState().contract.updateData.sellContractDetail;
              dispatch(
                setUpdateContract({
                  sellContractDetail: {
                    ...sellContractDetail,
                    quantity: +value,
                    totalAmount: +value * sellContractDetail.amount,
                  },
                })
              );
            }}
            required
          />
          <CustomInputText
            labelname="設備單價"
            type="number"
            initialValue={updateData.sellContractDetail.amount + ""}
            handleChange={(value) => {
              const sellContractDetail =
                store.getState().contract.updateData.sellContractDetail;
              dispatch(
                setUpdateContract({
                  sellContractDetail: {
                    ...sellContractDetail,
                    amount: +value,
                    totalAmount: sellContractDetail.quantity * +value,
                  },
                })
              );
            }}
            required
          />
          <ShowTotalAmount />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SellContractUpdateForm;
