import { TextWithFormatter } from "../types";
import {
  ContractDetail,
  ContractStatus,
  ContractType,
} from "../types/contract";
import {
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";

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

export const BILLING_UNIT = ["OrderCount", "OrderAmount"] as const;

export const CONTRACT_OPERATE_DECISION_SELECTIONS = [
  "approve",
  "reject",
  "withdraw",
] as const;

export const BILLING_PERIOD_UNIT_SELECTIONS = [
  "MONTHLY",
  "QUARTERLY",
  "YEARLY",
] as const;

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

export const contractDetailKeyNameTable: Record<
  keyof ContractDetail,
  TextWithFormatter
> = {
  id: { text: "合約ID" },
  contractNo: { text: "合約編號" },
  name: { text: "合約名稱" },
  type: {
    text: "合約種類",
    formatter: getContractTypeText,
  },
  customerId: { text: "客戶ID" },
  customerName: { text: "客戶名稱" },
  status: {
    text: "合約狀態",
    formatter: getContractStatusText,
  },
  attachment: { text: "合約附件" },
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
  remark: { text: "備註" },
};

export const UPDATE_CONTRACT_OMIT_FIELDS = [
  "createdTime",
  "modifiedTime",
  "chargeDate",
] as const;

const { id, createdTime, modifiedTime, chargeDate, ...rest } =
  contractDetailKeyNameTable;

export const createContractKeyNameTable = rest;
export const updateContractKeyNameTable = { id, ...rest };
