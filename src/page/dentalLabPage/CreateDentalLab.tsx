import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import DentalForm from "../../components/form/dentalLabForm/DentalForm";
import DentalSummarizeForm from "../../components/form/dentalLabForm/DentalSummarizeForm";
import usePageController from "../../hooks/usePageController";
import { useCreateDentalLabMutation } from "../../redux/dentalLabApi";
import { resetCreateDentalLab } from "../../redux/dentalLabSlice";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";

function CreateDentalLabComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number) => ReactNode;
}) {
  const [createDentalLab, { isLoading: isCreating }] =
    useCreateDentalLabMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    usePageController(texts.length);

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

          {children(currentStepIndex)}
        </form>
      </div>
    </div>
  );
}

function CreateDentalLab() {
  return (
    <CreateDentalLabComp texts={["牙技所資料設定", "牙技所內容確認"]}>
      {(index) => {
        if (index === 0) return <DentalForm />;
        else if (index === 1) return <DentalSummarizeForm />;
        return null;
      }}
    </CreateDentalLabComp>
  );
}

export default CreateDentalLab;
