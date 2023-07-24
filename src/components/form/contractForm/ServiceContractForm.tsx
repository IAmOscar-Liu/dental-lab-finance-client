import { setCreateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch } from "../../../redux/store";
import {
  BILLING_PERIOD_UNIT_SELECTIONS,
  BILLING_UNIT,
  BillingPeriodUnit,
  BillingUnit,
} from "../../../types/contractTypes";
import {
  CustomInputText,
  CustomRadioField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function ServiceContractForm() {
  const createData = store.getState().contract.createData;
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>服務平台合約細節設定</h1>
      <div
        style={{ gridTemplateColumns: "1fr 3fr 1fr" }}
        className={style["form-body"]}
      >
        <div></div>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="合約周期(月)"
            type="number"
            initialValue={createData.serviceContractDetail.contractPeriod + ""}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...store.getState().contract.createData
                      .serviceContractDetail,
                    contractPeriod: +value,
                  },
                })
              )
            }
            required
          />
          <CustomInputText
            labelname="Billing Plan"
            initialValue={createData.serviceContractDetail.billing.plan ?? ""}
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      plan: value,
                    },
                  },
                })
              );
            }}
            required
          />
          <CustomRadioField
            labelname="Billing Period Unit"
            initialValue={
              createData.serviceContractDetail.billing.periodUnit || "QUARTERLY"
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      periodUnit: value as BillingPeriodUnit,
                    },
                  },
                })
              );
            }}
            radioGroupSelections={BILLING_PERIOD_UNIT_SELECTIONS}
            radioGroupTexts={["MONTHLY", "QUARTERLY", "YEARLY"]}
          />
          <CustomInputText
            labelname="Billing Currency"
            initialValue={
              createData.serviceContractDetail.billing.currency ?? ""
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      currency: value,
                    },
                  },
                })
              );
            }}
            required
          />
          <CustomInputText
            labelname="Billing Base Price"
            type="number"
            initialValue={
              (createData.serviceContractDetail.billing.basePrice ?? 0) + ""
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      basePrice: +value,
                    },
                  },
                })
              );
            }}
            required
          />
          <CustomRadioField
            labelname="Billing Unit"
            initialValue={
              createData.serviceContractDetail.billing.billingUnit ||
              "OrderCount"
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      billingUnit: value as BillingUnit,
                    },
                  },
                })
              );
            }}
            radioGroupSelections={BILLING_UNIT}
            radioGroupTexts={["OrderCount", "OrderAmount"]}
          />
          <CustomInputText
            labelname="Billing Free Quota"
            type="number"
            initialValue={
              (createData.serviceContractDetail.billing.freeQuota ?? 0) + ""
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      freeQuota: +value,
                    },
                  },
                })
              );
            }}
            required
          />
          <CustomInputText
            labelname="Billing Unit Charge"
            type="number"
            step={0.01}
            initialValue={
              (createData.serviceContractDetail.billing.unitCharge ?? 0) + ""
            }
            handleChange={(value) => {
              const serviceContractDetail =
                store.getState().contract.createData.serviceContractDetail;
              dispatch(
                setCreateContract({
                  serviceContractDetail: {
                    ...serviceContractDetail,
                    billing: {
                      ...serviceContractDetail.billing,
                      unitCharge: +value,
                    },
                  },
                })
              );
            }}
            required
          />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default ServiceContractForm;
