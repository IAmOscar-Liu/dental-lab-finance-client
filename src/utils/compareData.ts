import { DentalLab, UpdateDentalLabType } from "../types/dentalLabTypes";
import { EquipmentDetail, UpdateEquipmentType } from "../types/equipmentTypes";

export const hasDentalLabDataChanged = (
  oldData: DentalLab | undefined,
  updatedData: UpdateDentalLabType | undefined
) => {
  if (!oldData || !updatedData) return false;

  for (const [key, value] of Object.entries(updatedData)) {
    if (((oldData as any)[key] ?? "") !== (value ?? "")) return true;
  }

  return false;
};

export const hasEquipmentDataChanged = (
  oldData: EquipmentDetail | undefined,
  updatedData: UpdateEquipmentType | undefined
) => {
  if (!oldData || !updatedData) return false;

  for (const [key, value] of Object.entries(updatedData)) {
    if (((oldData as any)[key] ?? "") !== (value ?? "")) return true;
  }

  return false;
};
