import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateContractType, UpdateContractType } from "../types/contractTypes";

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

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    createData: CREATE_DATA,
    updateData: UPDATE_DATA,
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
  },
});

export const {
  setCreateContract,
  resetCreateContract,
  setUpdateContract,
  resetUpdateContract,
} = contractSlice.actions;
export default contractSlice.reducer;
