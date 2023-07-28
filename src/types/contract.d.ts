import { NonNullableFields, NullableFields } from ".";
import {
  BILLING_PERIOD_UNIT_SELECTIONS,
  BILLING_UNIT,
  CONTRACT_DISPLAY_TYPE_SELECTIONS,
  CONTRACT_OPERATE_DECISION_SELECTIONS,
  CONTRACT_STATUS_SELECTIONS,
  CONTRACT_TYPE_SELECTIONS,
  UPDATE_CONTRACT_OMIT_FIELDS,
} from "../constant/contract";
import { EquipmentType } from "./equipment";

type ContractResultFromAPI = { id: string } & NullableFields<{
  contractNo: string;
  name: string;
  customerId: string;
  customerName: string;
  type: ContractType;
  status: ContractStatus;
  attachment: string;
  signingDate: string;
  chargeDate: string;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type ContractType = (typeof CONTRACT_TYPE_SELECTIONS)[number];

export type ContractDisplayType =
  (typeof CONTRACT_DISPLAY_TYPE_SELECTIONS)[number];

export type ContractStatus = (typeof CONTRACT_STATUS_SELECTIONS)[number];

export interface ContractQueryResult {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: ContractDetail[];
}

export type ContractDetail = ContractResultFromAPI;

export type ServiceContractDetail = Omit<ContractDetail, "type"> & {
  type: "SERVICE";
} & NullableFields<ExtendedServiceContractDetail>;

export type SellContractDetail = Omit<ContractDetail, "type"> & {
  type: "SELL";
} & NullableFields<ExtendedSellContractDetail>;

export type LeaseContractDetail = Omit<ContractDetail, "type"> & {
  type: "LEASE";
} & NullableFields<ExtendedLeaseContractDetail>;

type ExtendedServiceContractDetail = {
  contractPeriod: number;
  billing: ServiceContractBilling;
};

type ExtendedSellContractDetail = {
  equipmentType: EquipmentType;
  currency: string;
  quantity: number;
  amount: number;
  totalAmount?: number;
};

type ExtendedLeaseContractDetail = {
  equipmentType: EquipmentType;
  contractPeriod: number;
  currency: string;
  quantity: number;
  amount: number;
  totalAmount?: number;
};

export type BillingPeriodUnit = (typeof BILLING_PERIOD_UNIT_SELECTIONS)[number];

export type BillingUnit = (typeof BILLING_UNIT)[number];

export type ServiceContractBilling = { id: string } & NullableFields<{
  plan: string;
  periodUnit: BillingPeriodUnit;
  currency: string;
  basePrice: number;
  billingUnit: BillingUnit;
  freeQuota: number;
  unitCharge: number;
  createdTime?: string;
  modifiedTime?: string;
}>;

export type UpdateContractType = NonNullableFields<
  Omit<ContractDetail, (typeof UPDATE_CONTRACT_OMIT_FIELDS)[number]>
> & {
  serviceContractDetail: ExtendedServiceContractDetail;
  leaseContractDetail: ExtendedLeaseContractDetail;
  sellContractDetail: ExtendedSellContractDetail;
};

export type CreateContractType = Omit<
  UpdateContractType,
  "id" | "serviceContractDetail"
> & {
  serviceContractDetail: Omit<ExtendedServiceContractDetail, "billing"> & {
    billing: Omit<ServiceContractBilling, "id">;
  };
};

// export type CreateContractType = NonNullableFields<
//   Omit<ContractDetail, "id" | "createdTime" | "modifiedTime" | "chargeDate">
// > & {
//   serviceContractDetail: Omit<ExtendedServiceContractDetail, "billing"> & {
//     billing: Omit<ServiceContractBilling, "id">;
//   };
//   leaseContractDetail: ExtendedLeaseContractDetail;
//   sellContractDetail: ExtendedSellContractDetail;
// };

export type ContractSubmitType = {
  id: string;
  applicant: string;
  reviewer: string;
};

export type ContractOperateDecision =
  (typeof CONTRACT_OPERATE_DECISION_SELECTIONS)[number];

export type ContractOperateType = {
  id: string;
  decision: ContractOperateDecision;
  operator: string;
  remark: string;
};

export type ContractConfirmChargeDateType = {
  id: string;
  operator: string;
  chargeDate: string;
};
