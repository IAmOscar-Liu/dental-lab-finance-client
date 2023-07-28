import {
  CONTRACT_STATUS_SELECTIONS,
  CONTRACT_TYPE_SELECTIONS,
  getContractStatusText,
  getContractTypeText,
} from "../../../constant/contract";
import { setCreateContract } from "../../../redux/contractSlice";
import { store, useAppDispatch } from "../../../redux/store";
import { ContractType } from "../../../types/contract";
import {
  getLocalISOStringFromUTC,
  getUTCISOStringFromLocal,
} from "../../../utils/formatString";
import {
  CustomInputSelect,
  CustomInputText,
  CustomInputTextArea,
  CustomInputTextByValue,
  CustomRadioField,
  CustomShowModalField,
} from "../../custom/CustomFormField";
import SearchDentalLabModal from "../../modal/SearchDentalLabModal";
import style from "../Form.module.css";

function ContractForm() {
  const createData = store.getState().contract.createData;
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>合約基本資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputText
            labelname="合約編號"
            initialValue={createData.contractNo}
            handleChange={(value) =>
              dispatch(setCreateContract({ contractNo: value }))
            }
            required
          />
          <CustomInputTextArea
            labelname="合約名稱"
            placeholder="XX牙技所服務平台合約"
            initialValue={createData.name}
            handleChange={(value) =>
              dispatch(setCreateContract({ name: value }))
            }
            required
            rows={2}
          />
          <CustomInputTextByValue
            labelname="客戶名稱"
            valueSelector={(state) => state.contract.createData.customerName}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomShowModalField text="選擇客戶">
            {({ modalRef, closeModal }) => (
              <SearchDentalLabModal
                closeModal={closeModal}
                ref={modalRef}
                dentalLabSelector={(state) =>
                  state.contract.createData.customerId
                }
                onChange={(value) =>
                  dispatch(
                    setCreateContract({
                      customerId: value.id,
                      customerName: value.name ?? undefined,
                    })
                  )
                }
              />
            )}
          </CustomShowModalField>
          <CustomRadioField
            labelname="合約種類"
            initialValue={createData.type}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  type: value as ContractType,
                })
              )
            }
            radioGroupSelections={CONTRACT_TYPE_SELECTIONS}
            radioGroupTexts={CONTRACT_TYPE_SELECTIONS.map(getContractTypeText)}
          />
          <CustomInputSelect
            labelname="合約狀態"
            initialValue={createData.status}
            handleChange={(_) => {}}
            groupSelections={[CONTRACT_STATUS_SELECTIONS[0]]}
            groupTexts={[getContractStatusText(CONTRACT_STATUS_SELECTIONS[0])]}
          />
          <CustomInputText
            labelname="合約簽約日"
            type="date"
            placeholder="yyyy/mm/dd"
            initialValue={getLocalISOStringFromUTC(
              createData.signingDate
            ).slice(0, 10)}
            handleChange={(value) =>
              dispatch(
                setCreateContract({
                  signingDate: getUTCISOStringFromLocal(value),
                })
              )
            }
            required
          />
        </div>
        <div className={style["right-form"]}>
          <CustomInputTextArea
            labelname="合約附件"
            initialValue={createData.attachment}
            handleChange={(value) =>
              dispatch(setCreateContract({ attachment: value }))
            }
            rows={4}
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={createData.remark}
            handleChange={(value) =>
              dispatch(setCreateContract({ remark: value }))
            }
            rows={8}
          />
        </div>
      </div>
    </div>
  );
}

export default ContractForm;
