import { NonNullableFields, NullableFields } from ".";
import {
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";
import { EquipmentType } from "./equipmentTypes";

export enum ContractDisplayType {
  ALL,
  PLATFORM,
  LEASE,
  SELLING,
}

export const CONTRACT_DISPLAY_TYPES = [
  { type: ContractDisplayType.ALL, text: "全部" },
  { type: ContractDisplayType.PLATFORM, text: "服務平台" },
  { type: ContractDisplayType.LEASE, text: "設備租賃" },
  { type: ContractDisplayType.SELLING, text: "設備買賣" },
];

export const getContractTypeText = (type?: ContractType | null) => {
  switch (type) {
    case "SERVICE":
      return "服務平台合約";
    case "LEASE":
      return "設備租賃合約";
    case "SELL":
      return "設備買賣合約";
    default:
      return "";
  }
};

export const getContractStatusText = (status?: ContractStatus | null) => {
  switch (status) {
    case "CONFIRMING":
      return "確認中";
    case "SUBMIT_FOR_REVIEW":
      return "審核中";
    case "EXECUTING":
      return "履行中";
    case "TERMINATE":
      return "已終止";
    case "END":
      return "已解約";
    default:
      return "";
  }
};

export const getContractType = (type: string | undefined) => {
  if (CONTRACT_TYPE_SELECTIONS.find((e) => e === type))
    return type as ContractType;
  return "SERVICE" as ContractType;
};

export const CONTRACT_TYPE_SELECTIONS = ["SERVICE", "LEASE", "SELL"] as const;

export type ContractType = (typeof CONTRACT_TYPE_SELECTIONS)[number];

export const CONTRACT_STATUS_SELECTIONS = [
  "CONFIRMING",
  "EXECUTING",
  "SUBMIT_FOR_REVIEW",
  "TERMINATE",
  "END",
] as const;

export type ContractStatus = (typeof CONTRACT_STATUS_SELECTIONS)[number];
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
  { text: string; formatter: (value: any) => any }
> = {
  contractNo: { text: "合約編號", formatter: (value: any) => value },
  name: { text: "合約名稱", formatter: (value: any) => value },
  customerId: { text: "客戶ID", formatter: (value: any) => value },
  customerName: { text: "客戶名稱", formatter: (value: any) => value },
  type: {
    text: "合約種類",
    formatter: (value: any) => getContractTypeText(value),
  },
  status: {
    text: "合約狀態",
    formatter: (value: any) => getContractStatusText(value),
  },
  attachment: { text: "合約附件", formatter: (value: any) => value },
  signingDate: {
    text: "合約簽約日",
    formatter: (value: any) => formatISODateString(value),
  },
  remark: { text: "備註", formatter: (value: any) => value },
};

export const updateContractKeyNameTable: Record<
  keyof Omit<
    UpdateContractType,
    "serviceContractDetail" | "leaseContractDetail" | "sellContractDetail"
  >,
  { text: string; formatter: (value: any) => any }
> = {
  id: { text: "合約ID", formatter: (value: any) => value },
  ...createContractKeyNameTable,
};

export const contractDetailKeyNameTable: Record<
  keyof ContractDetail,
  { text: string; formatter: (value: any) => any }
> = {
  ...updateContractKeyNameTable,
  signingDate: {
    text: "合約簽約日",
    formatter: (value: any) => formatISODateString(value),
  },
  chargeDate: {
    text: "合約收費日",
    formatter: (value: any) => formatISODateString(value),
  },
  createdTime: {
    text: "Created Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
};

export type ContractSubmitType = {
  id: string;
  applicant: string;
  reviewer: string;
};

export const CONTRACT_OPERATE_DECISION_SELECTIONS = [
  "approve",
  "reject",
  "withdraw",
] as const;

export type ContractOperateDecision =
  (typeof CONTRACT_OPERATE_DECISION_SELECTIONS)[number];

export type ContractOperateType = {
  id: string;
  decision: ContractOperateDecision;
  operator: string;
  remark: string;
};
