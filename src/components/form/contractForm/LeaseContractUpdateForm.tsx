import { setUpdateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch } from "../../../redux/store";
import { UpdateContractType } from "../../../types/contractTypes";
import { EQUIPMENT_TYPE_SELECTIONS } from "../../../types/equipmentTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextByValue,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function LeaseContractUpdateForm({
  updateData,
}: {
  updateData: UpdateContractType;
}) {
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
            initialValue={updateData.leaseContractDetail.equipmentType}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.updateData.leaseContractDetail,
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
            initialValue={updateData.leaseContractDetail.contractPeriod + ""}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.updateData.leaseContractDetail,
                    contractPeriod: +value,
                  },
                })
              )
            }
            required
          />
          <CustomInputText
            labelname="幣別"
            initialValue={updateData.leaseContractDetail.currency}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.updateData.leaseContractDetail,
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
            initialValue={updateData.leaseContractDetail.quantity + ""}
            handleChange={(value) => {
              const leaseContractDetail =
                store.getState().contract.updateData.leaseContractDetail;
              dispatch(
                setUpdateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.updateData.leaseContractDetail,
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
            initialValue={updateData.leaseContractDetail.amount + ""}
            handleChange={(value) => {
              const leaseContractDetail =
                store.getState().contract.updateData.leaseContractDetail;
              dispatch(
                setUpdateContract({
                  leaseContractDetail: {
                    ...store.getState().contract.updateData.leaseContractDetail,
                    amount: +value,
                    totalAmount: leaseContractDetail.quantity * +value,
                  },
                })
              );
            }}
            required
          />
          <CustomInputTextByValue
            labelname="設備總價"
            valueSelector={(state) =>
              (state.contract.updateData.leaseContractDetail.totalAmount ?? 0) +
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

export default LeaseContractUpdateForm;
