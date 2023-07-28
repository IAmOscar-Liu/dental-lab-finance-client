import { updateDentalLabkeyNameTable } from "../../../constant/dentalLab";
import { useAppSelector } from "../../../redux/store";
import style from "../SummarizeForm.module.css";

function DentalUpdateFormSummary() {
  const updateData = useAppSelector((state) => state.dentalLab.updateData);

  return (
    <div className={style.summarize}>
      <h1>牙技所內容確認</h1>

      <div className={style.detail}>
        <h2>牙技所資料</h2>
        <div className={style["detail-body"]}>
          {Object.entries(updateDentalLabkeyNameTable)
            .filter(([_, value]) => !value.hideInFormSummary)
            .map(([key, value]) => (
              <p key={key}>
                <span>{value.text}</span>
                <span>
                  {value.formatter
                    ? value.formatter(
                        updateData[key as keyof typeof updateData]
                      )
                    : updateData[key as keyof typeof updateData]}
                </span>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DentalUpdateFormSummary;
