import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ContractBrief,
  ContractBriefQueryResult,
  ContractType,
  LeaseContractDetail,
  SellContractDetail,
  ServiceContractDetail,
} from "../types/contractTypes";
import { allowStatusCode304 } from "../utils/allowStatusCode304";

export const contractApi = createApi({
  reducerPath: "contractApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_URL + "/api",
  }),
  tagTypes: ["Contract"],
  keepUnusedDataFor: 60,
  endpoints: (build) => ({
    getContractsBrief: build.query<ContractBrief[], void>({
      query: () => ({
        url: `/contracts?page=0&pageSize=100&sortField=createdTime&sortOrder=asc`,
        validateStatus: allowStatusCode304,
      }),
      transformResponse: (response: ContractBriefQueryResult) =>
        response.result,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Contract" as const, id }))]
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
  }),
});

export const { useGetContractsBriefQuery, useGetContractQuery } = contractApi;
