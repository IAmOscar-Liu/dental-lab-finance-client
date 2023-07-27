import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CustomLoadingButton from "../../components/custom/CustomLoadingButton";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import ContractForm from "../../components/form/contractForm/ContractForm";
import ContractFormSummary from "../../components/form/contractForm/ContractFormSummary";
import LeaseContractForm from "../../components/form/contractForm/LeaseContractForm";
import SellContractForm from "../../components/form/contractForm/SellContractForm";
import ServiceContractForm from "../../components/form/contractForm/ServiceContractForm";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import { useCreateContractMutation } from "../../redux/contractApi";
import { resetCreateContract } from "../../redux/contractSlice";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";

function CreateContractComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number) => ReactNode;
}) {
  const [createContract, { isLoading: isCreating }] =
    useCreateContractMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating || isLastStep) return;
    next();
  };

  const handleCreateContract = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().contract.createData;
    // console.log(submitData);
    createContract(submitData)
      .unwrap()
      .then(() => {
        window.alert("Contract has been created successfully!");
        dispatch(resetCreateContract());
        navigate("/contract-management", { replace: true });
      })
      .catch((error) => {
        console.error(error);
        window.alert("Something went wrong. Please try again!");
      });
  };

  return (
    <div className={style["utility-form"]}>
      <CustomPageTitle
        icon={<IoIosAddCircle />}
        title="合約管理/新增合約"
        tailing={
          <Link to="/Contract-management">
            <AiOutlineLeft />
            回合約管理
          </Link>
        }
      />

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
        <CustomLoadingButton
          text="新增合約"
          isLoading={isCreating}
          disabled={isCreating || !isLastStep}
          onClick={handleCreateContract}
        />
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

          {children(currentStepIndex)}
        </form>
      </div>
    </div>
  );
}

function CreateContract() {
  return (
    <CreateContractComp
      texts={["合約基本資料設定", "合約細節設定", "合約內容確認"]}
    >
      {(formStep) => {
        if (formStep === 0) return <ContractForm />;
        else if (formStep === 1) {
          const type = store.getState().contract.createData.type;
          if (type === "SERVICE") return <ServiceContractForm />;
          else if (type === "LEASE") return <LeaseContractForm />;
          return <SellContractForm />;
        } else if (formStep === 2) return <ContractFormSummary />;
        return null;
      }}
    </CreateContractComp>
  );
}

export default CreateContract;
