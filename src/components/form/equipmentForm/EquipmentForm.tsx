import { setCreateEquipment } from "../../../redux/equipmentSlice";
import { store, useAppDispatch, useAppSelector } from "../../../redux/store";
import {
  EQUIPMENT_OWNER_TYPE_SELECTIONS,
  EQUIPMENT_STATUS_SELECTIONS,
  EQUIPMENT_TYPE_SELECTIONS,
} from "../../../types/equipmentTypes";
import DentalLabModal from "../../DentalLabModal";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomRadioField,
  CustomShowModalField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function EquipmentForm() {
  const createData = store.getState().equipment.createData;
  const dispatch = useAppDispatch();
  const ownerId = useAppSelector((state) => state.equipment.createData.ownerId);
  const ownerName = useAppSelector(
    (state) => state.equipment.createData.ownerName
  );

  return (
    <div className={style.form}>
      <h1>設備資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="設備擁有者名稱"
            initialValue={ownerName ?? ""}
            placeholder="請選擇"
            handleChange={(_) => {}}
            editable={false}
            required
          />
          <CustomShowModalField text="選擇設備擁有者">
            {({ modalRef, closeModal }) => (
              <DentalLabModal
                closeModal={closeModal}
                ref={modalRef}
                dentalLabId={ownerId}
                onChange={(value) =>
                  dispatch(
                    setCreateEquipment({
                      ownerId: value.id,
                      ownerName: value.name ?? undefined,
                    })
                  )
                }
              />
            )}
          </CustomShowModalField>
          <CustomRadioField
            labelname="設備擁有者類型"
            initialValue={createData.ownerType}
            handleChange={(value) =>
              dispatch(
                setCreateEquipment({
                  ownerType:
                    value as (typeof EQUIPMENT_OWNER_TYPE_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={EQUIPMENT_OWNER_TYPE_SELECTIONS}
            radioGroupTexts={["Agent", "DentalLab"]}
          />
          <CustomInputText
            labelname="設備序號"
            initialValue={createData.serialNumber}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ serialNumber: value }))
            }
            required
          />
          <CustomRadioField
            labelname="設備類型"
            initialValue={createData.equipmentType}
            handleChange={(value) =>
              dispatch(
                setCreateEquipment({
                  equipmentType:
                    value as (typeof EQUIPMENT_TYPE_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={EQUIPMENT_TYPE_SELECTIONS}
            radioGroupTexts={["Unknown", "ART"]}
          />
          <CustomInputText
            labelname="幣別"
            initialValue={createData.currency}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ currency: value }))
            }
            required
          />
          <CustomInputSelect
            labelname="設備狀態"
            initialValue={createData.equipmentStatus}
            handleChange={(value) =>
              dispatch(
                setCreateEquipment({
                  equipmentStatus:
                    value as (typeof EQUIPMENT_STATUS_SELECTIONS)[number],
                })
              )
            }
            groupSelections={EQUIPMENT_STATUS_SELECTIONS}
            groupTexts={["未知", "可用", "已售出", "出租中", "無法使用"]}
          />
          <CustomInputText
            labelname="設備單價"
            type="number"
            initialValue={createData.amount + ""}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ amount: +value }))
            }
            required
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputText
            labelname="使用時間(月)"
            type="number"
            initialValue={createData.serviceLife + ""}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ serviceLife: +value }))
            }
            required
            style={{ width: "50%" }}
          />
          <CustomInputText
            labelname="保固期限"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={createData.warrantyDate.slice(0, 10)}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ warrantyDate: value }))
            }
            required
          />
          <CustomInputText
            labelname="到貨日"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={createData.receivedDate.slice(0, 10)}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ receivedDate: value }))
            }
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={createData.remark}
            handleChange={(value) =>
              dispatch(setCreateEquipment({ remark: value }))
            }
            rows={5}
          />
        </div>
      </div>
    </div>
  );
}

export default EquipmentForm;
