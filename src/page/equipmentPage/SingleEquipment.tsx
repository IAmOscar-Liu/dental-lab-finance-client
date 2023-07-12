import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import style from "./SingleEquipment.module.css";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { AiOutlineLeft, AiFillEye } from "react-icons/ai";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useGetEquipmentQuery } from "../../redux/equipmentApi";

function SingleEquipment() {
  const { equipmentId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetEquipmentQuery(
    { equipmentId: equipmentId ?? "" },
    {
      skip: !equipmentId,
    }
  );

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
        <div className={style["equipment-detail"]}>
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
          <div className={style["equipment-detail-body"]}>
            <p>
              <span>設備ID</span>
              <span>{data?.id}</span>
            </p>
            <p>
              <span>設備種類</span>
              <span>{data?.equipmentType}</span>
            </p>
            <p>
              <span>設備序號</span>
              <span>{data?.serialNumber}</span>
            </p>
            <p>
              <span>幣別</span>
              <span>{data?.currency}</span>
            </p>
            <p>
              <span>單價</span>
              <span>{data?.amount}</span>
            </p>
            <p>
              <span>保固期限</span>
              <span>
                {new Date(data?.warrantyDate as any).toLocaleString()}
              </span>
            </p>
            <p>
              <span>到貨日</span>
              <span>
                {new Date(data?.receivedDate as any).toLocaleString()}
              </span>
            </p>
            <p>
              <span>服務長度</span>
              <span>{(data?.serviceLife ?? 0) + "個月"}</span>
            </p>
            <p>
              <span>設備狀態</span>
              <span>{data?.equipmentStatus}</span>
            </p>
            <p>
              <span>設備所有者ID</span>
              <span>{data?.ownerId}</span>
            </p>
            <p>
              <span>設備所有者類型</span>
              <span>{data?.ownerType}</span>
            </p>
            <p>
              <span>createdTime</span>
              <span>{new Date(data?.createdTime as any).toLocaleString()}</span>
            </p>
            <p>
              <span>modifiedTime</span>
              <span>
                {new Date(data?.modifiedTime as any).toLocaleString()}
              </span>
            </p>
            <p>
              <span>備註</span>
              <span>{data?.remark}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleEquipment;
