import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import useGetCustomEquipmentQuery from "../../hooks/useGetCustomEquipmentQuery";
import { equipmentDetailkeyNameTable } from "../../types/equipmentTypes";
import style from "../Single.module.css";

function SingleEquipment() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCustomEquipmentQuery({
    equipmentId,
  });

  if (!equipmentId) return <Navigate to="/equipment-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiFillEye />}
        title="設備管理/瀏覽設備"
        tailing={
          <Link to="/equipment-management">
            <AiOutlineLeft />
            回設備管理
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className={style["single-detail"]}>
          <h1>
            <span>
              <q>{data?.equipmentType}</q> 設備資料
            </span>
            <button
              onClick={() =>
                navigate(`/equipment-management/update/${data?.id}`)
              }
            >
              更新設備
            </button>
          </h1>
          <div className={style["single-detail-body"]}>
            {Object.entries(equipmentDetailkeyNameTable)
              .filter(([_, value]) => value.text !== "備註")
              .map(([key, value]) => (
                <p key={key}>
                  <span>{value.text}</span>
                  <span>
                    {value.formatter(data![key as keyof typeof data])}
                  </span>
                </p>
              ))}
            <p style={{ gridColumn: "1/-1" }}>
              <span>{"備註"}</span>
              <span>{data?.remark ?? ""}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleEquipment;
