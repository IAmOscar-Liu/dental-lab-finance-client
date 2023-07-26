import { CSSProperties, useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { TableGroupData } from "../../types";
import style from "./CustomTableGroup.module.css";

function CustomTableGroup({
  tableGroupData,
  columnWidths = [],
  tableMinWidth = "auto",
}: {
  tableGroupData: TableGroupData;
  columnWidths?: (number | string)[];
  tableMinWidth?: number | string;
}) {
  const [sortedData, setSortedData] = useState<typeof tableGroupData.data>([]);
  const [sortDirections, setSortDirections] = useState<("asc" | "desc")[]>([]);

  useEffect(() => {
    setSortedData([...tableGroupData.data]);
    setSortDirections(
      tableGroupData.heads ? Array(tableGroupData.heads.length).fill("asc") : []
    );
  }, [tableGroupData]);

  return (
    <div className={style["table-group"]}>
      {tableGroupData.title && (
        <div className={style["table-group-title"]}>{tableGroupData.title}</div>
      )}
      <div className={style["table-group-table"]}>
        <table
          className={columnWidths.length > 0 ? style["column-width"] : ""}
          style={
            {
              "--column-widths": columnWidths
                .map((e) => (typeof e === "string" ? e : e + "fr"))
                .join(" "),
              "--table-min-width":
                typeof tableMinWidth === "number"
                  ? tableMinWidth + "px"
                  : tableMinWidth,
            } as CSSProperties
          }
        >
          {tableGroupData.heads ? (
            <thead>
              <tr>
                {tableGroupData.heads.map(
                  ({ text, sortFn, style: TextStyle = {} }, thIdx) => (
                    <th
                      key={thIdx}
                      className={sortFn ? style["with-sort"] : ""}
                      onClick={() => {
                        if (
                          !sortFn ||
                          typeof sortedData[0]?.[thIdx] !== "string"
                        )
                          return;
                        setSortedData(() => {
                          const result = [...sortedData].sort((a, b) =>
                            sortFn(a[thIdx] as string, b[thIdx] as string)
                          );

                          if (sortDirections[thIdx] === "asc") return result;
                          return result.reverse();
                        });
                        setSortDirections(
                          sortDirections.map((dir, dIdx) =>
                            dIdx === thIdx
                              ? dir === "asc"
                                ? "desc"
                                : "asc"
                              : dir
                          )
                        );
                      }}
                    >
                      <span style={TextStyle}>
                        {text}
                        {sortFn && (
                          <FaChevronDown
                            className={
                              sortDirections[thIdx] === "desc"
                                ? style.reverse
                                : ""
                            }
                          />
                        )}
                      </span>
                    </th>
                  )
                )}
              </tr>
            </thead>
          ) : (
            <thead>
              <tr style={{ display: "none" }}>
                {Array(tableGroupData.data[0].length)
                  .fill(null)
                  .map((_, thIdx) => (
                    <th key={thIdx}></th>
                  ))}
              </tr>
            </thead>
          )}

          <tbody>
            {sortedData.map((tr, trIdx) => (
              <tr key={trIdx}>
                {tr.map((td, tdIdx) => (
                  <td key={tdIdx}>{td}</td>
                ))}
              </tr>
            ))}
          </tbody>
          {tableGroupData.tails && (
            <thead>
              <tr>
                {tableGroupData.tails.map((th, thIdx) => (
                  <th key={thIdx}>{th}</th>
                ))}
              </tr>
            </thead>
          )}
        </table>
      </div>
    </div>
  );
}

export default CustomTableGroup;
