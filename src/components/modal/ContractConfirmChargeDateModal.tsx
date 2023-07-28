import { FormEvent, forwardRef } from "react";
import { useConfirmChargeDateMutation } from "../../redux/contractApi";
import {
  resetConfirmChargeDate,
  setConfirmChargeDate,
} from "../../redux/contractSlice";
import { store, useAppDispatch } from "../../redux/store";
import {
  CustomInputText,
  CustomInputTextByValue,
} from "../custom/CustomFormField";
import CustomLoadingButton from "../custom/CustomLoadingButton";
import style from "./ContractModal.module.css";

const ContractConfirmChargeDateModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    contractId: string;
    contractNo: string;
    contractName: string;
  }
>(({ closeModal, contractId, contractNo, contractName }, ref) => {
  const confirmChargeDateData = store.getState().contract.confirmChargeDateData;
  const dispatch = useAppDispatch();
  const [confirmChargeDate, { isLoading: isConfirming }] =
    useConfirmChargeDateMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isConfirming) return;

    const _confirmChargeDateData =
      store.getState().contract.confirmChargeDateData;
    confirmChargeDate({ id: contractId, ..._confirmChargeDateData })
      .unwrap()
      .then(() => {
        window.alert("Contract's charge date has been confirmed successfully!");
        dispatch(resetConfirmChargeDate());
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong. Please try again!");
      });
  };

  return (
    <div className={style.modal}>
      <div ref={ref} className={style["modal-body"]}>
        <form onSubmit={handleSubmit} className={style.form}>
          <header className={style.header}>
            <h1>設定合約收費起始日</h1>
          </header>
          <div className={style["modal-body-result"]}>
            <CustomInputTextByValue
              labelname="合約名稱"
              valueSelector={() => contractName}
              handleChange={(_) => {}}
              editable={false}
            />
            <CustomInputTextByValue
              labelname="合約編號"
              valueSelector={() => contractNo}
              handleChange={(_) => {}}
              editable={false}
            />
            <CustomInputText
              labelname="Operator"
              initialValue={confirmChargeDateData.operator}
              handleChange={(value) =>
                dispatch(
                  setConfirmChargeDate({
                    operator: value,
                  })
                )
              }
              required
            />
            <CustomInputText
              labelname="收費起始日"
              type="date"
              placeholder="yyyy/mm/dd"
              initialValue={confirmChargeDateData.chargeDate.slice(0, 10)}
              handleChange={(value) =>
                dispatch(
                  setConfirmChargeDate({
                    chargeDate: value,
                  })
                )
              }
              required
              style={{ width: "70%" }}
            />
          </div>
          <footer className={style.footer}>
            <CustomLoadingButton
              text="送出收費起始日"
              type="submit"
              isLoading={isConfirming}
              disabled={isConfirming}
            />
            <button type="button" onClick={closeModal}>
              取消
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
});

export default ContractConfirmChargeDateModal;
