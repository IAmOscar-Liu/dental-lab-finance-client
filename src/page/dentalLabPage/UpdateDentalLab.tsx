import { FormEvent, useEffect, useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdBrowserUpdated } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import DentalUpdateForm from "../../components/form/dentalLabForm/DentalUpdateForm";
import DentalUpdateSummarizeForm from "../../components/form/dentalLabForm/DentalUpdateSummarizeForm";
import {
  useGetDentalLabQuery,
  useUpdateDentalLabMutation,
} from "../../redux/dentalLabApi";
import {
  resetUpdateDentalLab,
  setUpdateDentalLab,
} from "../../redux/dentalLabSlice";
import { store, useAppDispatch } from "../../redux/store";
import { hasDentalLabDataChanged } from "../../utils/compareData";
import style from "../UtilityForm.module.css";

const FORM_STEPS = [<DentalUpdateForm />, <DentalUpdateSummarizeForm />];

function UpdateDentalLab() {
  const { dentalId } = useParams();
  const { data, isLoading, error } = useGetDentalLabQuery(
    { dentalId: dentalId ?? "" },
    {
      skip: !dentalId,
    }
  );
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [maxStepIndex, setMaxStepIndex] = useState(currentStepIndex);
  const [updateDentalLab, { isLoading: isUpdating }] =
    useUpdateDentalLabMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === FORM_STEPS.length - 1;

  useEffect(() => {
    if (!data) return;

    dispatch(
      setUpdateDentalLab({
        id: data.id,
        name: data.name ?? "",
        status: data.status ?? "CONTACT",
        region: data.region ?? "EastAsia",
        country: data.country ?? "",
        state: data.state ?? "",
        city: data.city ?? "",
        address: data.address ?? "",
        phoneCode: data.phoneCode ?? "",
        phoneNumber: data.phoneNumber ?? "",
        contactPerson: data.contactPerson ?? "",
        email: data.email ?? "",
        uniformNo: data.uniformNo ?? "",
        remark: data.remark ?? "",
      })
    );
  }, [data, dispatch]);

  useEffect(() => {
    setMaxStepIndex(Math.max(currentStepIndex, maxStepIndex));
    // eslint-disable-next-line
  }, [currentStepIndex]);

  if (!dentalId) return <Navigate to="/dental-lab-management" />;

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
        navigate(`/dental-lab-management/overview/${dentalId}`, {
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
              disabled={isUpdating || !isLastStep}
              className={style.submit}
              onClick={handleUpdateDantalLab}
            >
              <span style={{ opacity: isUpdating ? 0 : 1 }}>更新牙技所</span>
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

export default UpdateDentalLab;
