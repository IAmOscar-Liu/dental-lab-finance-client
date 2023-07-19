import { FormEvent, forwardRef } from "react";
import { useOperateContractMutation } from "../../redux/contractApi";
import {
  resetOperateContract,
  setOperateContract,
} from "../../redux/contractSlice";
import { store, useAppDispatch } from "../../redux/store";
import { CONTRACT_OPERATE_DECISION_SELECTIONS } from "../../types/contractTypes";
import LoadingSpinner from "../LoadingSpinner";
import {
  CustomInputText,
  CustomInputTextArea,
  CustomInputTextByValue,
  CustomRadioField,
} from "../custom/CustomFormField";
import style from "./ContractModal.module.css";

const ContractOperateModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    contractId: string;
    contractNo: string;
    contractName: string;
  }
>(({ closeModal, contractId, contractNo, contractName }, ref) => {
  const operateData = store.getState().contract.operateData;
  const dispatch = useAppDispatch();
  const [operateContract, { isLoading: isOperating }] =
    useOperateContractMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isOperating) return;

    const _operateData = store.getState().contract.operateData;
    operateContract({
      id: contractId,
      ..._operateData,
    })
      .unwrap()
      .then(() => {
        window.alert("Contract has been submitted successfully!");
        dispatch(resetOperateContract());
        closeModal();
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong. Please try again!");
      });
  };

  return (
    <div className={style.modal}>
      <div
        ref={ref}
        className={style["modal-body"]}
        style={{ height: "clamp(500px, 60vh, 700px)" }}
      >
        <form onSubmit={handleSubmit} className={style.form}>
          <header className={style.header}>
            <h1>合約審核結果</h1>
          </header>
          <div className={style["modal-body-result"]}>
            <CustomInputTextByValue
              labelname="合約名稱"
              valueSelector={() => contractName}
              editable={false}
            />
            <CustomInputTextByValue
              labelname="合約編號"
              valueSelector={() => contractNo}
              editable={false}
            />
            <CustomRadioField
              labelname="審核結果"
              initialValue={operateData.decision}
              radioGroupSelections={CONTRACT_OPERATE_DECISION_SELECTIONS}
              radioGroupTexts={CONTRACT_OPERATE_DECISION_SELECTIONS.map(
                (selection) => selection[0].toUpperCase() + selection.slice(1)
              )}
              handleChange={(value) =>
                dispatch(
                  setOperateContract({
                    decision:
                      value as (typeof CONTRACT_OPERATE_DECISION_SELECTIONS)[number],
                  })
                )
              }
            />
            <CustomInputText
              labelname="Operator"
              initialValue={operateData.operator}
              handleChange={(value) =>
                dispatch(
                  setOperateContract({
                    operator: value,
                  })
                )
              }
              required
              style={{ width: "100%" }}
            />
            <CustomInputTextArea
              labelname="Remark"
              initialValue={operateData.remark}
              handleChange={(value) =>
                dispatch(
                  setOperateContract({
                    remark: value,
                  })
                )
              }
              rows={4}
              style={{ width: "100%" }}
            />
          </div>
          <footer className={style.footer}>
            <button type="submit" disabled={isOperating}>
              <span style={{ opacity: isOperating ? 0 : 1 }}>送出審核結果</span>
              {isOperating && (
                <div className={style["spinner-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </button>
            <button type="button" onClick={closeModal}>
              取消
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
});

export default ContractOperateModal;
