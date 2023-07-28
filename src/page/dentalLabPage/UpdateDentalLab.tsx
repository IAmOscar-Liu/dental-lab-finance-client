import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomLoadingButton from "../../components/custom/CustomLoadingButton";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import DentalUpdateForm from "../../components/form/dentalLabForm/DentalUpdateForm";
import DentalUpdateFormSummary from "../../components/form/dentalLabForm/DentalUpdateFormSummary";
import { useInitialUpdateDentalLabData } from "../../hooks/useInitialUpdateData";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import {
  useGetDentalLabQuery,
  useUpdateDentalLabMutation,
} from "../../redux/dentalLabApi";
import { resetUpdateDentalLab } from "../../redux/dentalLabSlice";
import { store, useAppDispatch } from "../../redux/store";
import { UpdateDentalLabType } from "../../types/dentalLab";
import { hasDentalLabDataChanged } from "../../utils/compareData";
import style from "../UtilityForm.module.css";

function UpdateDentalLabComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number, data: UpdateDentalLabType) => ReactNode;
}) {
  const { dentalLabId } = useParams();
  const { data, isLoading, error } = useGetDentalLabQuery(
    { dentalLabId: dentalLabId ?? "" },
    {
      skip: !dentalLabId,
    }
  );
  const [updateDentalLab, { isLoading: isUpdating }] =
    useUpdateDentalLabMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const initialUpdateData = useInitialUpdateDentalLabData(
    data,
    currentStepIndex
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!dentalLabId) return <Navigate to="/dental-lab-management" />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating || isLastStep) return;
    if (!hasDentalLabDataChanged(data, store.getState().dentalLab.updateData))
      return window.alert("Nothing changes");
    next();
  };

  const handleUpdateDantalLab = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().dentalLab.updateData;
    // console.log(submitData);
    updateDentalLab(submitData)
      .unwrap()
      .then(() => {
        window.alert("Dental lab has been updated successfully!");
        dispatch(resetUpdateDentalLab());
        navigate(`/dental-lab-management/overview/${dentalLabId}`, {
          replace: true,
        });
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
        title="牙技所管理/更新牙技所"
        tailing={
          <Link to="/dental-lab-management">
            <AiOutlineLeft />
            回牙技所管理
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
              text="更新牙技所"
              isLoading={isUpdating}
              disabled={isUpdating || !isLastStep}
              onClick={handleUpdateDantalLab}
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

              {children(currentStepIndex, initialUpdateData)}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function UpdateDentalLab() {
  return (
    <UpdateDentalLabComp texts={["牙技所資料設定", "牙技所內容確認"]}>
      {(formStep, updateData) => {
        if (formStep === 0) return <DentalUpdateForm updateData={updateData} />;
        else if (formStep === 1) return <DentalUpdateFormSummary />;
        return null;
      }}
    </UpdateDentalLabComp>
  );
}

export default UpdateDentalLab;
