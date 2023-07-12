import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateContractType, UpdateContractType } from "../types/contractTypes";

const DATA: CreateContractType = {
  contractNo: "",
  name: "",
  customerId: "",
  customerName: "",
  status: "PROCESS",
  attachment: "",
  chargeDate: "",
  remark: "",
  type: "SERVICE",
  serviceContractDetail: {
    billing: {
      id: "",
      plan: "",
      periodUnit: "QUARTERLY",
      currency: "",
      basePrice: 10000,
      contractType: "",
      billingUnit: "OrderAmount",
      freeQuota: 1,
      unitCharge: 1,
    },
  },
  sellContractDetail: {
    amount: 0,
    currency: "",
    equipments: [],
  },
  leaseContractDetail: {
    equipmentType: "LEASE",
    quantity: 1,
    startTime: "",
    endTime: "",
    billing: {
      id: "",
      plan: "",
      periodUnit: "QUARTERLY",
      currency: "",
      amount: 1,
      freeQuota: 1000,
      billingUnit: "OrderAmount",
      unitCharge: 1,
    },
    equipments: [],
  },
};

const initialState: {
  createData: CreateContractType;
  updateData: UpdateContractType;
} = {
  createData: { ...DATA },
  updateData: { id: "", ...DATA },
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setCreateContract: (
      state,
      action: PayloadAction<Partial<CreateContractType>>
    ) => {
      state.createData = { ...state.createData, ...action.payload };
    },
    resetCreateContract: (state) => {
      state.createData = { ...DATA };
    },
    setUpdateContract: (
      state,
      action: PayloadAction<Partial<UpdateContractType>>
    ) => {
      state.updateData = { ...state.updateData, ...action.payload };
    },
    resetUpdateContract: (state) => {
      state.updateData = { id: "", ...DATA };
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
