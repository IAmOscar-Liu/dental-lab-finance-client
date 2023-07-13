import { CreateContractType, UpdateContractType } from "../types/contractTypes";

export const removeNonEquipmentFields = <T extends {}, K extends keyof T>(
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
  const filteredData: Record<string, any> = {
    contractNo: data.contractNo,
    name: data.name,
    customerId: data.customerId,
    customerName: data.customerName,
    type: data.type,
    status: data.status,
    attachment: data.attachment,
    signingDate: data.signingDate,
    remark: data.remark,
  };

  if (data.type === "SERVICE") {
    filteredData.contractPeriod = data.serviceContractDetail.contractPeriod;
    filteredData.billing = data.serviceContractDetail.billing;
  } else if (data.type === "SELL") {
    filteredData.equipmentType = data.sellContractDetail.equipmentType;
    filteredData.currency = data.sellContractDetail.currency;
    filteredData.quantity = data.sellContractDetail.quantity;
    filteredData.amount = data.sellContractDetail.amount;
    if (typeof data.sellContractDetail.totalAmount === "number")
      filteredData.totalAmount = data.sellContractDetail.totalAmount;
  } else {
    filteredData.equipmentType = data.leaseContractDetail.equipmentType;
    filteredData.currency = data.leaseContractDetail.currency;
    filteredData.contractPeriod = data.leaseContractDetail.contractPeriod;
    filteredData.quantity = data.leaseContractDetail.quantity;
    filteredData.amount = data.leaseContractDetail.amount;
    if (typeof data.leaseContractDetail.totalAmount === "number")
      filteredData.totalAmount = data.leaseContractDetail.totalAmount;
  }

  // console.log(filteredData);
  // debugger;

  return filteredData;
};
