import { NonNullableFields, NullableFields } from ".";
import { formatISOTimeString } from "../utils/formatString";

export enum DentalDisplayType {
  ALL,
  CONTACT,
  UNDER_CONTRACT,
  TERMINATED,
}

export const DENTAL_DISPLAY_TYPES = [
  { type: DentalDisplayType.ALL, text: "全部" },
  { type: DentalDisplayType.CONTACT, text: "聯繫中" },
  { type: DentalDisplayType.UNDER_CONTRACT, text: "合約中" },
  { type: DentalDisplayType.TERMINATED, text: "已解約" },
];

export const getDentalStatusText = (status?: DentalStatus | null) => {
  switch (status) {
    case "CONTACT":
      return "聯繫中";
    case "UNDER_CONTRACT":
      return "合約中";
    case "TERMINATED":
      return "已解約";
    default:
      return "";
  }
};

export const DENTAL_STATUS_SELECTIONS = [
  "CONTACT",
  "UNDER_CONTRACT",
  "TERMINATED",
] as const;

export type DentalStatus = (typeof DENTAL_STATUS_SELECTIONS)[number];

export const DENTAL_REGION_SELECTIONS = [
  "EastAsia",
  "WestUS",
  "EastUS",
  "WestEurope",
] as const;

export type DentalRegion = (typeof DENTAL_REGION_SELECTIONS)[number];

export interface DentalLabQueryResult {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: DentalLab[];
}

export type DentalLab = { id: string } & NullableFields<{
  name: string;
  status: DentalStatus;
  region: DentalRegion;
  country: string;
  state: string;
  city: string;
  address: string;
  phoneCode: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
  uniformNo: string;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type CreateDentalLabType = NonNullableFields<
  Omit<DentalLab, "id" | "createdTime" | "modifiedTime">
>;

export type UpdateDentalLabType = { id: string } & CreateDentalLabType;

export const createDentalLabkeyNameTable: Record<
  keyof CreateDentalLabType,
  { text: string; formatter: (value: any) => any }
> = {
  name: { text: "牙技所名稱", formatter: (value: any) => value },
  uniformNo: { text: "牙技所統一編號", formatter: (value: any) => value },
  status: {
    text: "牙技所狀態",
    formatter: (value: any) => getDentalStatusText(value),
  },
  region: { text: "牙技所區域", formatter: (value: any) => value },
  country: { text: "牙技所所在國家", formatter: (value: any) => value },
  state: { text: "State", formatter: (value: any) => value },
  city: { text: "City", formatter: (value: any) => value },
  address: { text: "牙技所地址", formatter: (value: any) => value },
  phoneCode: { text: "牙技所電話國碼", formatter: (value: any) => value },
  phoneNumber: { text: "牙技所電話", formatter: (value: any) => value },
  contactPerson: { text: "牙技所聯絡人", formatter: (value: any) => value },
  email: { text: "牙技所email", formatter: (value: any) => value },
  remark: { text: "備註", formatter: (value: any) => value },
};

export const updateDentalLabkeyNameTable: Record<
  keyof UpdateDentalLabType,
  { text: string; formatter: (value: any) => any }
> = {
  id: { text: "牙技所ID", formatter: (value: any) => value },
  ...createDentalLabkeyNameTable,
};

export const dentalDetailLabkeyNameTable: Record<
  keyof DentalLab,
  { text: string; formatter: (value: any) => any }
> = {
  ...updateDentalLabkeyNameTable,
  createdTime: {
    text: "Created Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
};
