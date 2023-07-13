import { useEffect, useState } from "react";
import { useGetDentalLabQuery } from "../redux/dentalLabApi";
import { useGetEquipmentQuery } from "../redux/equipmentApi";
import { EquipmentDetail } from "../types/equipmentTypes";

function useGetCustomEquipmentQuery({ equipmentId }: { equipmentId?: string }) {
  const [data, setData] = useState<EquipmentDetail | undefined>();

  const { data: equipmentData, ...rest } = useGetEquipmentQuery(
    { equipmentId: equipmentId ?? "" },
    {
      skip: !equipmentId,
    }
  );

  const { data: dentalLabData } = useGetDentalLabQuery(
    { dentalId: equipmentData?.ownerId ?? "" },
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

export default useGetCustomEquipmentQuery;
