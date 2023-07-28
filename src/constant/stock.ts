import { TextWithFormatter } from "../types";
import { formatISOTimeString } from "../utils/formatString";
import {
  StockType,
  CreateStockType,
  UpdateStockType,
  StockInOutDetail,
} from "../types/stock";
import { getContractTypeText } from "./contract";

export const STOCK_TYPE_SELECTIONS = ["IN", "OUT"] as const;

export const STOCK_DISPLAY_TYPE_SELECTIONS = [
  "ALL",
  ...STOCK_TYPE_SELECTIONS,
] as const;

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
  contractType: { text: "合約種類", formatter: getContractTypeText },
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
