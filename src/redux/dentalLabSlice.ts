import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  CreateDentalLabType,
  UpdateDentalLabType,
} from "../types/dentalLabTypes";

const DATA: CreateDentalLabType = Object.freeze({
  name: "",
  status: "CONTACT",
  region: "EastAsia",
  country: "",
  state: "",
  city: "",
  address: "",
  phoneCode: "",
  phoneNumber: "",
  contactPerson: "",
  email: "",
  uniformNo: "",
  remark: "",
});

const initialState: {
  createData: CreateDentalLabType;
  updateData: UpdateDentalLabType;
} = {
  createData: { ...DATA },
  updateData: { id: "", ...DATA },
};

const dentalLabSlice = createSlice({
  name: "dentalLab",
  initialState,
  reducers: {
    setCreateDentalLab: (
      state,
      action: PayloadAction<Partial<CreateDentalLabType>>
    ) => {
      state.createData = { ...state.createData, ...action.payload };
    },
    resetCreateDentalLab: (state) => {
      state.createData = { ...DATA };
    },
    setUpdateDentalLab: (
      state,
      action: PayloadAction<Partial<UpdateDentalLabType>>
    ) => {
      state.updateData = { ...state.updateData, ...action.payload };
    },
    resetUpdateDentalLab: (state) => {
      state.updateData = { id: "", ...DATA };
    },
  },
});

export const {
  setCreateDentalLab,
  resetCreateDentalLab,
  setUpdateDentalLab,
  resetUpdateDentalLab,
} = dentalLabSlice.actions;
export default dentalLabSlice.reducer;
