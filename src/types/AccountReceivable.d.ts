import { ApiBaseQueryResult, NullableFields } from ".";
import { ACCOUNT_SUBJECT_SELECTIONS } from "../constant/AccountReceivable";

type AccountReceivableFromAPI = { id: string } & NullableFields<{
  accountDate: string;
  accountSubject: AccountAvailableSubject;
  customerId: string;
  customerName: string;
  settlementId: string;
  currency: string;
  amount: number;
  description: string;
  invoiceNo: string;
  invoiceDate: string;
  createdTime: string;
  modifiedTime: string;
  received: boolean;
}>;

export type AccountAvailableSubject =
  (typeof ACCOUNT_SUBJECT_SELECTIONS)[number];

export interface AccountReceivableQueryResult extends ApiBaseQueryResult {
  result: AccountReceivableDetail[];
}

export type AccountReceivableDetail = AccountReceivableFromAPI;
