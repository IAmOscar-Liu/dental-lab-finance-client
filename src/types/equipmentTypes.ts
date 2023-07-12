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
