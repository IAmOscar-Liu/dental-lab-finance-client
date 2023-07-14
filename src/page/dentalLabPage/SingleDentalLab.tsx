import { AiFillEye, AiOutlineLeft } from "react-icons/ai";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import { useGetDentalLabQuery } from "../../redux/dentalLabApi";
import { dentalDetailLabkeyNameTable } from "../../types/dentalLabTypes";
import style from "../Single.module.css";

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
        <div className={style["single-detail"]}>
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
          <div className={style["single-detail-body"]}>
            {Object.entries(dentalDetailLabkeyNameTable)
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

export default SingleDentalLab;
