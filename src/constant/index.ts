import { CSSProperties } from "react";

export const centerTextStyle: CSSProperties = {
  marginInline: "auto",
  width: "max-content",
  display: "block",
};

export const MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER = 15;

export const SEARCH_QUERY_PAGE_SIZE_SELECTIONS = [
  3, 10, 25, 50, 100, 1000,
] as const;
