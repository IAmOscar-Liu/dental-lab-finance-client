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
