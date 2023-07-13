import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import useGetCustomEquipmentQuery from "../../hooks/useGetCustomEquipmentQuery";
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
            <p>
              <span>設備ID</span>
              <span>{data?.id}</span>
            </p>
            <p>
              <span>設備序號</span>
              <span>{data?.serialNumber}</span>
            </p>
            <p>
              <span>設備種類</span>
              <span>{data?.equipmentType}</span>
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
              <span>設備所有者名稱</span>
              <span>{data?.ownerName}</span>
            </p>
            <p>
              <span>設備所有者類型</span>
              <span>{data?.ownerType}</span>
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
                {data?.warrantyDate
                  ? new Date(data.warrantyDate).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>到貨日</span>
              <span>
                {data?.receivedDate
                  ? new Date(data.receivedDate).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>服務長度</span>
              <span>{(data?.serviceLife ?? 0) + "個月"}</span>
            </p>
            <p>
              <span>Created Time</span>
              <span>
                {data?.createdTime
                  ? new Date(data.createdTime).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span>Modified Time</span>
              <span>
                {data?.modifiedTime
                  ? new Date(data.modifiedTime).toLocaleString()
                  : ""}
              </span>
            </p>
            <p>
              <span style={{ gridColumn: "1/-1" }}>備註</span>
              <span>{data?.remark}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleEquipment;
