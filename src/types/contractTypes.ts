import { NonNullableFields, NullableFields } from ".";
import { EquipmentType } from "./equipmentTypes";

export const CONTRACT_TYPE_SELECTIONS = ["SERVICE", "LEASE", "SELL"] as const;

export type ContractType = (typeof CONTRACT_TYPE_SELECTIONS)[number];

export const CONTRACT_STATUS_SELECTIONS = [
  "CONFIRMING",
  "EXECUTING",
  "TERMINATE",
  "END",
] as const;

export type ContractStatus = (typeof CONTRACT_STATUS_SELECTIONS)[number];

export enum ContractDisplayType {
  ALL,
  PLATFORM,
  LEASE,
  SELLING,
}
export interface ContractQueryResult {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: ContractDetail[];
}

export type ContractDetail = { id: string } & NullableFields<{
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

export const BILLING_PERIOD_UNIT_SELECTIONS = [
  "MONTHLY",
  "QUARTERLY",
  "YEARLY",
] as const;

export type BillingPeriodUnit = (typeof BILLING_PERIOD_UNIT_SELECTIONS)[number];

export const BILLING_UNIT = ["OrderCount", "OrderAmount"] as const;

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

export type CreateContractType = NonNullableFields<
  Omit<ContractDetail, "id" | "createdTime" | "modifiedTime" | "chargeDate">
> & {
  serviceContractDetail: Omit<ExtendedServiceContractDetail, "billing"> & {
    billing: Omit<ServiceContractBilling, "id">;
  };
  leaseContractDetail: ExtendedLeaseContractDetail;
  sellContractDetail: ExtendedSellContractDetail;
};

export type UpdateContractType = { id: string } & NonNullableFields<
  Omit<ContractDetail, "id" | "createdTime" | "modifiedTime" | "chargeDate">
> & {
    serviceContractDetail: ExtendedServiceContractDetail;
    leaseContractDetail: ExtendedLeaseContractDetail;
    sellContractDetail: ExtendedSellContractDetail;
  };

export const createContractKeyNameTable: Record<
  keyof Omit<
    CreateContractType,
    "serviceContractDetail" | "leaseContractDetail" | "sellContractDetail"
  >,
  string
> = {
  contractNo: "合約編號",
  name: "合約名稱",
  customerId: "客戶ID",
  customerName: "客戶名稱",
  type: "合約種類",
  status: "合約狀態",
  attachment: "合約附件",
  signingDate: "合約簽約日",
  remark: "備註",
};

export const updateContractKeyNameTable: Record<
  keyof Omit<
    UpdateContractType,
    "serviceContractDetail" | "leaseContractDetail" | "sellContractDetail"
  >,
  string
> = {
  id: "合約ID",
  ...createContractKeyNameTable,
};
