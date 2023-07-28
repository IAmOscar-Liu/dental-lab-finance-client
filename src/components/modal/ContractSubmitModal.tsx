import { FormEvent, forwardRef } from "react";
import { useSubmitContractMutation } from "../../redux/contractApi";
import {
  resetSubmitContract,
  setSubmitContract,
} from "../../redux/contractSlice";
import { store, useAppDispatch } from "../../redux/store";
import {
  CustomInputText,
  CustomInputTextByValue,
} from "../custom/CustomFormField";
import CustomLoadingButton from "../custom/CustomLoadingButton";
import style from "./ContractModal.module.css";

const ContractSubmitModal = forwardRef<
  HTMLDivElement,
  {
    closeModal: () => void;
    contractId: string;
    contractNo: string;
    contractName: string;
  }
>(({ closeModal, contractId, contractNo, contractName }, ref) => {
  const submitData = store.getState().contract.submitData;
  const dispatch = useAppDispatch();
  const [submitContract, { isLoading: isSubmitting }] =
    useSubmitContractMutation();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    const _submitData = store.getState().contract.submitData;
    submitContract({ id: contractId, ..._submitData })
      .unwrap()
      .then(() => {
        window.alert("Contract has been submitted successfully!");
        dispatch(resetSubmitContract());
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
            <h1>合約送審資料</h1>
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
              labelname="Applicant"
              initialValue={submitData.applicant}
              handleChange={(value) =>
                dispatch(
                  setSubmitContract({
                    applicant: value,
                  })
                )
              }
              required
              style={{ width: "100%" }}
            />
            <CustomInputText
              labelname="Reviewer"
              initialValue={submitData.reviewer}
              handleChange={(value) =>
                dispatch(
                  setSubmitContract({
                    reviewer: value,
                  })
                )
              }
              required
              style={{ width: "100%" }}
            />
          </div>
          <footer className={style.footer}>
            <CustomLoadingButton
              text="送出審核資料"
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
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

export default ContractSubmitModal;
