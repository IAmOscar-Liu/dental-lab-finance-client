import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchQueryType } from "../types";
import { AccountReceivableQueryResult } from "../types/AccountReceivable";
import { allowStatusCode304 } from "../utils/allowStatusCode304";
import { formatSearchQuery } from "../utils/formatString";

export const AccountReceivableApi = createApi({
  reducerPath: "accountReceivableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["AccountReceivable"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getAccountReceivables: build.query<
      AccountReceivableQueryResult,
      SearchQueryType
    >({
      query: (searchQuery) => ({
        url: `/account-receivable?${formatSearchQuery(searchQuery)}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: AccountReceivableQueryResult) => ({
        ...response,
        pageNo: response.pageNo + 1,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "AccountReceivable" as const,
                id,
              })),
              { type: "AccountReceivable", id: "LIST" },
            ]
          : [{ type: "AccountReceivable", id: "LIST" }],
    }),
  }),
});

export const { useGetAccountReceivablesQuery } = AccountReceivableApi;
