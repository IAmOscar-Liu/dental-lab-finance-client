import { TextWithFormatter } from "../types";
import { formatISOTimeString } from "../utils/formatString";
import {
  DentalStatus,
  CreateDentalLabType,
  UpdateDentalLabType,
  DentalLabDetail,
} from "../types/dentalLab";

export const DENTAL_STATUS_SELECTIONS = [
  "CONTACT",
  "UNDER_CONTRACT",
  "TERMINATED",
] as const;

export const DENTAL_DISPLAY_TYPE_SELECTIONS = [
  "ALL",
  ...DENTAL_STATUS_SELECTIONS,
] as const;

export const DENTAL_REGION_SELECTIONS = [
  "EastAsia",
  "WestUS",
  "EastUS",
  "WestEurope",
] as const;

const dentalStatusAndText = DENTAL_STATUS_SELECTIONS.map((status) => {
  if (status === "CONTACT") return [status, "聯繫中"];
  else if (status === "UNDER_CONTRACT") return [status, "合約中"];
  return [status, "已解約"];
});

export const getDentalStatusText = (status?: DentalStatus | null) => {
  return dentalStatusAndText.find((el) => el[0] === status)?.[1] || "";
};

export const createDentalLabkeyNameTable: Record<
  keyof CreateDentalLabType,
  TextWithFormatter
> = {
  name: { text: "牙技所名稱" },
  uniformNo: { text: "牙技所統一編號" },
  status: {
    text: "牙技所狀態",
    formatter: getDentalStatusText,
  },
  region: { text: "牙技所區域" },
  country: { text: "牙技所所在國家" },
  state: { text: "State" },
  city: { text: "City" },
  address: { text: "牙技所地址" },
  phoneCode: { text: "牙技所電話國碼" },
  phoneNumber: { text: "牙技所電話" },
  contactPerson: { text: "牙技所聯絡人" },
  email: { text: "牙技所email" },
  remark: { text: "備註" },
};

export const updateDentalLabkeyNameTable: Record<
  keyof UpdateDentalLabType,
  TextWithFormatter
> = {
  id: { text: "牙技所ID" },
  ...createDentalLabkeyNameTable,
};

export const dentalDetailLabkeyNameTable: Record<
  keyof DentalLabDetail,
  TextWithFormatter
> = {
  ...updateDentalLabkeyNameTable,
  createdTime: {
    text: "Created Time",
    formatter: formatISOTimeString,
  },
  modifiedTime: {
    text: "Modified Time",
    formatter: formatISOTimeString,
  },
};

export const getDentalStatusPriority = (text: string) => {
  return dentalStatusAndText.findIndex((el) => el[1] === text);
};
