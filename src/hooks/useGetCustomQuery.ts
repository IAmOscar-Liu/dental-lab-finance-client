import { useEffect, useState } from "react";
import {
  useGetBriefContractQuery,
  useGetContractsByDentalLabIdQuery,
} from "../redux/contractApi";
import { useGetDentalLabQuery } from "../redux/dentalLabApi";
import { useGetEquipmentQuery } from "../redux/equipmentApi";
import { useGetStockQuery } from "../redux/stockApi";
import { StockInOutDetail } from "../types/StockTypes";
import { DentalLabWithContracts } from "../types/dentalLabTypes";
import { EquipmentDetail } from "../types/equipmentTypes";

export function useGetCustomStockQuery({ stockId }: { stockId?: string }) {
  const [data, setData] = useState<StockInOutDetail | undefined>();

  const { data: stockData, ...rest } = useGetStockQuery(
    { stockId: stockId ?? "" },
    {
      skip: !stockId,
    }
  );

  const { data: contractData } = useGetBriefContractQuery(
    { contractId: stockData?.contractId ?? "" },
    { skip: !stockData || !stockData.contractId }
  );

  useEffect(() => {
    if (stockData && contractData) {
      setData({
        ...stockData,
        contractNo: contractData.contractNo,
        contractName: contractData.name,
      });
    }
  }, [stockData, contractData]);

  return {
    data: data || stockData,
    ...rest,
  };
}

export function useGetCustomEquipmentQuery({
  equipmentId,
}: {
  equipmentId?: string;
}) {
  const [data, setData] = useState<EquipmentDetail | undefined>();

  const { data: equipmentData, ...rest } = useGetEquipmentQuery(
    { equipmentId: equipmentId ?? "" },
    {
      skip: !equipmentId,
    }
  );

  const { data: dentalLabData } = useGetDentalLabQuery(
    { dentalLabId: equipmentData?.ownerId ?? "" },
    { skip: !equipmentData }
  );

  useEffect(() => {
    if (equipmentData && dentalLabData) {
      setData({ ...equipmentData, ownerName: dentalLabData.name });
    }
  }, [equipmentData, dentalLabData]);

  return {
    data: data || equipmentData,
    ...rest,
  };
}

export function useGetCustomDentalLabQuery({
  dentalLabId,
}: {
  dentalLabId?: string;
}) {
  const [data, setData] = useState<DentalLabWithContracts | undefined>();

  const { data: dentalLabData, ...rest } = useGetDentalLabQuery(
    { dentalLabId: dentalLabId ?? "" },
    {
      skip: !dentalLabId,
    }
  );

  const { data: contractData } = useGetContractsByDentalLabIdQuery(
    {
      dentalLabId: dentalLabData?.id ?? "",
      searchQuery: { pageNo: 1, pageSize: 100 },
    },
    { skip: !dentalLabData }
  );

  useEffect(() => {
    if (dentalLabData && contractData) {
      setData({ ...dentalLabData, contracts: contractData.result });
    }
  }, [dentalLabData, contractData]);

  return {
    data: (data || dentalLabData) as DentalLabWithContracts | undefined,
    ...rest,
  };
}
