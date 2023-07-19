import { setCreateDentalLab } from "../../../redux/dentalLabSlice";
import { store, useAppDispatch } from "../../../redux/store";
import {
  DENTAL_REGION_SELECTIONS,
  DENTAL_STATUS_SELECTIONS,
  getDentalStatusText,
} from "../../../types/dentalLabTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomRadioField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function DentalForm() {
  const createData = store.getState().dentalLab.createData;
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>牙技所資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="牙技所名稱"
            initialValue={createData.name}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ name: value }))
            }
            placeholder="e.g. XX牙技所"
            required
          />
          <CustomInputText
            labelname="牙技所統一編號"
            initialValue={createData.uniformNo}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ uniformNo: value }))
            }
            required
          />
          <CustomRadioField
            labelname="牙技所狀態"
            initialValue={createData.status}
            handleChange={(value) =>
              dispatch(
                setCreateDentalLab({
                  status: value as (typeof DENTAL_STATUS_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={DENTAL_STATUS_SELECTIONS}
            radioGroupTexts={DENTAL_STATUS_SELECTIONS.map(getDentalStatusText)}
          />
          <CustomInputSelect
            labelname="牙技所區域"
            initialValue={createData.region}
            handleChange={(value) =>
              dispatch(
                setCreateDentalLab({
                  region: value as (typeof DENTAL_REGION_SELECTIONS)[number],
                })
              )
            }
            groupSelections={DENTAL_REGION_SELECTIONS}
            groupTexts={[...DENTAL_REGION_SELECTIONS]}
          />
          <CustomInputText
            labelname="牙技所所在國家"
            initialValue={createData.country}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ country: value }))
            }
            required
          />
          <CustomInputText
            labelname="State"
            initialValue={createData.state}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ state: value }))
            }
          />
          <CustomInputText
            labelname="City"
            initialValue={createData.city}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ city: value }))
            }
          />
          <CustomInputTextArea
            labelname="牙技所地址"
            initialValue={createData.address}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ address: value }))
            }
            required
            rows={3}
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputText
            labelname="牙技所聯絡人"
            initialValue={createData.contactPerson}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ contactPerson: value }))
            }
            placeholder="e.g. 王小明"
            required
          />
          <CustomInputText
            labelname="牙技所電話國碼"
            initialValue={createData.phoneCode}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ phoneCode: value }))
            }
            placeholder="e.g. 886(Taiwan)"
          />
          <CustomInputText
            labelname="牙技所電話"
            initialValue={createData.phoneNumber}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ phoneNumber: value }))
            }
            placeholder="e.g. 02-1234-5678"
            required
          />
          <CustomInputText
            labelname="牙技所email"
            initialValue={createData.email}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ email: value }))
            }
            type="email"
            placeholder="e.g. example@example.com"
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={createData.remark}
            handleChange={(value) =>
              dispatch(setCreateDentalLab({ remark: value }))
            }
            rows={8}
          />
        </div>
      </div>
    </div>
  );
}

export default DentalForm;
