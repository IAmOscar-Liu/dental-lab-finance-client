import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import style from "./SingleDentalLab.module.css";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { AiOutlineLeft, AiFillEye } from "react-icons/ai";
import { useGetDentalLabQuery } from "../../redux/dentalLabApi";
import LoadingSpinner from "../../components/LoadingSpinner";

function SingleDentalLab() {
  const { dentalId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetDentalLabQuery(
    { dentalId: dentalId ?? "" },
    {
      skip: !dentalId,
    }
  );

  if (!dentalId) return <Navigate to="/dental-lab-management" />;

  return (
    <div className={style.single}>
      <CustomPageTitle
        icon={<AiFillEye />}
        title="牙技所管理/瀏覽牙技所"
        tailing={
          <Link to="/dental-lab-management">
            <AiOutlineLeft />
            回牙技所管理
          </Link>
        }
      />

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <div className={style["dental-detail"]}>
          <h1>
            <span>
              <q>{data?.name}</q> 資料
            </span>
            <button
              onClick={() =>
                navigate(`/dental-lab-management/update/${data?.id}`)
              }
            >
              更新牙技所
            </button>
          </h1>
          <div className={style["dental-detail-body"]}>
            <p>
              <span>牙技所ID</span>
              <span>{data?.id}</span>
            </p>
            <p>
              <span>牙技所名稱</span>
              <span>{data?.name}</span>
            </p>
            <p>
              <span>牙技所統一編號</span>
              <span>{data?.uniformNo}</span>
            </p>
            <p>
              <span>牙技所區域</span>
              <span>{data?.region}</span>
            </p>
            <p>
              <span>牙技所所在國家</span>
              <span>{data?.country}</span>
            </p>
            <p>
              <span>State</span>
              <span>{data?.state}</span>
            </p>
            <p>
              <span>City</span>
              <span>{data?.city}</span>
            </p>
            <p>
              <span>牙技所地址</span>
              <span>{data?.address}</span>
            </p>
            <p>
              <span>牙技所狀態</span>
              <span>
                {data?.status === "CONTACT"
                  ? "聯繫中"
                  : data?.status === "UNDER_CONTRACT"
                  ? "合約中"
                  : "已解約"}
              </span>
            </p>
            <p>
              <span>聯絡人</span>
              <span>{data?.contactPerson}</span>
            </p>
            <p>
              <span>牙技所電話國碼</span>
              <span>{data?.phoneCode}</span>
            </p>
            <p>
              <span>牙技所電話</span>
              <span>{data?.phoneNumber}</span>
            </p>
            <p>
              <span>牙技所email</span>
              <span>{data?.email}</span>
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

export default SingleDentalLab;
