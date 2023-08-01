import { ImCross } from "react-icons/im";
import { MdOutlineAdd, MdOutlineStickyNote2 } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomPageTitle from "../../components/custom/CustomPageTitle";
import CustomQueryController from "../../components/custom/CustomQueryController";
import CustomSearchInputText from "../../components/custom/CustomSearchInputText";
import CustomTableGroup from "../../components/custom/CustomTableGroup";
import { MIN_ITEMS_TO_SHOW_BOTTOM_PAGE_CONTROLLER } from "../../constant";
import {
  ACCOUNT_SUBJECT_SELECTIONS,
  getAccountReceivableSubjectPriority,
  getAccountReceivableSubjectText,
} from "../../constant/AccountReceivable";
import { useGetAccountReceivablesPaginationQuery } from "../../hooks/useGetPaginationQuery";
import useManagementFilter from "../../hooks/useManagementFilter";
import {
  AccountAvailableSubject,
  AccountReceivableDetail,
} from "../../types/AccountReceivable";
import {
  formatDollarString,
  getLocalISOStringFromUTC,
} from "../../utils/formatString";
import style from "../Management.module.css";

function AccountReceivableManagement() {
  const {
    paginationValue,
    updatePaginationValue,
    data,
    isLoading,
    isFetching,
    error,
  } = useGetAccountReceivablesPaginationQuery({ pageNo: 1, pageSize: 10 });
  const { filter, setFilter, getFilteredData } = useManagementFilter<
    AccountAvailableSubject,
    AccountReceivableDetail
  >({ data: data?.result, filterBy: (value) => value.accountSubject });
  const navigate = useNavigate();

  return (
    <div className={style.management}>
      <CustomPageTitle
        icon={<MdOutlineStickyNote2 />}
        title="財務管理/應收帳款"
      />
      <div className={style["title-and-search"]}>
        <h5>應收帳款總覽</h5>
        <div className="flex"></div>
        <CustomSearchInputText placeholder="查詢應收帳款" />
      </div>

      {isLoading ? (
        <LoadingSpinner totalHeight={350} />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <div className={style["filter-btns"]}>
            {(["ALL", ...ACCOUNT_SUBJECT_SELECTIONS] as const).map(
              (displayType) => (
                <button
                  key={displayType}
                  disabled={displayType === filter}
                  onClick={() => setFilter(displayType)}
                >
                  {displayType === "ALL"
                    ? "全部"
                    : getAccountReceivableSubjectText(displayType)}{" "}
                  ({getFilteredData(displayType).length})
                </button>
              )
            )}
            <button
              onClick={() => navigate("/account-receivable-management/new")}
            >
              <MdOutlineAdd />
              新增應收帳款
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
                  "auto",
                  "20ch",
                  "max(10ch, 10%)",
                  "9ch",
                  "max(15ch, 15%)",
                  "max(12ch, 12%)",
                  "9ch",
                  "10ch",
                ]}
                tableGroupData={{
                  heads: [
                    {
                      text: "牙技所名稱",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "Account Subject",
                      sortFn: (a, b) =>
                        getAccountReceivableSubjectPriority(a) -
                        getAccountReceivableSubjectPriority(b),
                    },
                    {
                      text: "應收帳款",
                      sortFn: (a, b) =>
                        +a.replace(/[^\d]/g, "") - +b.replace(/[^\d]/g, ""),
                    },
                    {
                      text: "幣別",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "發票號碼",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "發票日期",
                      sortFn: (a, b) => a.localeCompare(b),
                    },
                    {
                      text: "已收款",
                      sortFn: (a, b) => +a - +b,
                    },
                    { text: "查看細節" },
                  ],
                  data: getFilteredData(filter).map((accountReceivable) => {
                    return [
                      accountReceivable.customerName ?? "",
                      <span style={{ marginLeft: "2ch" }}>
                        {getAccountReceivableSubjectText(
                          accountReceivable.accountSubject
                        )}
                      </span>,
                      formatDollarString(accountReceivable.amount),
                      <span>{accountReceivable.currency ?? ""}</span>,
                      accountReceivable.invoiceNo,
                      (
                        getLocalISOStringFromUTC(
                          accountReceivable.invoiceDate
                        ) ?? ""
                      ).slice(0, 10),
                      <span
                        style={{
                          marginLeft: "2ch",
                          marginTop: 2,
                          display: "block",
                        }}
                      >
                        {accountReceivable.received ? <TiTick /> : <ImCross />}
                        <b style={{ display: "none" }}>
                          {accountReceivable.received ? "1" : "0"}
                        </b>
                      </span>,
                      <Link
                        to={`/account-receivable-management/overview/${accountReceivable.id}`}
                      >
                        查看細節
                      </Link>,
                    ];
                  }),
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

export default AccountReceivableManagement;
