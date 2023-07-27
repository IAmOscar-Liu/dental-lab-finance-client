import { useMemo, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrPrevious } from "react-icons/gr";
import {
  PageSize,
  PaginationValueType,
  SEARCH_QUERY_PAGE_SIZE_SELECTIONS,
} from "../../types";
import style from "./CustomQueryController.module.css";

function CustomQueryController({
  paginationValue: { totalCount = 0, totalPage = 1, pageNo = 1, pageSize = 10 },
  updatePaginationValue,
}: {
  paginationValue: Partial<PaginationValueType>;
  updatePaginationValue: (
    update: Partial<Pick<PaginationValueType, "pageNo" | "pageSize">>
  ) => void;
}) {
  const pageInputRef = useRef<HTMLInputElement>(null);

  const buttonPage = useMemo(() => {
    const getResult = () => {
      const result = Array(totalPage)
        .fill(null)
        .map((_, idx) => idx + 1);
      if (totalPage <= 5) return result;
      if (pageNo <= 3)
        return result.map((r) => (r > 4 && r < totalPage ? "truncate" : r));
      if (totalPage - pageNo <= 2)
        return result.map((r) => (r > 1 && r < totalPage - 3 ? "truncate" : r));
      return result.map((r) =>
        (r > 1 && r < pageNo - 1) || (r > pageNo + 2 && r < totalPage)
          ? "truncate"
          : r
      );
    };

    return getResult().reduce((acc: (number | "truncate")[], cur) => {
      if (cur === acc.at(-1)) return acc;
      acc.push(cur);
      return acc;
    }, []);
  }, [totalPage, pageNo]);

  return (
    <div className={style.controller}>
      <p className={style["select-num-of-entries"]}>
        Show{" "}
        <select
          name="select-num-of-entries"
          value={pageSize + ""}
          onChange={(e) =>
            updatePaginationValue({
              pageSize: +e.target.value as PageSize,
            })
          }
        >
          {SEARCH_QUERY_PAGE_SIZE_SELECTIONS.filter(
            (selection) => selection <= 100
          ).map((selection) => (
            <option key={selection} value={selection}>
              {selection}
            </option>
          ))}
        </select>{" "}
        entries
      </p>
      <div className="flex"></div>
      <div className={style["select-page"]}>
        Page
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePaginationValue({
              pageNo: +(pageInputRef?.current?.value || 1),
            });
          }}
        >
          <input
            ref={pageInputRef}
            type="number"
            key={pageNo}
            defaultValue={pageNo}
            min={1}
            max={totalPage}
          />
        </form>
      </div>
      <div className="flex"></div>
      <p className={style["show-entries-range"]}>
        Showing <b>{(pageNo - 1) * pageSize + 1}</b> to{" "}
        <b>{Math.min(pageNo * pageSize, totalCount)}</b> of <b>{totalCount}</b>{" "}
        entries
      </p>
      <div className="flex"></div>
      <p className={style["select-page-btns"]}>
        <button
          className={style.prev}
          onClick={() =>
            pageNo > 1 && updatePaginationValue({ pageNo: pageNo - 1 })
          }
        >
          <GrPrevious />
        </button>
        {buttonPage.map((idx) =>
          typeof idx === "number" ? (
            <button
              key={idx}
              onClick={() => updatePaginationValue({ pageNo: idx })}
              className={idx === pageNo ? style.active : ""}
            >
              {idx}
            </button>
          ) : (
            <FiMoreHorizontal key={idx} className={style.moreIcon} />
          )
        )}
        <button
          className={style.next}
          onClick={() =>
            pageNo < totalPage && updatePaginationValue({ pageNo: pageNo + 1 })
          }
        >
          <GrPrevious />
        </button>
      </p>
    </div>
  );
}

export default CustomQueryController;
