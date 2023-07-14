import {
  LeaseContractDetail,
  SellContractDetail,
  ServiceContractDetail,
  UpdateContractType,
} from "../types/contractTypes";
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

export const hasContractDataChanged = (
  oldData:
    | ServiceContractDetail
    | SellContractDetail
    | LeaseContractDetail
    | undefined,
  updatedData: UpdateContractType | undefined
) => {
  if (!oldData || !updatedData) return false;

  for (const [key, value] of Object.entries(updatedData)) {
    if (
      [
        "serviceContractDetail",
        "leaseContractDetail",
        "sellContractDetail",
      ].includes(key)
    )
      continue;
    if (((oldData as any)[key] ?? "") !== (value ?? "")) return true;
  }

  return false;
};
