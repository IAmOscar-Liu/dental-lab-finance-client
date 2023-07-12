export const allowStatusCode304 = (res: any) =>
  (res.status + "").startsWith("2") || res.status === 304;
