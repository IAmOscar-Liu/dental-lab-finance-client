import { setCreateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch, useAppSelector } from "../../../redux/store";
import { EQUIPMENT_TYPE_SELECTIONS } from "../../../types/equipmentTypes";
import {
  CustomInputSelect,
  CustomInputText,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function ShowTotalAmount() {
  const totalAmount = useAppSelector(
    (state) => state.contract.createData.leaseContractDetail.totalAmount
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

function LeaseContractForm() {
  const createData = store.getState().contract.createData;
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>設備租賃合約細節設定</h1>
      <div
        style={{ gridTemplateColumns: "1fr 2fr 1fr" }}
        className={style["form-body"]}
      >
        <div></div>
        <div className={style["left-form"]}>
          <CustomInputSelect
            labelname="設備類型"
            initialValue={createData.leaseContractDetail.equipmentType}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.createData.leaseContractDetail,
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
            labelname="合約周期(月)"
            initialValue={createData.leaseContractDetail.contractPeriod + ""}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.createData.leaseContractDetail,
                    contractPeriod: +value,
                  },
                })
              )
            }
            required
          />
          <CustomInputText
            labelname="幣別"
            initialValue={createData.leaseContractDetail.currency}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.createData.leaseContractDetail,
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
            initialValue={createData.leaseContractDetail.quantity + ""}
            handleChange={(value) => {
              const leaseContractDetail =
                store.getState().contract.createData.leaseContractDetail;
              dispatch(
                setCreateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.createData.leaseContractDetail,
                    quantity: +value,
                    totalAmount: +value * leaseContractDetail.amount,
                  },
                })
              );
            }}
            required
          />
          <CustomInputText
            labelname="設備單價"
            type="number"
            initialValue={createData.leaseContractDetail.amount + ""}
            handleChange={(value) => {
              const leaseContractDetail =
                store.getState().contract.createData.leaseContractDetail;
              dispatch(
                setCreateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.createData.leaseContractDetail,
                    amount: +value,
                    totalAmount: leaseContractDetail.quantity * +value,
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

export default LeaseContractForm;
