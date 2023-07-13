import { useEffect, useState } from "react";
import { setUpdateDentalLab } from "../../../redux/dentalLabSlice";
import { store, useAppDispatch } from "../../../redux/store";
import {
  DENTAL_REGION_SELECTIONS,
  DENTAL_STATUS_SELECTIONS,
  DentalLab,
  UpdateDentalLabType,
} from "../../../types/dentalLabTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomRadioField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function DentalUpdateForm({ data }: { data: DentalLab }) {
  const [updateData, setUpdateData] = useState<UpdateDentalLabType>(
    store.getState().dentalLab.updateData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const _updateData: UpdateDentalLabType = {
      id: data.id,
      name: data.name ?? "",
      status: data.status ?? "CONTACT",
      region: data.region ?? "EastAsia",
      country: data.country ?? "",
      state: data.state ?? "",
      city: data.city ?? "",
      address: data.address ?? "",
      phoneCode: data.phoneCode ?? "",
      phoneNumber: data.phoneNumber ?? "",
      contactPerson: data.contactPerson ?? "",
      email: data.email ?? "",
      uniformNo: data.uniformNo ?? "",
      remark: data.remark ?? "",
    };

    setUpdateData(_updateData);
    dispatch(setUpdateDentalLab(_updateData));
  }, [data, dispatch]);

  return (
    <div className={style.form}>
      <h1>牙技所資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="牙技所名稱"
            initialValue={updateData.name}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ name: value }))
            }
            placeholder="e.g. XX牙技所"
            required
          />
          <CustomInputText
            labelname="牙技所統一編號"
            initialValue={updateData.uniformNo}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ uniformNo: value }))
            }
            required
          />
          <CustomRadioField
            labelname="牙技所狀態"
            initialValue={updateData.status}
            handleChange={(value) =>
              dispatch(
                setUpdateDentalLab({
                  status: value as (typeof DENTAL_STATUS_SELECTIONS)[number],
                })
              )
            }
            radioGroupSelections={DENTAL_STATUS_SELECTIONS}
            radioGroupTexts={["聯繫中", "合約中", "已解約"]}
          />
          <CustomInputSelect
            labelname="牙技所區域"
            initialValue={updateData.region}
            handleChange={(value) =>
              dispatch(
                setUpdateDentalLab({
                  region: value as (typeof DENTAL_REGION_SELECTIONS)[number],
                })
              )
            }
            groupSelections={DENTAL_REGION_SELECTIONS}
            groupTexts={["EastAsia", "WestUS", "EastUS", "WestEurope"]}
          />
          <CustomInputText
            labelname="牙技所所在國家"
            initialValue={updateData.country}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ country: value }))
            }
            required
          />
          <CustomInputText
            labelname="State"
            initialValue={updateData.state}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ state: value }))
            }
          />
          <CustomInputText
            labelname="City"
            initialValue={updateData.city}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ city: value }))
            }
          />
          <CustomInputTextArea
            labelname="牙技所地址"
            initialValue={updateData.address}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ address: value }))
            }
            required
            rows={3}
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputText
            labelname="牙技所聯絡人"
            initialValue={updateData.contactPerson}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ contactPerson: value }))
            }
            placeholder="e.g. 王小明"
            required
          />
          <CustomInputText
            labelname="牙技所電話國碼"
            initialValue={updateData.phoneCode}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ phoneCode: value }))
            }
            placeholder="e.g. 886(Taiwan)"
          />
          <CustomInputText
            labelname="牙技所電話"
            initialValue={updateData.phoneNumber}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ phoneNumber: value }))
            }
            placeholder="e.g. 02-1234-5678"
            required
          />
          <CustomInputText
            labelname="牙技所email"
            initialValue={updateData.email}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ email: value }))
            }
            type="email"
            placeholder="e.g. example@example.com"
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={updateData.remark}
            handleChange={(value) =>
              dispatch(setUpdateDentalLab({ remark: value }))
            }
            rows={8}
          />
        </div>
      </div>
    </div>
  );
}

export default DentalUpdateForm;
