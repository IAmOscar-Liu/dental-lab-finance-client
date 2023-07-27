import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomLoadingButton from "../../components/custom/CustomLoadingButton";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import StockUpdateForm from "../../components/form/stockForm/StockUpdateForm";
import StockUpdateFormSummary from "../../components/form/stockForm/StockUpdateFormSummary";
import { useGetCustomStockQuery } from "../../hooks/useGetCustomQuery";
import { useInitialUpdateStockData } from "../../hooks/useInitialUpdateData";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import { useUpdateStockMutation } from "../../redux/stockApi";
import { resetUpdateStock } from "../../redux/stockSlice";
import { store, useAppDispatch } from "../../redux/store";
import { UpdateStockType } from "../../types/StockTypes";
import { hasStockDataChanged } from "../../utils/compareData";
import style from "../UtilityForm.module.css";

function UpdateStockComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number, data: UpdateStockType) => ReactNode;
}) {
  const { stockId } = useParams();
  const { data, isLoading, error } = useGetCustomStockQuery({ stockId });
  const [updateStock, { isLoading: isUpdating }] = useUpdateStockMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const initialUpdateData = useInitialUpdateStockData(data, currentStepIndex);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (!stockId) return <Navigate to="/stock-management" />;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isUpdating || isLastStep) return;
    if (!hasStockDataChanged(data, store.getState().stock.updateData))
      return window.alert("Nothing changes");
    next();
  };

  const handleUpdateStock = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().stock.updateData;
    // console.log(submitData);
    updateStock(submitData)
      .unwrap()
      .then(() => {
        window.alert("Stock has been updated successfully!");
        dispatch(resetUpdateStock());
        navigate(`/stock-management/overview/${stockId}`, {
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
        title="庫存管理/更新庫存"
        tailing={
          <Link to="/stock-management">
            <AiOutlineLeft />
            回庫存管理
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
              text="更新庫存"
              isLoading={isUpdating}
              disabled={isUpdating || !isLastStep}
              onClick={handleUpdateStock}
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

function UpdateStock() {
  return (
    <UpdateStockComp texts={["庫存資料設定", "庫存內容確認"]}>
      {(formStep, updateData) => {
        if (formStep === 0) return <StockUpdateForm updateData={updateData} />;
        else if (formStep === 1) return <StockUpdateFormSummary />;
        return null;
      }}
    </UpdateStockComp>
  );
}

export default UpdateStock;
