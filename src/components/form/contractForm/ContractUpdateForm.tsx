import { setUpdateContract } from "../../../redux/contractSlice";
import { useAppDispatch } from "../../../redux/store";
import {
  CONTRACT_STATUS_SELECTIONS,
  CONTRACT_TYPE_SELECTIONS,
  UpdateContractType,
} from "../../../types/contractTypes";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomRadioField,
  CustomShowModalField,
} from "../../custom/CustomFormField";
import style from "../Form.module.css";

function ContractUpdateForm({
  updateData,
}: {
  updateData: UpdateContractType;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>合約基本資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="合約編號"
            initialValue={updateData.contractNo}
            handleChange={(value) =>
              dispatch(setUpdateContract({ contractNo: value }))
            }
            required
          />
          <CustomInputTextArea
            labelname="合約名稱"
            placeholder="XX牙技所服務平台合約"
            initialValue={updateData.name}
            handleChange={(value) =>
              dispatch(setUpdateContract({ name: value }))
            }
            required
            rows={2}
          />
          <CustomInputText
            labelname="客戶名稱"
            initialValue={updateData.customerName}
            placeholder="請選擇"
            handleChange={(_) => {}}
            editable={false}
            required
          />
          <CustomShowModalField text="選擇客戶" disabled={true}>
            {() => null}
          </CustomShowModalField>
          <CustomRadioField
            labelname="合約種類"
            initialValue={updateData.type}
            handleChange={(_) => {}}
            radioGroupSelections={CONTRACT_TYPE_SELECTIONS}
            radioGroupTexts={["服務平台合約", "設備租賃合約", "設備買賣合約"]}
            disabled={true}
          />
          <CustomInputSelect
            labelname="合約狀態"
            initialValue={updateData.status}
            handleChange={(value) =>
              dispatch(
                setUpdateContract({
                  status: value as (typeof CONTRACT_STATUS_SELECTIONS)[number],
                })
              )
            }
            groupSelections={CONTRACT_STATUS_SELECTIONS}
            groupTexts={["確認中", "履行中", "已解約", "已終止"]}
          />
          <CustomInputText
            labelname="合約簽約日"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={updateData.signingDate.slice(0, 10)}
            handleChange={(value) =>
              dispatch(setUpdateContract({ signingDate: value }))
            }
            required
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputTextArea
            labelname="合約附件"
            initialValue={updateData.attachment}
            handleChange={(value) =>
              dispatch(setUpdateContract({ attachment: value }))
            }
            rows={4}
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={updateData.remark}
            handleChange={(value) =>
              dispatch(setUpdateContract({ remark: value }))
            }
            rows={8}
          />
        </div>
      </div>
    </div>
  );
}

export default ContractUpdateForm;
