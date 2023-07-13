import { NonNullableFields, NullableFields } from ".";

export enum EquipmentDisplayType {
  ALL,
  UNKNOWN,
  AVAILABLE,
  SOLD,
  LEASING,
  UNAVAILABLE,
}

export const EQUIPMENT_TYPE_SELECTIONS = ["Unknown", "ART"] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPE_SELECTIONS)[number];

export const EQUIPMENT_STATUS_SELECTIONS = [
  "Unknown",
  "Available",
  "Sold",
  "Leasing",
  "UnAvailable",
] as const;

export type EquipmentStatus = (typeof EQUIPMENT_STATUS_SELECTIONS)[number];

export const EQUIPMENT_OWNER_TYPE_SELECTIONS = ["Agent", "DentalLab"] as const;

export type EquipmentOwnerType =
  (typeof EQUIPMENT_OWNER_TYPE_SELECTIONS)[number];

export type EquipmentQueryResult = {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: EquipmentDetail[];
};

export type EquipmentDetail = {
  id: string;
  ownerId: string;
} & NullableFields<{
  equipmentType: EquipmentType;
  serialNumber: string;
  currency: string;
  amount: number;
  warrantyDate: string;
  receivedDate: string;
  serviceLife: number;
  equipmentStatus: EquipmentStatus;
  ownerName?: string;
  ownerType: EquipmentOwnerType;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type CreateEquipmentType = NonNullableFields<
  Omit<EquipmentDetail, "id" | "createdTime" | "modifiedTime">
>;

export type UpdateEquipmentType = { id: string } & CreateEquipmentType;

export const createEquipmentkeyNameTable: Record<
  keyof CreateEquipmentType,
  string
> = {
  serialNumber: "設備序號",
  equipmentType: "設備類型",
  equipmentStatus: "設備狀態",
  ownerId: "設備擁有者ID",
  ownerName: "設備擁有者名稱",
  ownerType: "設備擁有者類型",
  currency: "幣別",
  amount: "設備單價",
  warrantyDate: "設備保固期",
  receivedDate: "設備到貨日",
  serviceLife: "使用長度(月)",
  remark: "備註",
};

export const updateEquipmentkeyNameTable: Record<
  keyof UpdateEquipmentType,
  string
> = {
  id: "設備ID",
  ...createEquipmentkeyNameTable,
};
