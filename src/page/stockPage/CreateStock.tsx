import { FormEvent, Fragment, ReactNode } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import CustomLoadingButton from "../../components/custom/CustomLoadingButton";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import StockForm from "../../components/form/stockForm/StockForm";
import StockFormSummary from "../../components/form/stockForm/StockFormSummary";
import useMultiStepFormController from "../../hooks/useMultiStepFormController";
import { useCreateStockMutation } from "../../redux/stockApi";
import { resetCreateStock } from "../../redux/stockSlice";
import { store, useAppDispatch } from "../../redux/store";
import style from "../UtilityForm.module.css";

function CreateStockComp({
  texts,
  children,
}: {
  texts: string[];
  children: (currentStepIndex: number) => ReactNode;
}) {
  const [createStock, { isLoading: isCreating }] = useCreateStockMutation();
  const { currentStepIndex, isFirstStep, isLastStep, next, back, goTo } =
    useMultiStepFormController(texts.length);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isCreating || isLastStep) return;
    next();
  };

  const handleCreateStock = () => {
    if (!isLastStep) return;

    // handle API calls
    const submitData = store.getState().stock.createData;
    // console.log(submitData);
    createStock(submitData)
      .unwrap()
      .then(() => {
        window.alert("Stock has been created successfully!");
        dispatch(resetCreateStock());
        navigate("/stock-management", { replace: true });
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
        title="庫存管理/新增庫存"
        tailing={
          <Link to="/stock-management">
            <AiOutlineLeft />
            回庫存管理
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
          text="新增庫存"
          isLoading={isCreating}
          disabled={isCreating || !isLastStep}
          onClick={handleCreateStock}
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

function CreateStock() {
  return (
    <CreateStockComp texts={["庫存資料設定", "庫存內容確認"]}>
      {(formStep) => {
        if (formStep === 0) return <StockForm />;
        else if (formStep === 1) return <StockFormSummary />;
        return null;
      }}
    </CreateStockComp>
  );
}

export default CreateStock;
