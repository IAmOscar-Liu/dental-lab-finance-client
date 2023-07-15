import { setCreateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch } from "../../../redux/store";
import { EQUIPMENT_TYPE_SELECTIONS } from "../../../types/equipmentTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextByValue,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function SellContractForm() {
  const createData = store.getState().contract.createData;
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
            initialValue={createData.sellContractDetail.equipmentType}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  sellContractDetail: {
                    ...store.getState().contract.createData.sellContractDetail,
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
            initialValue={createData.sellContractDetail.currency}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  sellContractDetail: {
                    ...store.getState().contract.createData.sellContractDetail,
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
            initialValue={createData.sellContractDetail.quantity + ""}
            handleChange={(value) => {
              const sellContractDetail =
                store.getState().contract.createData.sellContractDetail;
              dispatch(
                setCreateContract({
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
            initialValue={createData.sellContractDetail.amount + ""}
            handleChange={(value) => {
              const sellContractDetail =
                store.getState().contract.createData.sellContractDetail;
              dispatch(
                setCreateContract({
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
          <CustomInputTextByValue
            labelname="設備總價"
            valueSelector={(state) =>
              (state.contract.createData.sellContractDetail.totalAmount ?? 0) +
              ""
            }
            editable={false}
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SellContractForm;
