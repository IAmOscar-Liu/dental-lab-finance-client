import { NonNullableFields, NullableFields } from ".";
import {
  STOCK_DISPLAY_TYPE_SELECTIONS,
  STOCK_TYPE_SELECTIONS,
} from "../constant/stock";
import { ContractType } from "./contract";
import { EquipmentDetail } from "./equipment";

export type StockType = (typeof STOCK_TYPE_SELECTIONS)[number];

export type StockDisplayType = (typeof STOCK_DISPLAY_TYPE_SELECTIONS)[number];

export type StockQueryResult = {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: StockInOutDetail[];
};

export type StockInOutDetail = {
  id: string;
} & NullableFields<{
  inOutType: StockType;
  inOutTime: string;
  operator: string;
  contractId: string;
  contractNo?: string;
  contractName?: string;
  contractType?: ContractType;
  createdTime: string;
  modifiedTime: string;
  remark: string;
  equipments: EquipmentDetail[];
}>;

export type EquipmentBriefType = Pick<
  EquipmentDetail,
  "id" | "serialNumber" | "equipmentType"
>;

export type CreateStockType = NonNullableFields<
  Omit<StockInOutDetail, "id" | "createdTime" | "modifiedTime" | "equipments">
> & {
  equipments: EquipmentBriefType[];
};

export type UpdateStockType = { id: string } & CreateStockType;
