import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import ContractUpdateForm from "../../components/form/contractForm/ContractUpdateForm";
import ContractUpdateFormSummary from "../../components/form/contractForm/ContractUpdateFormSummary";
import LeaseContractUpdateForm from "../../components/form/contractForm/LeaseContractUpdateForm";
import SellContractUpdateForm from "../../components/form/contractForm/SellContractUpdateForm";
import ServiceContractUpdateForm from "../../components/form/contractForm/ServiceContractUpdateForm";
import { useInitialUpdateContractData } from "../../hooks/useInitialUpdateData";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import {
  useGetContractQuery,
  useUpdateContractMutation,
} from "../../redux/contractApi";
import { resetUpdateContract } from "../../redux/contractSlice";
import { store, useAppDispatch } from "../../redux/store";
import { UpdateContractType, getContractType } from "../../types/contractTypes";
import style from "../UtilityForm.module.css";
import { hasContractDataChanged } from "../../utils/compareData";

function UpdateContractComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number, data: UpdateContractType) => ReactNode;
}) {
  const { contractType, contractId } = useParams();
  const { data, isLoading, error } = useGetContractQuery({
    contractType: getContractType(contractType),
    contractId: contractId ?? "",
  });
  const [updateContract, { isLoading: isUpdating }] =
    useUpdateContractMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const initialUpdateData = useInitialUpdateContractData(
    data,
    currentStepIndex
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!contractType || !contractId)
    return <Navigate to="/contract-management" />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating || isLastStep) return;
    if (
      currentStepIndex === 1 &&
      !hasContractDataChanged(data, store.getState().contract.updateData)
    )
      return window.alert("Nothing changes");
    next();
  };

  const handleUpdateContract = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().contract.updateData;
    // console.log(submitData);
    updateContract(submitData)
      .unwrap()
      .then(() => {
        window.alert("Contract has been updated successfully!");
        dispatch(resetUpdateContract());
        navigate(
          `/contract-management/overview/${contractType}/${contractId}`,
          {
            replace: true,
          }
        );
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong. Please try again!");
      });
  };

  return (
    <div className={style["utility-form"]}>
      <CustomPageTitle
        icon={<MdUpdate />}
        title="合約管理/更新合約"
        tailing={
          <Link to="/contract-management">
            <AiOutlineLeft />
            回合約管理
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <>
          <div className={style["control-btns"]}>
            <div className={style["step-controller"]}>
              {texts.map((text, idx) => (
                <Fragment key={text}>
                  {idx > 0 && (
                    <div
                      style={{ width: "6vw" }}
                      className={style["underline-spacer"]}
                    ></div>
                  )}
                  <button
                    className={currentStepIndex === idx ? style.active : ""}
                    onClick={() => goTo(idx)}
                  >
                    <b>{idx + 1}</b>
                    {text}
                  </button>
                </Fragment>
              ))}
            </div>
            <button
              disabled={isUpdating || !isLastStep}
              className={style.submit}
              onClick={handleUpdateContract}
            >
              <span style={{ opacity: isUpdating ? 0 : 1 }}>更新合約</span>
              {isUpdating && (
                <div className={style["spinner-wrapper"]}>
                  <LoadingSpinner />
                </div>
              )}
            </button>
          </div>

          <div className={style["form-wrapper"]}>
            <form onSubmit={handleSubmit}>
              <div className={style["multi-step-btns"]}>
                <div className="flex"></div>
                <button type="button" onClick={back} disabled={isFirstStep}>
                  上一步
                </button>
                <button type="submit" disabled={isLastStep}>
                  下一步
                </button>
              </div>

              {children(currentStepIndex, initialUpdateData)}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function UpdateContract() {
  return (
    <UpdateContractComp
      texts={["合約基本資料設定", "合約細節設定", "合約內容確認"]}
    >
      {(formStep, updateData) => {
        if (formStep === 0)
          return <ContractUpdateForm updateData={updateData} />;
        else if (formStep === 1 && updateData.type === "SERVICE")
          return <ServiceContractUpdateForm updateData={updateData} />;
        else if (formStep === 1 && updateData.type === "LEASE")
          return <LeaseContractUpdateForm updateData={updateData} />;
        else if (formStep === 1 && updateData.type === "SELL")
          return <SellContractUpdateForm updateData={updateData} />;
        else if (formStep === 2) return <ContractUpdateFormSummary />;
        return null;
      }}
    </UpdateContractComp>
  );
}

export default UpdateContract;
