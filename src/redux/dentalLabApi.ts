import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateDentalLabType,
  DentalLab,
  DentalLabQueryResult,
  UpdateDentalLabType,
} from "../types/dentalLabTypes";
import { allowStatusCode304 } from "../utils/allowStatusCode304";

export const dentalLabApi = createApi({
  reducerPath: "dentalLabApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["DentalLab"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getDentalLabs: build.query<DentalLab[], void>({
      query: () => ({
        url: `/dental-labs?page=0&pageSize=100&sort=createdTime,desc`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: DentalLabQueryResult) => response.result,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "DentalLab" as const, id })),
              { type: "DentalLab", id: "LIST" },
            ]
          : [{ type: "DentalLab", id: "LIST" }],
    }),
    getDentalLab: build.query<DentalLab, { dentalId: string }>({
      query: ({ dentalId }) => ({
        url: `/dental-labs/${dentalId}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: {
        code: number;
        message: string;
        data: DentalLab;
      }) => response.data,
      providesTags: (_, __, { dentalId }) => [
        { type: "DentalLab", id: dentalId },
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
      invalidatesTags: (_, __, { id }) => [
        { type: "DentalLab", id },
        { type: "DentalLab", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetDentalLabsQuery,
  useGetDentalLabQuery,
  useCreateDentalLabMutation,
  useUpdateDentalLabMutation,
} = dentalLabApi;
