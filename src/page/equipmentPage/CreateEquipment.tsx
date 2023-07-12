import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EquipmentForm from "../../components/form/equipmentForm/EquipmentForm";
import EquipmentSummarizeForm from "../../components/form/equipmentForm/EquipmentSummarizeForm";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";
import { useCreateEquipmentMutation } from "../../redux/equipmentApi";
import { resetCreateEquipment } from "../../redux/equipmentSlice";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { AiOutlineLeft } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import LoadingSpinner from "../../components/LoadingSpinner";

const FORM_STEPS = [<EquipmentForm />, <EquipmentSummarizeForm />];

function CreateEquipment() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(currentStepIndex);
  const [createEquipment, { isLoading: isCreating }] =
    useCreateEquipmentMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  useEffect(() => {
    setMaxStepIndex(Math.max(currentStepIndex, maxStepIndex));
    // eslint-disable-next-line
  }, [currentStepIndex]);

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= FORM_STEPS.length - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goTo = (target: number) => {
    if (target <= currentStepIndex || maxStepIndex >= target)
      setCurrentStepIndex(target);
  };

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
          <button
            className={currentStepIndex === 0 ? style.active : ""}
            onClick={() => goTo(0)}
          >
            <b>1</b>
            設備資料設定
          </button>
          <div className={style["underline-spacer"]}></div>
          <button
            className={currentStepIndex === 1 ? style.active : ""}
            onClick={() => goTo(1)}
          >
            <b>2</b>
            設備內容確認
          </button>
        </div>
        <button
          disabled={isCreating || !isLastStep}
          className={style.submit}
          onClick={handleCreateEquipment}
        >
          <span style={{ opacity: isCreating ? 0 : 1 }}>新增設備</span>
          {isCreating && (
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

          {FORM_STEPS[currentStepIndex]}
        </form>
      </div>
    </div>
  );
}

export default CreateEquipment;
