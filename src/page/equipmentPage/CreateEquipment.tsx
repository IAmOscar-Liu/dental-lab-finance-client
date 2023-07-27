import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CustomLoadingButton from "../../components/custom/CustomLoadingButton";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import EquipmentForm from "../../components/form/equipmentForm/EquipmentForm";
import EquipmentFormSummary from "../../components/form/equipmentForm/EquipmentFormSummary";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import { useCreateEquipmentMutation } from "../../redux/equipmentApi";
import { resetCreateEquipment } from "../../redux/equipmentSlice";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";

function CreateEquipmentComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number) => ReactNode;
}) {
  const [createEquipment, { isLoading: isCreating }] =
    useCreateEquipmentMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating || isLastStep) return;
    next();
  };

  const handleCreateEquipment = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().equipment.createData;
    // console.log(submitData);
    createEquipment(submitData)
      .unwrap()
      .then(() => {
        window.alert("Equipment has been created successfully!");
        dispatch(resetCreateEquipment());
        navigate("/equipment-management", { replace: true });
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
        title="設備管理/新增設備"
        tailing={
          <Link to="/equipment-management">
            <AiOutlineLeft />
            回設備管理
          </Link>
        }
      />

      <div className={style["control-btns"]}>
        <div className={style["step-controller"]}>
          {texts.map((text, idx) => (
            <Fragment key={text}>
              {idx > 0 && <div className={style["underline-spacer"]}></div>}
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
          text="新增設備"
          isLoading={isCreating}
          disabled={isCreating || !isLastStep}
          onClick={handleCreateEquipment}
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

function CreateEquipment() {
  return (
    <CreateEquipmentComp texts={["設備資料設定", "設備內容確認"]}>
      {(formStep) => {
        if (formStep === 0) return <EquipmentForm />;
        else if (formStep === 1) return <EquipmentFormSummary />;
        return null;
      }}
    </CreateEquipmentComp>
  );
}

export default CreateEquipment;
