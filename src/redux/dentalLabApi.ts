import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SearchQueryType } from "../types";
import {
  CreateDentalLabType,
  DentalLabDetail,
  DentalLabQueryResult,
  UpdateDentalLabType,
} from "../types/dentalLab";
import { allowStatusCode304 } from "../utils/allowStatusCode304";
import { formatSearchQuery } from "../utils/formatString";

export const dentalLabApi = createApi({
  reducerPath: "dentalLabApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["DentalLab"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getDentalLabs: build.query<DentalLabQueryResult, SearchQueryType>({
      query: (searchQuery) => ({
        url: `/dental-labs?${formatSearchQuery(searchQuery)}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: DentalLabQueryResult) => ({
        ...response,
        pageNo: response.pageNo + 1,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.result.map(({ id }) => ({
                type: "DentalLab" as const,
                id,
              })),
              { type: "DentalLab", id: "LIST" },
            ]
          : [{ type: "DentalLab", id: "LIST" }],
    }),
    getDentalLab: build.query<DentalLabDetail, { dentalLabId: string }>({
      query: ({ dentalLabId }) => ({
        url: `/dental-labs/${dentalLabId}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: {
        code: number;
        message: string;
        data: DentalLabDetail;
      }) => response.data,
      providesTags: (_, __, { dentalLabId }) => [
        { type: "DentalLab", id: dentalLabId },
      ],
    }),
    createDentalLab: build.mutation<any, CreateDentalLabType>({
      query: (data) => ({
        url: `/dental-labs`,
        method: "POST",
        body: data,
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: [{ type: "DentalLab", id: "LIST" }],
    }),
    updateDentalLab: build.mutation<any, UpdateDentalLabType>({
      query: ({ id, ...rest }) => ({
        url: `/dental-labs/${id}`,
        method: "PUT",
        body: rest,
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "DentalLab", id }],
    }),
  }),
});

export const {
  useGetDentalLabsQuery,
  useGetDentalLabQuery,
  useCreateDentalLabMutation,
  useUpdateDentalLabMutation,
  useLazyGetDentalLabQuery,
} = dentalLabApi;
