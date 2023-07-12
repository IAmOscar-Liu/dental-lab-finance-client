import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import EquipmentUpdateForm from "../../components/form/equipmentForm/EquipmentUpdateForm";
import EquipmentUpdateSummarizeForm from "../../components/form/equipmentForm/EquipmentUpdateSummarizeForm";
import style from "../UtilityForm.module.css";
import { useState, useEffect, FormEvent } from "react";
import {
  useGetEquipmentQuery,
  useUpdateEquipmentMutation,
} from "../../redux/equipmentApi";
import { store, useAppDispatch } from "../../redux/store";
import {
  resetUpdateEquipment,
  setUpdateEquipment,
} from "../../redux/equipmentSlice";
import { hasEquipmentDataChanged } from "../../utils/compareData";
import { AiOutlineLeft } from "react-icons/ai";
import { MdBrowserUpdated } from "react-icons/md";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import LoadingSpinner from "../../components/LoadingSpinner";

const FORM_STEPS = [<EquipmentUpdateForm />, <EquipmentUpdateSummarizeForm />];

function UpdateEquipment() {
  const { equipmentId } = useParams();
  const { data, isLoading, error } = useGetEquipmentQuery(
    { equipmentId: equipmentId ?? "" },
    {
      skip: !equipmentId,
    }
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(currentStepIndex);
  const [updateEquipment, { isLoading: isUpdating }] =
    useUpdateEquipmentMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  useEffect(() => {
    if (!data) return;

    dispatch(
      setUpdateEquipment({
        id: data.id,
        amount: data.amount ?? 0,
        currency: data.currency ?? "",
        equipmentStatus: data.equipmentStatus ?? "Available",
        equipmentType: data.equipmentType ?? "ART",
        ownerId: data.ownerId,
        ownerType: data.ownerType ?? "DentalLab",
        receivedDate: data.receivedDate ?? "",
        warrantyDate: data.warrantyDate ?? "",
        remark: data.remark ?? "",
        serialNumber: data.serialNumber ?? "",
        serviceLife: data.serviceLife ?? 0,
      })
    );
  }, [data, dispatch]);

  useEffect(() => {
    setMaxStepIndex(Math.max(currentStepIndex, maxStepIndex));
    // eslint-disable-next-line
  }, [currentStepIndex]);

  if (!equipmentId) return <Navigate to="/equipment-management" />;

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
              {FORM_STEPS[currentStepIndex]}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateEquipment;
