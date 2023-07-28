import { TextWithFormatter } from "../types";
import {
  EquipmentDetail,
  EquipmentStatus,
  EquipmentType,
} from "../types/equipment";
import {
  formatDollarString,
  formatISODateString,
  formatISOTimeString,
} from "../utils/formatString";

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

export const equipmentDetailkeyNameTable: Record<
  keyof Omit<EquipmentDetail, "stockHistory">,
  TextWithFormatter
> = {
  id: { text: "設備ID" },
  serialNumber: { text: "設備序號" },
  equipmentType: { text: "設備類型" },
  equipmentStatus: {
    text: "設備狀態",
    formatter: getEquipmentStatusText,
  },
  ownerId: { text: "設備擁有者ID", hideInFormSummary: true },
  ownerName: { text: "設備擁有者名稱" },
  ownerType: { text: "設備擁有者類型" },
  ownerContactPerson: { text: "設備擁有者聯絡人", hideInFormSummary: true },
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

export const UPDATE_EQUIPMENT_OMIT_FIELDS = [
  "createdTime",
  "modifiedTime",
  "stockHistory",
] as const;

const { id, createdTime, modifiedTime, ...rest } = equipmentDetailkeyNameTable;

export const createEquipmentkeyNameTable = rest;
export const updateEquipmentkeyNameTable = { id, ...rest };
