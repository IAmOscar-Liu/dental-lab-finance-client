import { NonNullableFields, NullableFields, TextWithFormatter } from ".";
import { formatISOTimeString } from "../utils/formatString";
import { EquipmentDetail } from "./equipmentTypes";

export const STOCK_TYPE_SELECTIONS = ["IN", "OUT"] as const;

export const STOCK_DISPLAY_TYPE_SELECTIONS = [
  "ALL",
  ...STOCK_TYPE_SELECTIONS,
] as const;

export type StockType = (typeof STOCK_TYPE_SELECTIONS)[number];

export type StockDisplayType = (typeof STOCK_DISPLAY_TYPE_SELECTIONS)[number];

const stockTypeAndText = STOCK_TYPE_SELECTIONS.map((type) => {
  if (type === "IN") return [type, "入庫"];
  return [type, "出庫"];
});

export const getStockTypeText = (type?: StockType | null) => {
  return stockTypeAndText.find((el) => el[0] === type)?.[1] || "";
};

export const getStockTypePriority = (text: string) => {
  return stockTypeAndText.findIndex((el) => el[1] === text);
};

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

export const createStockKeyNameTable: Record<
  Exclude<keyof CreateStockType, "equipments">,
  TextWithFormatter
> = {
  inOutType: { text: "入/出庫", formatter: getStockTypeText },
  inOutTime: {
    text: "入/出庫時間",
    formatter: formatISOTimeString,
  },
  operator: { text: "Operator" },
  contractId: { text: "合約ID" },
  contractNo: { text: "合約編號" },
  contractName: { text: "合約名稱" },
  remark: { text: "備註" },
};

export const updateStockKeyNameTable: Record<
  Exclude<keyof UpdateStockType, "equipments">,
  TextWithFormatter
> = {
  id: { text: "庫存ID" },
  ...createStockKeyNameTable,
};

export const stockDetailkeyNameTable: Record<
  Exclude<keyof StockInOutDetail, "equipments">,
  TextWithFormatter
> = {
  ...updateStockKeyNameTable,
  createdTime: {
    text: "Created Time",
    formatter: formatISOTimeString,
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: formatISOTimeString,
  },
};
