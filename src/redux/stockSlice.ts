import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CreateStockType, UpdateStockType } from "../types/stock";

const DATA: CreateStockType = {
  contractId: "",
  contractNo: "",
  contractName: "",
  inOutType: "IN",
  inOutTime: "",
  operator: "",
  remark: "",
  equipments: [],
};

const initialState: {
  createData: CreateStockType;
  updateData: UpdateStockType;
} = {
  createData: { ...DATA },
  updateData: { id: "", ...DATA },
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    setCreateStock: (
      state,
      action: PayloadAction<Partial<CreateStockType>>
    ) => {
      state.createData = { ...state.createData, ...action.payload };
    },
    resetCreateStock: (state) => {
      state.createData = { ...DATA };
    },
    setUpdateStock: (
      state,
      action: PayloadAction<Partial<UpdateStockType>>
    ) => {
      state.updateData = { ...state.updateData, ...action.payload };
    },
    resetUpdateStock: (state) => {
      state.updateData = { id: "", ...DATA };
    },
  },
});

export const {
  setCreateStock,
  resetCreateStock,
  setUpdateStock,
  resetUpdateStock,
} = stockSlice.actions;
export default stockSlice.reducer;
