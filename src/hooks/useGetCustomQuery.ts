import { useEffect, useState } from "react";
import {
  useGetBriefContractQuery,
  useGetContractsByDentalLabIdQuery,
} from "../redux/contractApi";
import { useGetDentalLabQuery } from "../redux/dentalLabApi";
import { useGetEquipmentQuery } from "../redux/equipmentApi";
import {
  useGetStockQuery,
  useGetStocksByEquipmentIdQuery,
} from "../redux/stockApi";
import { StockInOutDetail } from "../types/stock";
import { DentalLabWithContracts } from "../types/dentalLab";
import { EquipmentWithStockHistory } from "../types/equipment";

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
        contractType: contractData.type,
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
  withStockHistory = false,
}: {
  equipmentId?: string;
  withStockHistory?: boolean;
}) {
  const [data, setData] = useState<EquipmentWithStockHistory | undefined>();

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

  const { data: stockData } = useGetStocksByEquipmentIdQuery(
    {
      searchQuery: { pageNo: 1, pageSize: 1000 },
      equipmentId: equipmentData?.id ?? "",
    },
    { skip: !withStockHistory || !equipmentData }
  );

  useEffect(() => {
    if (equipmentData && (dentalLabData || stockData)) {
      setData({
        ...equipmentData,
        ownerName: dentalLabData?.name,
        ownerContactPerson: dentalLabData?.contactPerson,
        stockHistory: (stockData?.result || []).map(
          ({ equipments, ...rest }) => ({
            ...rest,
            equipmentCount: (equipments || []).length,
          })
        ),
      });
    }
  }, [equipmentData, dentalLabData, stockData]);

  return {
    data: (data || equipmentData) as EquipmentWithStockHistory | undefined,
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
      searchQuery: { pageNo: 1, pageSize: 1000 },
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
