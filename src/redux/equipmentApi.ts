import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateEquipmentType,
  EquipmentDetail,
  EquipmentQueryResult,
  UpdateEquipmentType,
} from "../types/equipmentTypes";
import { allowStatusCode304 } from "../utils/allowStatusCode304";

export const equipmentApi = createApi({
  reducerPath: "equipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["Equipment"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getEquipments: build.query<EquipmentDetail[], void>({
      query: () => ({
        url: `/equipments?page=0&pageSize=100&sort=createdTime%2Cdesc`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: EquipmentQueryResult) => response.result,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Equipment" as const, id })),
              { type: "Equipment", id: "LIST" },
            ]
          : [{ type: "Equipment", id: "LIST" }],
    }),
    getEquipment: build.query<EquipmentDetail, { equipmentId: string }>({
      query: ({ equipmentId }) => ({
        url: `/equipments/${equipmentId}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: {
        code: number;
        message: string;
        data: EquipmentDetail;
      }) => response.data,
      providesTags: (_, __, { equipmentId }) => [
        { type: "Equipment", id: equipmentId },
      ],
    }),
    createEquipment: build.mutation<any, CreateEquipmentType>({
      query: (data) => ({
        url: `/equipments`,
        method: "POST",
        body: data,
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: [{ type: "Equipment", id: "LIST" }],
    }),
    updateEquipment: build.mutation<any, UpdateEquipmentType>({
      query: ({ id, ...rest }) => ({
        url: `/equipments/${id}`,
        method: "PUT",
        body: rest,
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Equipment", id },
        { type: "Equipment", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetEquipmentsQuery,
  useGetEquipmentQuery,
  useCreateEquipmentMutation,
  useUpdateEquipmentMutation,
} = equipmentApi;
