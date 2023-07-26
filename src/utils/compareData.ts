import { StockInOutDetail, UpdateStockType } from "../types/StockTypes";
import {
  LeaseContractDetail,
  SellContractDetail,
  ServiceContractDetail,
  UpdateContractType,
} from "../types/contractTypes";
import { DentalLabDetail, UpdateDentalLabType } from "../types/dentalLabTypes";
import { EquipmentDetail, UpdateEquipmentType } from "../types/equipmentTypes";

export const hasStockDataChanged = (
  oldData: StockInOutDetail | undefined,
  updatedData: UpdateStockType | undefined
) => {
  if (!oldData || !updatedData) return false;

  const { contractNo, contractName, equipments, ...rest } = updatedData;

  for (const [key, value] of Object.entries(rest)) {
    if (((oldData as any)[key] ?? "") !== (value ?? "")) return true;
  }

  if (equipments.length !== (oldData.equipments || []).length) return true;

  for (const { id } of equipments) {
    if (!oldData.equipments?.find((eq) => eq.id === id)) return true;
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

export const hasDentalLabDataChanged = (
  oldData: DentalLabDetail | undefined,
  updatedData: UpdateDentalLabType | undefined
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

  const {
    id,
    contractNo,
    name,
    customerId,
    customerName,
    status,
    type,
    attachment,
    signingDate,
    remark,
    serviceContractDetail,
    leaseContractDetail,
    sellContractDetail,
  } = updatedData;

  const flattenUpdatedData: Record<string, any> = {
    id,
    contractNo,
    name,
    customerId,
    customerName,
    status,
    type,
    attachment,
    signingDate,
    remark,
  };

  if (type === "SERVICE") {
    const {
      contractPeriod,
      billing: { id, createdTime, modifiedTime, ...restBilling },
    } = serviceContractDetail;
    flattenUpdatedData.contractPeriod = contractPeriod;
    flattenUpdatedData.billing = restBilling;
  } else if (type === "LEASE") {
    const { equipmentType, contractPeriod, currency, quantity, amount } =
      leaseContractDetail;
    flattenUpdatedData.equipmentType = equipmentType;
    flattenUpdatedData.contractPeriod = contractPeriod;
    flattenUpdatedData.currency = currency;
    flattenUpdatedData.quantity = quantity;
    flattenUpdatedData.amount = amount;
  } else {
    const { equipmentType, currency, quantity, amount } = sellContractDetail;
    flattenUpdatedData.equipmentType = equipmentType;
    flattenUpdatedData.currency = currency;
    flattenUpdatedData.quantity = quantity;
    flattenUpdatedData.amount = amount;
  }

  // console.log(oldData);
  // console.log(flattenUpdatedData);
  // debugger;

  for (const [key, value] of Object.entries(flattenUpdatedData)) {
    const oldDataValue = (oldData as any)[key] ?? "";

    if (key === "billing") {
      if (!compareObject(oldDataValue, value)) return true;
    } else {
      if (oldDataValue !== (value ?? "")) return true;
    }
  }

  return false;
};

const compareObject = (oldDataValue: any, updatedDataValue: any) => {
  for (const [key, value] of Object.entries(updatedDataValue)) {
    if (oldDataValue[key] !== value) return false;
  }
  return true;
};
