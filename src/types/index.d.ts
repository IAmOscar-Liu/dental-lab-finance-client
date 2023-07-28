import { CSSProperties } from "react";
import { SEARCH_QUERY_PAGE_SIZE_SELECTIONS } from "../constant";

export type NullableFields<T> = { [K in keyof T]: T[K] | null };

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type Prettify<T> = {
  [P in keyof T]: T[P];
} & {};

export type AppLink = {
  icon: JSX.Element;
  title: string;
  pathname: string;
  hasChildren: boolean;
};

export type TableGroupData = {
  title?: string | JSX.Element;
  heads?: {
    text: string;
    sortFn?: (a: string, b: string) => number;
    style?: CSSProperties;
  }[];
  data: (string | JSX.Element)[][];
  tails?: string[];
};

export type TextWithFormatter = {
  text: string;
  formatter?: (value: any) => any;
};

export type PageSize = (typeof SEARCH_QUERY_PAGE_SIZE_SELECTIONS)[number];

export type SearchQueryType =
  | Partial<{
      pageNo: number;
      pageSize: PageSize;
      sortBy: { text: string; method: "asc" | "desc" }[];
    }>
  | undefined;

export type PaginationValueType = {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: PageSize;
};
