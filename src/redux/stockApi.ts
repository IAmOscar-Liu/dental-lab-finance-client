import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchQueryType } from "../types";
import {
  CreateStockType,
  StockInOutDetail,
  StockQueryResult,
  UpdateStockType,
} from "../types/StockTypes";
import { allowStatusCode304 } from "../utils/allowStatusCode304";
import { formatSearchQuery } from "../utils/formatString";
import { removeNonStockFields } from "../utils/removeNonSchemaFields";

export const stockApi = createApi({
  reducerPath: "stockApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["Stock"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getStocks: build.query<StockQueryResult, SearchQueryType>({
      query: (searchQuery) => ({
        url: `/equipments-inout?${formatSearchQuery(searchQuery)}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: StockQueryResult) => ({
        ...response,
        pageNo: response.pageNo + 1,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "Stock" as const,
                id,
              })),
              { type: "Stock", id: "LIST" },
            ]
          : [{ type: "Stock", id: "LIST" }],
    }),
    getStock: build.query<StockInOutDetail, { stockId: string }>({
      query: ({ stockId }) => ({
        url: `/equipments-inout/${stockId}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: {
        code: number;
        message: string;
        data: StockInOutDetail;
      }) => response.data,
      providesTags: (_, __, { stockId }) => [{ type: "Stock", id: stockId }],
    }),
    createStock: build.mutation<any, CreateStockType>({
      query: ({ inOutType, ...rest }) => ({
        url: `/equipments-inout/stock-${inOutType.toLowerCase()}`,
        method: "POST",
        body: removeNonStockFields(rest),
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: [{ type: "Stock", id: "LIST" }],
    }),
    updateStock: build.mutation<any, UpdateStockType>({
      query: ({ id, inOutType, ...rest }) => ({
        url: `/equipments-inout/${id}`,
        method: "PUT",
        body: removeNonStockFields(rest),
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Stock", id }],
    }),
  }),
});

export const {
  useGetStocksQuery,
  useGetStockQuery,
  useCreateStockMutation,
  useUpdateStockMutation,
} = stockApi;
