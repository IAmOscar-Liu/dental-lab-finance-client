import { ApiBaseQueryResult, NonNullableFields, NullableFields } from ".";
import {
  EQUIPMENT_OWNER_TYPE_SELECTIONS,
  EQUIPMENT_STATUS_SELECTIONS,
  EQUIPMENT_TYPE_SELECTIONS,
  UPDATE_EQUIPMENT_OMIT_FIELDS,
} from "../constant/equipment";
import { StockInOutDetail } from "./stock";

type EquipmentResultFromAPI = {
  id: string;
} & NullableFields<{
  equipmentType: EquipmentType;
  serialNumber: string;
  currency: string;
  amount: number;
  ownerId: string;
  warrantyDate: string;
  receivedDate: string;
  serviceLife: number;
  equipmentStatus: EquipmentStatus;
  ownerType: EquipmentOwnerType;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type EquipmentType = (typeof EQUIPMENT_TYPE_SELECTIONS)[number];

export type EquipmentStatus = (typeof EQUIPMENT_STATUS_SELECTIONS)[number];

export type EquipmentOwnerType =
  (typeof EQUIPMENT_OWNER_TYPE_SELECTIONS)[number];

export interface EquipmentQueryResult extends ApiBaseQueryResult {
  result: EquipmentDetail[];
}

export type EquipmentDetail = EquipmentResultFromAPI &
  NullableFields<{
    ownerName?: string;
    ownerContactPerson?: string;
    stockHistory?: (Omit<StockInOutDetail, "equipments"> & {
      equipmentCount: number;
    })[];
  }>;

export type UpdateEquipmentType = NonNullableFields<
  Omit<EquipmentDetail, (typeof UPDATE_EQUIPMENT_OMIT_FIELDS)[number]>
>;

export type CreateEquipmentType = Omit<UpdateEquipmentType, "id">;
