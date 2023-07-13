import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdBrowserUpdated } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import EquipmentUpdateForm from "../../components/form/equipmentForm/EquipmentUpdateForm";
import EquipmentUpdateFormSummary from "../../components/form/equipmentForm/EquipmentUpdateFormSummary";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import { useUpdateEquipmentMutation } from "../../redux/equipmentApi";
import { resetUpdateEquipment } from "../../redux/equipmentSlice";
import { store, useAppDispatch } from "../../redux/store";
import { EquipmentDetail } from "../../types/equipmentTypes";
import { hasEquipmentDataChanged } from "../../utils/compareData";
import style from "../UtilityForm.module.css";
import useGetCustomEquipmentQuery from "../../hooks/useGetCustomEquipmentQuery";

function UpdateEquipmentComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number, data: EquipmentDetail) => ReactNode;
}) {
  const { equipmentId } = useParams();
  const { data, isLoading, error } = useGetCustomEquipmentQuery({
    equipmentId,
  });
  const [updateEquipment, { isLoading: isUpdating }] =
    useUpdateEquipmentMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!equipmentId) return <Navigate to="/equipment-management" />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating || isLastStep) return;
    if (!hasEquipmentDataChanged(data, store.getState().equipment.updateData))
      return window.alert("Nothing changes");
    next();
  };

  const handleUpdateEquipment = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().equipment.updateData;
    // console.log(submitData);
    updateEquipment(submitData)
      .unwrap()
      .then(() => {
        window.alert("Dental lab has been updated successfully!");
        dispatch(resetUpdateEquipment());
        navigate(`/equipment-management/overview/${equipmentId}`, {
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
        icon={<MdBrowserUpdated />}
        title="設備管理/更新設備"
        tailing={
          <Link to="/equipment-management">
            <AiOutlineLeft />
            回設備管理
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
            <button
              disabled={isUpdating || !isLastStep}
              className={style.submit}
              onClick={handleUpdateEquipment}
            >
              <span style={{ opacity: isUpdating ? 0 : 1 }}>更新設備</span>
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

              {children(currentStepIndex, data!)}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

function UpdateEquipment() {
  return (
    <UpdateEquipmentComp texts={["牙技所資料設定", "牙技所內容確認"]}>
      {(formStep, data) => {
        if (formStep === 0) return <EquipmentUpdateForm data={data} />;
        else if (formStep === 1) return <EquipmentUpdateFormSummary />;
        return null;
      }}
    </UpdateEquipmentComp>
  );
}

export default UpdateEquipment;
