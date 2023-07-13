import { NonNullableFields, NullableFields } from ".";

export enum DentalDisplayType {
  ALL,
  CONTACT,
  UNDER_CONTRACT,
  TERMINATED,
}

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
  string
> = {
  name: "牙技所名稱",
  uniformNo: "牙技所統一編號",
  status: "牙技所狀態",
  region: "牙技所區域",
  country: "牙技所所在國家",
  state: "State",
  city: "City",
  address: "牙技所地址",
  phoneCode: "牙技所電話國碼",
  phoneNumber: "牙技所電話",
  contactPerson: "牙技所聯絡人",
  email: "牙技所email",
  remark: "備註",
};

export const updateDentalLabkeyNameTable: Record<
  keyof UpdateDentalLabType,
  string
> = {
  id: "牙技所ID",
  ...createDentalLabkeyNameTable,
};
