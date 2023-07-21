import style from "./CustomSelectedEquipmentList.module.css";

function CustomSelectedEquipmentList({
  equipmentType,
  serialNumber,
}: {
  equipmentType: string;
  serialNumber: string;
}) {
  return (
    <p className={style.list}>
      <span>{equipmentType}</span>
      <span>{serialNumber}</span>
    </p>
  );
}

export default CustomSelectedEquipmentList;
