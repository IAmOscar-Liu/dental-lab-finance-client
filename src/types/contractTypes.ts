import { NonNullableFields, NullableFields, TextWithFormatter } from ".";
import {
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";
import { EquipmentType } from "./equipmentTypes";

export const CONTRACT_TYPE_SELECTIONS = ["SERVICE", "LEASE", "SELL"] as const;

export const CONTRACT_DISPLAY_TYPE_SELECTIONS = [
  "ALL",
  ...CONTRACT_TYPE_SELECTIONS,
] as const;

export const CONTRACT_STATUS_SELECTIONS = [
  "CONFIRMING",
  "SUBMIT_FOR_REVIEW",
  "EFFECTED",
  "EXECUTING",
  "TERMINATE",
  "END",
] as const;

export type ContractType = (typeof CONTRACT_TYPE_SELECTIONS)[number];

export type ContractDisplayType =
  (typeof CONTRACT_DISPLAY_TYPE_SELECTIONS)[number];

export type ContractStatus = (typeof CONTRACT_STATUS_SELECTIONS)[number];

const contractTypeAndText = CONTRACT_TYPE_SELECTIONS.map((type) => {
  if (type === "SERVICE") return [type, "服務平台合約"];
  else if (type === "LEASE") return [type, "設備租賃合約"];
  return [type, "設備買賣合約"];
});

const contractStatusAndText = CONTRACT_STATUS_SELECTIONS.map((status) => {
  if (status === "CONFIRMING") return [status, "確認中"];
  else if (status === "SUBMIT_FOR_REVIEW") return [status, "審核中"];
  else if (status === "EFFECTED") return [status, "已生效"];
  else if (status === "EXECUTING") return [status, "履行中"];
  else if (status === "TERMINATE") return [status, "已終止"];
  return [status, "已解約"];
});

export const getContractStatusText = (status?: ContractStatus | null) => {
  return contractStatusAndText.find((el) => el[0] === status)?.[1] || "";
};

export const getContractStatusPriority = (text: string) => {
  return contractStatusAndText.findIndex((el) => el[1] === text);
};

export const getContractType = (type?: string) => {
  return (contractTypeAndText.find((el) => el[0] === type)?.[0] ||
    "SERVICE") as ContractType;
};

export const getContractTypeText = (type?: ContractType | null) => {
  return contractTypeAndText.find((el) => el[0] === type)?.[1] || "";
};

export const getContractTypePriority = (text: string) => {
  return contractTypeAndText.findIndex((el) => el[1] === text);
};
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
  TextWithFormatter
> = {
  contractNo: { text: "合約編號" },
  name: { text: "合約名稱" },
  customerId: { text: "客戶ID" },
  customerName: { text: "客戶名稱" },
  type: {
    text: "合約種類",
    formatter: getContractTypeText,
  },
  status: {
    text: "合約狀態",
    formatter: getContractStatusText,
  },
  attachment: { text: "合約附件" },
  signingDate: {
    text: "合約簽約日",
    formatter: formatISODateString,
  },
  remark: { text: "備註" },
};

export const updateContractKeyNameTable: Record<
  keyof Omit<
    UpdateContractType,
    "serviceContractDetail" | "leaseContractDetail" | "sellContractDetail"
  >,
  TextWithFormatter
> = {
  id: { text: "合約ID" },
  ...createContractKeyNameTable,
};

export const contractDetailKeyNameTable: Record<
  keyof ContractDetail,
  TextWithFormatter
> = {
  ...updateContractKeyNameTable,
  signingDate: {
    text: "合約簽約日",
    formatter: formatISODateString,
  },
  chargeDate: {
    text: "合約收費日",
    formatter: formatISODateString,
  },
  createdTime: {
    text: "Created Time",
    formatter: formatISOTimeString,
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: formatISOTimeString,
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

export type ContractConfirmChargeDateType = {
  id: string;
  operator: string;
  chargeDate: string;
};
