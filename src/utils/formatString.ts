import { SearchQueryType } from "../types";

export const formatISODateString = (value: any) => {
  if (typeof value !== "string") return value ?? "";

  if (
    !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
      value
    )
  )
    return value;

  return new Date(value).toLocaleDateString();
};

export const formatISOTimeString = (value: any) => {
  if (typeof value !== "string") return value ?? "";

  if (
    !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
      value
    )
  )
    return value;

  return new Date(value).toLocaleString();
};

export const formatDollarString = (value: any) => {
  if (isNaN(value)) return value ?? "";
  return "$ " + value.toLocaleString();
};

export const getUTCISOStringFromLocal = (currentTime: any) => {
  if (typeof currentTime !== "string") return currentTime;

  if (
    !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
      currentTime
    )
  )
    return currentTime;

  const timeZoneDiff = new Date().getTimezoneOffset();
  return new Date(+new Date(currentTime) + timeZoneDiff * 60000).toISOString();
};

export const getLocalISOStringFromUTC = (UTCTime: any) => {
  if (typeof UTCTime !== "string") return UTCTime;

  if (
    !/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/.test(
      UTCTime
    )
  )
    return UTCTime;

  const timeZoneDiff = new Date().getTimezoneOffset();
  return new Date(+new Date(UTCTime) - timeZoneDiff * 60000).toISOString();
};

export const formatDataISOString = (data: Record<string, any>) => {
  const stack = [data];

  while (stack.length > 0) {
    const cur = stack.shift();

    if (Array.isArray(cur)) {
      for (let i = 0; i < cur.length; i++) {
        cur[i] = getUTCISOStringFromLocal(cur[i]);
        stack.push(cur[i]);
      }
    } else if (typeof cur === "object") {
      for (let key of Object.keys(cur)) {
        cur[key] = getUTCISOStringFromLocal(cur[key]);
        stack.push(cur[key]);
      }
    }
  }

  return data;
};

export const formatSearchQuery = (query: SearchQueryType) => {
  const page = (query?.pageNo || 1) - 1;
  const pageSize = query?.pageSize || 10;
  const sortBy = query?.sortBy || [{ text: "createdTime", method: "desc" }];

  return `page=${page}&pageSize=${pageSize}&sort=${
    sortBy[0].text + "%2C" + sortBy[0].method
  }`;
};
