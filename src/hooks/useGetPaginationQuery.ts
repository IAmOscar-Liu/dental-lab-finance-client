import { useEffect, useState } from "react";
import { useGetContractsQuery } from "../redux/contractApi";
import { useGetDentalLabsQuery } from "../redux/dentalLabApi";
import { useGetEquipmentsQuery } from "../redux/equipmentApi";
import { useGetStocksQuery } from "../redux/stockApi";
import { PaginationValueType } from "../types";

export function useGetEquipmentsPaginationQuery(
  inputValue: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
) {
  const [value, setValue] = useState<Partial<PaginationValueType>>({
    pageNo: inputValue.pageNo || 1,
    pageSize: inputValue.pageSize || 10,
  });

  const updateValue = (
    update: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
  ) => {
    if (update.pageSize !== undefined) {
      return setValue({ ...value, pageSize: update.pageSize, pageNo: 1 });
    }
    setValue({ ...value, ...update });
  };

  const { data, ...rest } = useGetEquipmentsQuery({
    pageNo: value.pageNo,
    pageSize: value.pageSize,
  });

  useEffect(() => {
    if (data) {
      setValue({
        ...value,
        totalCount: data.totalCount,
        totalPage: data.totalPage,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  return {
    value,
    updateValue,
    data,
    ...rest,
  };
}

export function useGetStocksPaginationQuery(
  inputValue: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
) {
  const [value, setValue] = useState<Partial<PaginationValueType>>({
    pageNo: inputValue.pageNo || 1,
    pageSize: inputValue.pageSize || 10,
  });

  const updateValue = (
    update: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
  ) => {
    if (update.pageSize !== undefined) {
      return setValue({ ...value, pageSize: update.pageSize, pageNo: 1 });
    }
    setValue({ ...value, ...update });
  };

  const { data, ...rest } = useGetStocksQuery({
    pageNo: value.pageNo,
    pageSize: value.pageSize,
  });

  useEffect(() => {
    if (data) {
      setValue({
        ...value,
        totalCount: data.totalCount,
        totalPage: data.totalPage,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  return {
    value,
    updateValue,
    data,
    ...rest,
  };
}

export function useGetDentaLabsPaginationQuery(
  inputValue: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
) {
  const [value, setValue] = useState<Partial<PaginationValueType>>({
    pageNo: inputValue.pageNo || 1,
    pageSize: inputValue.pageSize || 10,
  });

  const updateValue = (
    update: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
  ) => {
    if (update.pageSize !== undefined) {
      return setValue({ ...value, pageSize: update.pageSize, pageNo: 1 });
    }
    setValue({ ...value, ...update });
  };

  const { data, ...rest } = useGetDentalLabsQuery({
    pageNo: value.pageNo,
    pageSize: value.pageSize,
  });

  useEffect(() => {
    if (data) {
      setValue({
        ...value,
        totalCount: data.totalCount,
        totalPage: data.totalPage,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  return {
    value,
    updateValue,
    data,
    ...rest,
  };
}

export function useGetContractsPaginationQuery(
  inputValue: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
) {
  const [value, setValue] = useState<Partial<PaginationValueType>>({
    pageNo: inputValue.pageNo || 1,
    pageSize: inputValue.pageSize || 10,
  });

  const updateValue = (
    update: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
  ) => {
    if (update.pageSize !== undefined) {
      return setValue({ ...value, pageSize: update.pageSize, pageNo: 1 });
    }
    setValue({ ...value, ...update });
  };

  const { data, ...rest } = useGetContractsQuery({
    pageNo: value.pageNo,
    pageSize: value.pageSize,
  });

  useEffect(() => {
    if (data) {
      setValue({
        ...value,
        totalCount: data.totalCount,
        totalPage: data.totalPage,
      });
    }
    // eslint-disable-next-line
  }, [data]);

  return {
    value,
    updateValue,
    data,
    ...rest,
  };
}
