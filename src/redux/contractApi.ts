import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ContractDetail,
  ContractQueryResult,
  ContractType,
  CreateContractType,
  LeaseContractDetail,
  SellContractDetail,
  ServiceContractDetail,
  UpdateContractType,
} from "../types/contractTypes";
import { allowStatusCode304 } from "../utils/allowStatusCode304";
import { removeNonContractFields } from "../utils/removeNonSchemaFields";

export const contractApi = createApi({
  reducerPath: "contractApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["Contract"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getContracts: build.query<ContractDetail[], void>({
      query: () => ({
        url: `/contracts?page=0&pageSize=100&sort=createdTime%2Cdesc`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: ContractQueryResult) => response.result,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Contract" as const, id })),
              { type: "Contract", id: "LIST" },
            ]
          : [{ type: "Contract", id: "LIST" }],
    }),
    getContract: build.query<
      ServiceContractDetail | SellContractDetail | LeaseContractDetail,
      { contractType: ContractType; contractId: string }
    >({
      query: ({ contractType, contractId }) => ({
        url: `/contracts/${contractType.toLocaleLowerCase()}/${contractId}`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: {
        code: number;
        message: string;
        data: ServiceContractDetail | SellContractDetail | LeaseContractDetail;
      }) => response.data,
      providesTags: (_, __, { contractId }) => [
        { type: "Contract", id: contractId },
      ],
    }),
    createContract: build.mutation<any, CreateContractType>({
      query: (data) => ({
        url: `/contracts/${data.type.toLowerCase()}`,
        method: "POST",
        body: removeNonContractFields(data),
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: [{ type: "Contract", id: "LIST" }],
    }),
    updateContractLab: build.mutation<any, UpdateContractType>({
      query: ({ id, ...rest }) => ({
        url: `/contracts/${rest.type.toLowerCase()}/${id}`,
        method: "PUT",
        body: removeNonContractFields(rest),
        validateStatus: allowStatusCode304,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Contract", id },
        { type: "Contract", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetContractsQuery,
  useGetContractQuery,
  useCreateContractMutation,
  useUpdateContractLabMutation,
} = contractApi;
