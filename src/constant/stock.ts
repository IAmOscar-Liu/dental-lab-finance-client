import { TextWithFormatter } from "../types";
import { StockInOutDetail, StockType } from "../types/stock";
import { formatISOTimeString } from "../utils/formatString";
import { getContractTypeText } from "./contract";

export const STOCK_TYPE_SELECTIONS = ["IN", "OUT"] as const;

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

export const stockDetailkeyNameTable: Record<
  Exclude<keyof StockInOutDetail, "equipments">,
  TextWithFormatter
> = {
  id: { text: "入/出庫ID" },
  inOutType: { text: "入/出庫", formatter: getStockTypeText },
  inOutTime: {
    text: "入/出庫時間",
    formatter: formatISOTimeString,
  },
  operator: { text: "Operator" },
  contractId: { text: "合約ID" },
  contractNo: { text: "合約編號" },
  contractName: { text: "合約名稱" },
  contractType: {
    text: "合約種類",
    formatter: getContractTypeText,
    hideInFormSummary: true,
  },
  remark: { text: "備註" },
  createdTime: {
    text: "Created Time",
    formatter: formatISOTimeString,
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: formatISOTimeString,
  },
};

export const UPDATE_STOCK_OMIT_FIELDS = [
  "createdTime",
  "modifiedTime",
  "equipments",
  "contractType",
] as const;

const { id, createdTime, modifiedTime, contractType, ...rest } =
  stockDetailkeyNameTable;

export const createStockKeyNameTable = rest;
export const updateStockKeyNameTable = { id, ...rest };
