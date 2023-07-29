import { NonNullableFields, NullableFields } from ".";
import {
  STOCK_TYPE_SELECTIONS,
  UPDATE_STOCK_OMIT_FIELDS,
} from "../constant/stock";
import { ContractType } from "./contract";
import { EquipmentDetail } from "./equipment";

type StockInOutResultFromAPI = {
  id: string;
} & NullableFields<{
  inOutType: StockType;
  inOutTime: string;
  operator: string;
  contractId: string;
  createdTime: string;
  modifiedTime: string;
  remark: string;
  equipments: EquipmentDetail[];
}>;

export type StockType = (typeof STOCK_TYPE_SELECTIONS)[number];

export type StockQueryResult = {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: StockInOutDetail[];
};

export type StockInOutDetail = StockInOutResultFromAPI &
  NullableFields<{
    contractNo?: string;
    contractName?: string;
    contractType?: ContractType;
  }>;

export type EquipmentBriefType = Pick<
  EquipmentDetail,
  "id" | "serialNumber" | "equipmentType"
>;

export type UpdateStockType = NonNullableFields<
  Omit<
    StockInOutDetail,
    (typeof UPDATE_STOCK_OMIT_FIELDS)[number]
    // "id" | "createdTime" | "modifiedTime" | "equipments" | "contractType"
  >
> & {
  equipments: EquipmentBriefType[];
};

export type CreateStockType = Omit<UpdateStockType, "id">;
