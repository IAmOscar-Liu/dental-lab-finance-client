import { CreateStockType } from "../types/stock";
import { CreateContractType, UpdateContractType } from "../types/contract";

export const removeUnWantedFields = <T extends {}, K extends keyof T>(
  data: T,
  omitFields: K[]
) => {
  const filteredData: Partial<T> = {};

  for (const [key, value] of Object.entries(data)) {
    if (!omitFields.includes(key as K)) {
      filteredData[key as K] = value as T[K];
    }
  }

  return filteredData;
};

export const removeNonContractFields = (
  data: CreateContractType | Omit<UpdateContractType, "id">
) => {
  const {
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
  } = data;

  const filteredData: Record<string, any> = {
    contractNo,
    name,
    customerId,
    customerName,
    type,
    status,
    attachment,
    signingDate,
    remark,
  };

  if (type === "SERVICE") {
    const {
      contractPeriod,
      billing: { createdTime, modifiedTime, ...restBilling },
    } = serviceContractDetail;
    filteredData.contractPeriod = contractPeriod;
    filteredData.billing = restBilling;
  } else if (type === "LEASE") {
    const { equipmentType, contractPeriod, currency, quantity, amount } =
      leaseContractDetail;
    filteredData.equipmentType = equipmentType;
    filteredData.currency = currency;
    filteredData.contractPeriod = contractPeriod;
    filteredData.quantity = quantity;
    filteredData.amount = amount;
  } else {
    const { equipmentType, currency, quantity, amount } = sellContractDetail;
    filteredData.equipmentType = equipmentType;
    filteredData.currency = currency;
    filteredData.quantity = quantity;
    filteredData.amount = amount;
  }

  // console.log(filteredData);
  // debugger;

  return filteredData;
};

export const removeNonStockFields = (
  data: Omit<CreateStockType, "inOutType">
) => {
  const { contractName, contractNo, equipments, ...rest } = data;

  const filterData: Record<string, any> = { ...rest };
  filterData.equipments = equipments.map((eq) => eq.id);

  return filterData;
};
