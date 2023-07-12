import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  CreateEquipmentType,
  UpdateEquipmentType,
} from "../types/equipmentTypes";

const DATA: CreateEquipmentType = {
  equipmentType: "ART",
  serialNumber: "",
  currency: "",
  equipmentStatus: "Available",
  ownerId: "2f1f478e-cd71-4299-a0d2-ea32b565b404",
  ownerType: "DentalLab",
  amount: 10000,
  warrantyDate: "",
  receivedDate: "",
  serviceLife: 24,
  remark: "",
};

const initialState: {
  createData: CreateEquipmentType;
  updateData: UpdateEquipmentType;
} = {
  createData: { ...DATA },
  updateData: { id: "", ...DATA },
};

const equipmentSlice = createSlice({
  name: "equipment",
  initialState,
  reducers: {
    setCreateEquipment: (
      state,
      action: PayloadAction<Partial<CreateEquipmentType>>
    ) => {
      state.createData = { ...state.createData, ...action.payload };
    },
    resetCreateEquipment: (state) => {
      state.createData = { ...DATA };
    },
    setUpdateEquipment: (
      state,
      action: PayloadAction<Partial<UpdateEquipmentType>>
    ) => {
      state.updateData = { ...state.updateData, ...action.payload };
    },
    resetUpdateEquipment: (state) => {
      state.updateData = { id: "", ...DATA };
    },
  },
});

export const {
  setCreateEquipment,
  resetCreateEquipment,
  setUpdateEquipment,
  resetUpdateEquipment,
} = equipmentSlice.actions;
export default equipmentSlice.reducer;
