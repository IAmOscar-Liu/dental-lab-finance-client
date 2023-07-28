import { NonNullableFields, NullableFields } from ".";
import {
  DENTAL_DISPLAY_TYPE_SELECTIONS,
  DENTAL_REGION_SELECTIONS,
  DENTAL_STATUS_SELECTIONS,
  UPDATE_DENTAL_LAB_OMIT_FIELDS,
} from "../constant/dentalLab";
import { ContractDetail } from "./contract";

type DentalLabResultFromAPI = { id: string } & NullableFields<{
  name: string;
  status: DentalStatus;
  region: DentalRegion;
  country: string;
  state: string;
  city: string;
  address: string;
  phoneCode: string;
  phoneNumber: string;
  contactPerson: string;
  email: string;
  uniformNo: string;
  createdTime: string;
  modifiedTime: string;
  remark: string;
}>;

export type DentalDisplayType = (typeof DENTAL_DISPLAY_TYPE_SELECTIONS)[number];

export type DentalStatus = (typeof DENTAL_STATUS_SELECTIONS)[number];

export type DentalRegion = (typeof DENTAL_REGION_SELECTIONS)[number];

export interface DentalLabQueryResult {
  totalCount: number;
  totalPage: number;
  pageNo: number;
  pageSize: number;
  result: DentalLabDetail[];
}

export type DentalLabDetail = DentalLabResultFromAPI;

export type DentalLabWithContracts = DentalLabDetail & {
  contracts?: ContractDetail[];
};

export type UpdateDentalLabType = NonNullableFields<
  Omit<DentalLabDetail, (typeof UPDATE_DENTAL_LAB_OMIT_FIELDS)[number]>
>;

export type CreateDentalLabType = Omit<UpdateDentalLabType, "id">;
