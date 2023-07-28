import { NonNullableFields, NullableFields } from ".";
import {
  EQUIPMENT_DISPLAY_TYPE_SELECTIONS,
  EQUIPMENT_OWNER_TYPE_SELECTIONS,
  EQUIPMENT_STATUS_SELECTIONS,
  EQUIPMENT_TYPE_SELECTIONS,
} from "../constant/equipment";
import { StockInOutDetail } from "./stock";

export type EquipmentType = (typeof EQUIPMENT_TYPE_SELECTIONS)[number];

export type EquipmentStatus = (typeof EQUIPMENT_STATUS_SELECTIONS)[number];

export type EquipmentDisplayType =
  (typeof EQUIPMENT_DISPLAY_TYPE_SELECTIONS)[number];

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
  ownerContactPerson?: string;
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
