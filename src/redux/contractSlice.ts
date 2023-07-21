import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  ContractConfirmChargeDateType,
  ContractOperateType,
  ContractSubmitType,
  CreateContractType,
  UpdateContractType,
} from "../types/contractTypes";

const CREATE_DATA: CreateContractType = {
  contractNo: "",
  name: "",
  customerId: "",
  customerName: "",
  status: "CONFIRMING",
  type: "SERVICE",
  attachment: "",
  signingDate: "",
  remark: "",
  serviceContractDetail: {
    contractPeriod: 24,
    billing: {
      plan: "",
      periodUnit: "QUARTERLY",
      currency: "",
      basePrice: 2000,
      billingUnit: "OrderAmount",
      freeQuota: 500000,
      unitCharge: 0.01,
    },
  },
  leaseContractDetail: {
    equipmentType: "ART",
    contractPeriod: 24,
    currency: "",
    quantity: 1,
    amount: 10000,
    totalAmount: 10000,
  },
  sellContractDetail: {
    equipmentType: "ART",
    currency: "",
    quantity: 1,
    amount: 10000,
    totalAmount: 10000,
  },
};

const UPDATE_DATA: UpdateContractType = {
  ...CREATE_DATA,
  id: "",
  serviceContractDetail: {
    ...CREATE_DATA.serviceContractDetail,
    billing: {
      ...CREATE_DATA.serviceContractDetail.billing,
      id: "",
    },
  },
};

const SUBMIT_DATA: Omit<ContractSubmitType, "id"> = {
  applicant: "",
  reviewer: "",
};

const OPERATE_DATA: Omit<ContractOperateType, "id"> = {
  decision: "approve",
  operator: "",
  remark: "",
};

const CONFIRM_CHARGE_DATE_DATA: Omit<ContractConfirmChargeDateType, "id"> = {
  operator: "",
  chargeDate: "",
};

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    createData: CREATE_DATA,
    updateData: UPDATE_DATA,
    submitData: SUBMIT_DATA,
    operateData: OPERATE_DATA,
    confirmChargeDateData: CONFIRM_CHARGE_DATE_DATA,
  },
  reducers: {
    setCreateContract: (
      state,
      action: PayloadAction<Partial<CreateContractType>>
    ) => {
      state.createData = { ...state.createData, ...action.payload };
    },
    resetCreateContract: (state) => {
      state.createData = { ...CREATE_DATA };
    },
    setUpdateContract: (
      state,
      action: PayloadAction<Partial<UpdateContractType>>
    ) => {
      state.updateData = { ...state.updateData, ...action.payload };
    },
    resetUpdateContract: (state) => {
      state.updateData = { ...UPDATE_DATA };
    },
    setSubmitContract: (
      state,
      action: PayloadAction<Partial<ContractSubmitType>>
    ) => {
      state.submitData = { ...state.submitData, ...action.payload };
    },
    resetSubmitContract: (state) => {
      state.submitData = { ...SUBMIT_DATA };
    },
    setOperateContract: (
      state,
      action: PayloadAction<Partial<ContractOperateType>>
    ) => {
      state.operateData = { ...state.operateData, ...action.payload };
    },
    resetOperateContract: (state) => {
      state.operateData = { ...OPERATE_DATA };
    },
    setConfirmChargeDate: (
      state,
      action: PayloadAction<Partial<ContractConfirmChargeDateType>>
    ) => {
      state.confirmChargeDateData = {
        ...state.confirmChargeDateData,
        ...action.payload,
      };
    },
    resetConfirmChargeDate: (state) => {
      state.confirmChargeDateData = { ...CONFIRM_CHARGE_DATE_DATA };
    },
  },
});

export const {
  setCreateContract,
  resetCreateContract,
  setUpdateContract,
  resetUpdateContract,
  setSubmitContract,
  resetSubmitContract,
  setOperateContract,
  resetOperateContract,
  setConfirmChargeDate,
  resetConfirmChargeDate,
} = contractSlice.actions;
export default contractSlice.reducer;
