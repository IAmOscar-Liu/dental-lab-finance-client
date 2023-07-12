import { CSSProperties } from "react";
import { TableGroupData } from "../../types";
import style from "./CustomTableGroup.module.css";

function CustomTableGroup({
  tableGroupData,
  columnWidths,
}: {
  tableGroupData: TableGroupData;
  columnWidths?: (number | string)[];
}) {
  return (
    <div className={style["table-group"]}>
      <p className={style["table-group-title"]}>{tableGroupData.title}</p>
      <table
        className={columnWidths ? style["column-width"] : ""}
        style={
          {
            "--column-widths": columnWidths
              ? columnWidths
                  .map((e) => (typeof e === "string" ? e : e + "fr"))
                  .join(" ")
              : "",
          } as CSSProperties
        }
      >
        {tableGroupData.heads ? (
          <tr>
            {tableGroupData.heads.map((th, thIdx) => (
              <th key={thIdx}>{th}</th>
            ))}
          </tr>
        ) : (
          <tr style={{ display: "none" }}>
            {Array(tableGroupData.data[0].length)
              .fill(null)
              .map((_, thIdx) => (
                <th key={thIdx}></th>
              ))}
          </tr>
        )}

        {tableGroupData.data.map((tr, trIdx) => (
          <tr key={trIdx}>
            {tr.map((td, tdIdx) => (
              <td key={tdIdx}>{td}</td>
            ))}
          </tr>
        ))}

        {tableGroupData.tails && (
          <tr>
            {tableGroupData.tails.map((th, thIdx) => (
              <th key={thIdx}>{th}</th>
            ))}
          </tr>
        )}
      </table>
    </div>
  );
}

export default CustomTableGroup;
