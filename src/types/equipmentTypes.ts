import { NonNullableFields, NullableFields, TextWithFormatter } from ".";
import {
  formatDollarString,
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";
import { StockInOutDetail } from "./StockTypes";

export const EQUIPMENT_STATUS_SELECTIONS = [
  "Unknown",
  "Available",
  "Sold",
  "Leasing",
  "UnAvailable",
] as const;

export const EQUIPMENT_DISPLAY_TYPE_SELECTIONS = [
  "ALL",
  ...EQUIPMENT_STATUS_SELECTIONS,
] as const;

export const EQUIPMENT_TYPE_SELECTIONS = ["Unknown", "ART"] as const;

export const EQUIPMENT_OWNER_TYPE_SELECTIONS = ["Agent", "DentalLab"] as const;

export type EquipmentType = (typeof EQUIPMENT_TYPE_SELECTIONS)[number];

export type EquipmentStatus = (typeof EQUIPMENT_STATUS_SELECTIONS)[number];

export type EquipmentDisplayType =
  (typeof EQUIPMENT_DISPLAY_TYPE_SELECTIONS)[number];

export type EquipmentOwnerType =
  (typeof EQUIPMENT_OWNER_TYPE_SELECTIONS)[number];

const equipmentTypeAndText = EQUIPMENT_TYPE_SELECTIONS.map((type) => {
  if (type === "Unknown") return [type, "Unknown"];
  return [type, "ART"];
});

const equipmentStatusAndText = EQUIPMENT_STATUS_SELECTIONS.map((status) => {
  if (status === "Unknown") return [status, "未知"];
  else if (status === "Available") return [status, "可使用"];
  else if (status === "Sold") return [status, "已售出"];
  else if (status === "Leasing") return [status, "出租中"];
  return [status, "無法使用"];
});

export const getEquipmentStatusText = (status?: EquipmentStatus | null) => {
  return equipmentStatusAndText.find((el) => el[0] === status)?.[1] || "";
};

export const getEquipmentStatusPriority = (text: string) => {
  return equipmentStatusAndText.findIndex((el) => el[1] === text);
};

export const getEquipmentTypeText = (type?: EquipmentType | null) => {
  return equipmentTypeAndText.find((el) => el[0] === type)?.[1] || "";
};

export const getEquipmentTypePriority = (text: string) => {
  return equipmentTypeAndText.findIndex((el) => el[1] === text);
};

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

export type EquipmentWithStockHistory = EquipmentDetail & {
  stockHistory?: (Omit<StockInOutDetail, "equipments"> & {
    equipmentCount: number;
  })[];
};

export type CreateEquipmentType = NonNullableFields<
  Omit<EquipmentDetail, "id" | "createdTime" | "modifiedTime">
>;

export type UpdateEquipmentType = { id: string } & CreateEquipmentType;

export const createEquipmentkeyNameTable: Record<
  keyof CreateEquipmentType,
  TextWithFormatter
> = {
  serialNumber: { text: "設備序號" },
  equipmentType: { text: "設備類型" },
  equipmentStatus: {
    text: "設備狀態",
    formatter: getEquipmentStatusText,
  },
  ownerId: { text: "設備擁有者ID" },
  ownerName: { text: "設備擁有者名稱" },
  ownerType: { text: "設備擁有者類型" },
  currency: { text: "幣別" },
  amount: {
    text: "設備單價",
    formatter: formatDollarString,
  },
  warrantyDate: {
    text: "設備保固期",
    formatter: formatISODateString,
  },
  receivedDate: {
    text: "設備到貨日",
    formatter: formatISODateString,
  },
  serviceLife: { text: "設備使用年限", formatter: (value) => value + " 個月" },
  remark: { text: "備註" },
};

export const updateEquipmentkeyNameTable: Record<
  keyof UpdateEquipmentType,
  TextWithFormatter
> = {
  id: { text: "設備ID" },
  ...createEquipmentkeyNameTable,
};

export const equipmentDetailkeyNameTable: Record<
  keyof EquipmentDetail,
  TextWithFormatter
> = {
  ...updateEquipmentkeyNameTable,
  createdTime: {
    text: "Created Time",
    formatter: formatISOTimeString,
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: formatISOTimeString,
  },
};
