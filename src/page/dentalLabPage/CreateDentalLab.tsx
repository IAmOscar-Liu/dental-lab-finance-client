import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import DentalForm from "../../components/form/dentalLabForm/DentalForm";
import DentalSummarizeForm from "../../components/form/dentalLabForm/DentalSummarizeForm";
import { useCreateDentalLabMutation } from "../../redux/dentalLabApi";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";
import { resetCreateDentalLab } from "../../redux/dentalLabSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IoIosAddCircle } from "react-icons/io";

const FORM_STEPS = [<DentalForm />, <DentalSummarizeForm />];

function CreateDentalLab() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(currentStepIndex);
  const [createDentalLab, { isLoading: isCreating }] =
    useCreateDentalLabMutation();
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

  const handleCreateDantalLab = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().dentalLab.createData;
    // console.log(submitData);
    createDentalLab(submitData)
      .unwrap()
      .then(() => {
        window.alert("Dental lab has been created successfully!");
        dispatch(resetCreateDentalLab());
        navigate("/dental-lab-management", { replace: true });
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
        title="牙技所管理/新增牙技所"
        tailing={
          <Link to="/dental-lab-management">
            <AiOutlineLeft />
            回牙技所管理
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
            牙技所資料設定
          </button>
          <div className={style["underline-spacer"]}></div>
          <button
            className={currentStepIndex === 1 ? style.active : ""}
            onClick={() => goTo(1)}
          >
            <b>2</b>
            牙技所內容確認
          </button>
        </div>
        <button
          disabled={isCreating || !isLastStep}
          className={style.submit}
          onClick={handleCreateDantalLab}
        >
          <span style={{ opacity: isCreating ? 0 : 1 }}>新增牙技所</span>
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

export default CreateDentalLab;
