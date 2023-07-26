import { useRef, useState, useEffect } from "react";
import { setUpdateEquipment } from "../redux/equipmentSlice";
import { store, useAppDispatch } from "../redux/store";
import { EquipmentDetail, UpdateEquipmentType } from "../types/equipmentTypes";
import { DentalLabDetail, UpdateDentalLabType } from "../types/dentalLabTypes";
import { setUpdateDentalLab } from "../redux/dentalLabSlice";
import {
  LeaseContractDetail,
  SellContractDetail,
  ServiceContractDetail,
  UpdateContractType,
} from "../types/contractTypes";
import { setUpdateContract } from "../redux/contractSlice";
import { StockInOutDetail, UpdateStockType } from "../types/StockTypes";
import { setUpdateStock } from "../redux/stockSlice";

export function useInitialUpdateStockData(
  data: StockInOutDetail | undefined,
  currentStepIndex: number
) {
  const dispatch = useAppDispatch();
  const isFirst = useRef(true);
  const [initialUpdateData, setInitialUpdateData] = useState<UpdateStockType>(
    store.getState().stock.updateData
  );

  useEffect(() => {
    if (data) {
      // console.log("set initial updateData");
      const _updateData: UpdateStockType = isFirst.current
        ? {
            id: data.id,
            inOutType: data.inOutType ?? "IN",
            inOutTime: data.inOutTime ?? "",
            operator: data.operator ?? "",
            contractId: data.contractId ?? "",
            contractNo: data.contractNo ?? "",
            contractName: data.contractName ?? "",
            remark: data.remark ?? "",
            equipments: (data.equipments || []).map((eq) => ({
              id: eq.id,
              serialNumber: eq.serialNumber,
              equipmentType: eq.equipmentType,
            })),
          }
        : store.getState().stock.updateData;

      setInitialUpdateData(_updateData);

      if (isFirst.current) {
        // console.log("set dispatch data");
        dispatch(setUpdateStock(_updateData));
      }

      if (data.contractNo && data.contractName) {
        dispatch(
          setUpdateStock({
            contractNo: data.contractNo,
            contractName: data.contractName,
          })
        );
      }

      isFirst.current = false;
    }
  }, [data, currentStepIndex, dispatch]);

  return initialUpdateData;
}

export function useInitialUpdateEqupmentData(
  data: EquipmentDetail | undefined,
  currentStepIndex: number
) {
  const dispatch = useAppDispatch();
  const isFirst = useRef(true);
  const [initialUpdateData, setInitialUpdateData] =
    useState<UpdateEquipmentType>(store.getState().equipment.updateData);

  useEffect(() => {
    if (data?.ownerName) {
      // console.log("set initial updateData");
      const _updateData: UpdateEquipmentType = isFirst.current
        ? {
            id: data.id,
            amount: data.amount ?? 0,
            currency: data.currency ?? "",
            equipmentStatus: data.equipmentStatus ?? "Available",
            equipmentType: data.equipmentType ?? "ART",
            ownerId: data.ownerId,
            ownerType: data.ownerType ?? "DentalLab",
            ownerName: data.ownerName ?? "",
            receivedDate: data.receivedDate ?? "",
            warrantyDate: data.warrantyDate ?? "",
            remark: data.remark ?? "",
            serialNumber: data.serialNumber ?? "",
            serviceLife: data.serviceLife ?? 0,
          }
        : store.getState().equipment.updateData;

      setInitialUpdateData(_updateData);

      if (isFirst.current) {
        // console.log("set dispatch data");
        dispatch(setUpdateEquipment(_updateData));
      }

      isFirst.current = false;
    }
  }, [data, currentStepIndex, dispatch]);

  return initialUpdateData;
}

export function useInitialUpdateDentalLabData(
  data: DentalLabDetail | undefined,
  currentStepIndex: number
) {
  const dispatch = useAppDispatch();
  const isFirst = useRef(true);
  const [initialUpdateData, setInitialUpdateData] =
    useState<UpdateDentalLabType>(store.getState().dentalLab.updateData);

  useEffect(() => {
    if (data) {
      // console.log("set initial updateData");
      const _updateData: UpdateDentalLabType = isFirst.current
        ? {
            id: data.id,
            name: data.name ?? "",
            status: data.status ?? "CONTACT",
            region: data.region ?? "EastAsia",
            country: data.country ?? "",
            state: data.state ?? "",
            city: data.city ?? "",
            address: data.address ?? "",
            phoneCode: data.phoneCode ?? "",
            phoneNumber: data.phoneNumber ?? "",
            contactPerson: data.contactPerson ?? "",
            email: data.email ?? "",
            uniformNo: data.uniformNo ?? "",
            remark: data.remark ?? "",
          }
        : store.getState().dentalLab.updateData;

      setInitialUpdateData(_updateData);

      if (isFirst.current) {
        // console.log("set dispatch data");
        dispatch(setUpdateDentalLab(_updateData));
      }

      isFirst.current = false;
    }
  }, [data, currentStepIndex, dispatch]);

  return initialUpdateData;
}

export function useInitialUpdateContractData(
  data:
    | ServiceContractDetail
    | SellContractDetail
    | LeaseContractDetail
    | undefined,
  currentStepIndex: number
) {
  const dispatch = useAppDispatch();
  const isFirst = useRef(true);
  const [initialUpdateData, setInitialUpdateData] =
    useState<UpdateContractType>(store.getState().contract.updateData);

  useEffect(() => {
    if (data) {
      // console.log("set initial updateData");
      const prevUpdateData = store.getState().contract.updateData;

      const _updateData: UpdateContractType = isFirst.current
        ? {
            id: data.id,
            contractNo: data.contractNo ?? "",
            name: data.name ?? "",
            customerId: data.customerId ?? "",
            customerName: data.customerName ?? "",
            status: data.status ?? "CONFIRMING",
            type: data.type ?? "SERVICE",
            attachment: data.attachment ?? "",
            signingDate: data.signingDate ?? "",
            remark: data.remark ?? "",
            serviceContractDetail:
              data.type === "SERVICE"
                ? {
                    contractPeriod: data.contractPeriod ?? 24,
                    billing:
                      data.billing ??
                      prevUpdateData.serviceContractDetail.billing,
                  }
                : prevUpdateData.serviceContractDetail,
            leaseContractDetail:
              data.type === "LEASE"
                ? {
                    equipmentType: data.equipmentType ?? "ART",
                    contractPeriod: data.contractPeriod ?? 24,
                    currency: data.currency ?? "",
                    quantity: data.quantity ?? 1,
                    amount: data.amount ?? 10000,
                    totalAmount: data.amount ?? 10000,
                  }
                : prevUpdateData.leaseContractDetail,
            sellContractDetail:
              data.type === "SELL"
                ? {
                    equipmentType: data.equipmentType ?? "ART",
                    currency: data.currency ?? "",
                    quantity: data.quantity ?? 1,
                    amount: data.amount ?? 10000,
                    totalAmount: data.amount ?? 10000,
                  }
                : prevUpdateData.sellContractDetail,
          }
        : store.getState().contract.updateData;

      setInitialUpdateData(_updateData);

      if (isFirst.current) {
        // console.log("set dispatch data");
        dispatch(setUpdateContract(_updateData));
      }

      isFirst.current = false;
    }
  }, [data, currentStepIndex, dispatch]);

  return initialUpdateData;
}
