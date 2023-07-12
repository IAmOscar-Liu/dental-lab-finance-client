import { NonNullableFields, NullableFields } from ".";

export const CONTRACT_TYPE_SELECTIONS = ["SERVICE", "LEASE", "SELL"] as const;

export type ContractType = (typeof CONTRACT_TYPE_SELECTIONS)[number];

export const CONTRACT_STATUS_SELECTIONS = ["PROCESS", "TERMINATE"] as const;

export type ContractStatus = (typeof CONTRACT_STATUS_SELECTIONS)[number];

export enum ContractDisplayType {
  ALL,
  PLATFORM,
  LEASE,
  SELLING,
}

export interface ContractBriefQueryResult {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: ContractBrief[];
}
export type ContractBrief = { id: string } & NullableFields<{
  contractNo: string;
  name: string;
  customerId: string;
  customerName: string;
  type: ContractType;
  status: ContractStatus;
  attachment: any;
  chargeDate: any;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type ContractDetail = { id: string } & NullableFields<{
  contractNo: string;
  name: string;
  customerId: string;
  customerName: string;
  status: ContractStatus;
  attachment: string;
  chargeDate: string;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type ServiceContractDetail = ContractDetail & {
  type: "SERVICE";
} & NullableFields<ExtendedServiceContractDetail>;

export type SellContractDetail = ContractDetail & {
  type: "SELL";
} & NullableFields<ExtendedSellContractDetail>;

export type LeaseContractDetail = ContractDetail & {
  type: "LEASE";
} & NullableFields<ExtendedLeaseContractDetail>;

type ExtendedServiceContractDetail = {
  billing: ServiceContractBilling;
};

type ExtendedSellContractDetail = {
  currency: string;
  amount: number;
  equipments: ContractEquipment[];
};

type ExtendedLeaseContractDetail = {
  equipmentType: EquipmentType;
  quantity: number;
  startTime: string;
  endTime: string;
  billing: LeaseContractBilling;
  equipments: ContractEquipment[];
};

export const BILLING_PERIOD_UNIT_SELECTIONS = [
  "MONTHLY",
  "QUARTERLY",
  "YEARLY",
] as const;

export type BillingPeriodUnit = (typeof BILLING_PERIOD_UNIT_SELECTIONS)[number];

export const BILLING_UNIT = ["OrderCount", "OrderAmount"] as const;

export type BillingUnit = (typeof BILLING_UNIT)[number];

export const EQUIPMENT_TYPE_SELECTIONS = ["LEASE", "RENT"] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPE_SELECTIONS)[number];

export type ServiceContractBilling = { id: string } & NullableFields<{
  plan: string;
  periodUnit: BillingPeriodUnit;
  currency: string;
  basePrice: number;
  contractType: string;
  billingUnit: BillingUnit;
  freeQuota: number;
  unitCharge: number;
  createdTime?: string;
  modifiedTime?: string;
}>;

export type LeaseContractBilling = { id: string } & NullableFields<{
  plan: string;
  periodUnit: BillingPeriodUnit;
  currency: string;
  amount: number;
  freeQuota: number;
  billingUnit: BillingUnit;
  unitCharge: number;
  createdTime?: string;
  modifiedTime?: string;
}>;

export type ContractEquipment = {
  contractId: string;
  equipmentId: string;
} & NullableFields<{
  equipmentInOutId: string;
  displayOrder: number;
  createdTime?: string;
  modifiedTime?: string;
}>;

export type CreateContractType = NonNullableFields<
  Omit<ContractDetail, "id" | "createdTime" | "modifiedTime">
> & {
  type: ContractType;
  serviceContractDetail: ExtendedServiceContractDetail;
  leaseContractDetail: ExtendedLeaseContractDetail;
  sellContractDetail: ExtendedSellContractDetail;
};

export type UpdateContractType = { id: string } & CreateContractType;
