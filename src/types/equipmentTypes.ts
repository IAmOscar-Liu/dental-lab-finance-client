import { NonNullableFields, NullableFields } from ".";
import {
  formatDollarString,
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";

export enum EquipmentDisplayType {
  ALL,
  UNKNOWN,
  AVAILABLE,
  SOLD,
  LEASING,
  UNAVAILABLE,
}

export const EQUIPMENT_DISPLAY_TYPES = [
  { type: EquipmentDisplayType.ALL, text: "全部" },
  { type: EquipmentDisplayType.UNKNOWN, text: "未知" },
  { type: EquipmentDisplayType.AVAILABLE, text: "可用" },
  { type: EquipmentDisplayType.SOLD, text: "已售出" },
  { type: EquipmentDisplayType.LEASING, text: "出租中" },
  { type: EquipmentDisplayType.UNAVAILABLE, text: "無法使用" },
];

export const getEquipmentStatusText = (status?: EquipmentStatus | null) => {
  switch (status) {
    case "Unknown":
      return "未知";
    case "Available":
      return "可用";
    case "Sold":
      return "已售出";
    case "Leasing":
      return "出租中";
    case "UnAvailable":
      return "無法使用";
    default:
      return "";
  }
};

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
  { text: string; formatter: (value: any) => any }
> = {
  serialNumber: { text: "設備序號", formatter: (value: any) => value },
  equipmentType: { text: "設備類型", formatter: (value: any) => value },
  equipmentStatus: {
    text: "設備狀態",
    formatter: (value: any) => getEquipmentStatusText(value),
  },
  ownerId: { text: "設備擁有者ID", formatter: (value: any) => value },
  ownerName: { text: "設備擁有者名稱", formatter: (value: any) => value },
  ownerType: { text: "設備擁有者類型", formatter: (value: any) => value },
  currency: { text: "幣別", formatter: (value: any) => value },
  amount: {
    text: "設備單價",
    formatter: (value: any) => formatDollarString(value),
  },
  warrantyDate: {
    text: "設備保固期",
    formatter: (value: any) => formatISODateString(value),
  },
  receivedDate: {
    text: "設備到貨日",
    formatter: (value: any) => formatISODateString(value),
  },
  serviceLife: { text: "設備使用長度(月)", formatter: (value: any) => value },
  remark: { text: "備註", formatter: (value: any) => value },
};

export const updateEquipmentkeyNameTable: Record<
  keyof UpdateEquipmentType,
  { text: string; formatter: (value: any) => any }
> = {
  id: { text: "設備ID", formatter: (value: any) => value },
  ...createEquipmentkeyNameTable,
};

export const equipmentDetailkeyNameTable: Record<
  keyof EquipmentDetail,
  { text: string; formatter: (value: any) => any }
> = {
  ...updateEquipmentkeyNameTable,
  createdTime: {
    text: "Created Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: (value: any) => formatISOTimeString(value),
  },
};
