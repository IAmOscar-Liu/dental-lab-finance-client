import { setUpdateEquipment } from "../../../redux/equipmentSlice";
import { useAppDispatch } from "../../../redux/store";
import {
  EQUIPMENT_OWNER_TYPE_SELECTIONS,
  EQUIPMENT_STATUS_SELECTIONS,
  EQUIPMENT_TYPE_SELECTIONS,
  UpdateEquipmentType,
  getEquipmentStatusText,
} from "../../../types/equipmentTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomInputTextByValue,
  CustomRadioField,
  CustomShowModalField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function EquipmentUpdateForm({
  updateData,
}: {
  updateData: UpdateEquipmentType;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>設備資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputTextByValue
            labelname="設備擁有者名稱"
            valueSelector={() => updateData.ownerName ?? ""}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomShowModalField text="選擇設備擁有者" disabled>
            {() => null}
          </CustomShowModalField>
          <CustomRadioField
            labelname="設備擁有者類型"
            initialValue={updateData.ownerType}
            handleChange={(value) =>
              dispatch(
                setUpdateEquipment({
                  ownerType:
                    value as (typeof EQUIPMENT_OWNER_TYPE_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={EQUIPMENT_OWNER_TYPE_SELECTIONS}
            radioGroupTexts={[...EQUIPMENT_OWNER_TYPE_SELECTIONS]}
          />
          <CustomInputText
            labelname="設備序號"
            initialValue={updateData.serialNumber}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ serialNumber: value }))
            }
            required
          />
          <CustomRadioField
            labelname="設備類型"
            initialValue={updateData.equipmentType}
            handleChange={(value) =>
              dispatch(
                setUpdateEquipment({
                  equipmentType:
                    value as (typeof EQUIPMENT_TYPE_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={EQUIPMENT_TYPE_SELECTIONS}
            radioGroupTexts={[...EQUIPMENT_TYPE_SELECTIONS]}
          />
          <CustomInputText
            labelname="幣別"
            initialValue={updateData.currency}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ currency: value }))
            }
            required
          />
          <CustomInputSelect
            labelname="設備狀態"
            initialValue={updateData.equipmentStatus}
            handleChange={(value) =>
              dispatch(
                setUpdateEquipment({
                  equipmentStatus:
                    value as (typeof EQUIPMENT_STATUS_SELECTIONS)[number],
                })
              )
            }
            groupSelections={EQUIPMENT_STATUS_SELECTIONS}
            groupTexts={EQUIPMENT_STATUS_SELECTIONS.map(getEquipmentStatusText)}
          />
          <CustomInputText
            labelname="設備單價"
            type="number"
            initialValue={updateData.amount + ""}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ amount: +value }))
            }
            required
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputText
            labelname="使用時間(月)"
            type="number"
            initialValue={updateData.serviceLife + ""}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ serviceLife: +value }))
            }
            required
            style={{ width: "50%" }}
          />
          <CustomInputText
            labelname="保固期限"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={updateData.warrantyDate.slice(0, 10)}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ warrantyDate: value }))
            }
            required
          />
          <CustomInputText
            labelname="到貨日"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={updateData.receivedDate.slice(0, 10)}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ receivedDate: value }))
            }
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={updateData.remark}
            handleChange={(value) =>
              dispatch(setUpdateEquipment({ remark: value }))
            }
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}

export default EquipmentUpdateForm;
