import { MdOutlineAdd, MdOutlineStickyNote2 } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomQueryController from "../../components/custom/CustomQueryController";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER } from "../../constant";
import {
  DENTAL_DISPLAY_TYPE_SELECTIONS,
  getDentalStatusPriority,
  getDentalStatusText,
} from "../../constant/dentalLab";
import useFilter from "../../hooks/useFilter";
import { useGetDentaLabsPaginationQuery } from "../../hooks/useGetPaginationQuery";
import { DentalDisplayType, DentalLabDetail } from "../../types/dentalLab";
import style from "../Management.module.css";

function DentalManagement() {
  const {
    paginationValue,
    updatePaginationValue,
    data,
    isLoading,
    isFetching,
    error,
  } = useGetDentaLabsPaginationQuery({ pageNo: 1, pageSize: 10 });
  const { filter, setFilter, getFilteredData } = useFilter<
    DentalDisplayType,
    DentalLabDetail
  >({ data: data?.result, filterBy: (value) => value.status });
  const navigate = useNavigate();

  return (
    <div className={style.management}>
      <CustomPageTitle icon={<MdOutlineStickyNote2 />} title="牙技所管理" />
      <div className={style["title-and-search"]}>
        <h5>牙技所總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢牙技所" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {DENTAL_DISPLAY_TYPE_SELECTIONS.map((displayType) => (
              <button
                key={displayType}
                disabled={displayType === filter}
                onClick={() => setFilter(displayType)}
              >
                {displayType === "ALL"
                  ? "全部"
                  : getDentalStatusText(displayType)}{" "}
                ({getFilteredData(displayType).length})
              </button>
            ))}
            <button onClick={() => navigate("/dental-lab-management/new")}>
              <MdOutlineAdd />
              新增牙技所
            </button>
          </div>
          <CustomQueryController
            paginationValue={paginationValue}
            updatePaginationValue={updatePaginationValue}
          />
          {isFetching ? (
            <LoadingSpinner totalHeight={350} />
          ) : (
            <>
              <CustomTableGroup
                tableMinWidth={840}
                columnWidths={[
                  "max(10ch, 10%)",
                  "auto",
                  "9ch",
                  "max(9ch, 9%)",
                  "max(12ch, 12%)",
                  "max(12ch, 12%)",
                  "max(18ch, 18%)",
                  "10ch",
                ]}
                tableGroupData={{
                  heads: [
                    { text: "統一編號", sortFn: (a, b) => a.localeCompare(b) },
                    {
                      text: "牙技所名稱",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "狀態",
                      sortFn: (a, b) =>
                        getDentalStatusPriority(a) - getDentalStatusPriority(b),
                    },
                    { text: "國家", sortFn: (a, b) => a.localeCompare(b) },
                    {
                      text: "City/State",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    { text: "電話" },
                    { text: "Email" },
                    { text: "查看細節" },
                  ],
                  data: getFilteredData(filter).map((dental) => [
                    dental.uniformNo ?? "",
                    dental.name ?? "",
                    getDentalStatusText(dental.status),
                    dental.country ?? "",
                    [dental.city, dental.state].filter((e) => !!e).join(" / "),
                    dental.phoneNumber ?? "",
                    dental.email ?? "",
                    <Link to={`/dental-lab-management/overview/${dental.id}`}>
                      查看細節
                    </Link>,
                  ]),
                }}
              />
              {getFilteredData(filter).length >=
                MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER && (
                <CustomQueryController
                  paginationValue={paginationValue}
                  updatePaginationValue={updatePaginationValue}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default DentalManagement;
