import {
  STOCK_TYPE_SELECTIONS,
  getStockTypeText,
} from "../../../constant/stock";
import { setCreateStock } from "../../../redux/stockSlice";
import { store, useAppDispatch } from "../../../redux/store";
import { EquipmentBriefType, StockType } from "../../../types/stock";
import {
  getLocalISOStringFromUTC,
  getUTCISOStringFromLocal,
} from "../../../utils/formatString";
import {
  CustomInputText,
  CustomInputTextArea,
  CustomInputTextByValue,
  CustomRadioField,
  CustomShowList,
  CustomShowModalField,
} from "../../custom/CustomFormField";
import CustomSelectedEquipmentList from "../../custom/CustomSelectedEquipmentList";
import SearchContractModal from "../../modal/SearchContractModal";
import SearchEquipmentModal from "../../modal/SearchEquipmentModal";
import style from "../Form.module.css";

function StockForm() {
  const createData = store.getState().stock.createData;
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>庫存資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputTextByValue
            labelname="合約名稱"
            valueSelector={(state) => state.stock.createData.contractName ?? ""}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomInputTextByValue
            labelname="合約編號"
            valueSelector={(state) => state.stock.createData.contractNo ?? ""}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomShowModalField text="選擇合約">
            {({ modalRef, closeModal }) => (
              <SearchContractModal
                closeModal={closeModal}
                ref={modalRef}
                contractSelectors={(state) => state.stock.createData.contractId}
                onChange={(value) =>
                  dispatch(
                    setCreateStock({
                      contractId: value.id,
                      contractName: value.name ?? undefined,
                      contractNo: value.contractNo ?? undefined,
                    })
                  )
                }
              />
            )}
          </CustomShowModalField>
          <CustomRadioField
            labelname="入/出庫"
            initialValue={createData.inOutType}
            handleChange={(value) =>
              dispatch(
                setCreateStock({
                  inOutType: value as StockType,
                })
              )
            }
            radioGroupSelections={STOCK_TYPE_SELECTIONS}
            radioGroupTexts={STOCK_TYPE_SELECTIONS.map(getStockTypeText)}
          />
          <CustomInputText
            labelname="Operator"
            initialValue={createData.operator}
            handleChange={(value) =>
              dispatch(setCreateStock({ operator: value }))
            }
            required
          />
          <CustomInputText
            labelname="入/出庫時間"
            type="datetime-local"
            initialValue={getLocalISOStringFromUTC(createData.inOutTime).slice(
              0,
              16
            )}
            handleChange={(value) =>
              dispatch(
                setCreateStock({ inOutTime: getUTCISOStringFromLocal(value) })
              )
            }
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={createData.remark}
            handleChange={(value) =>
              dispatch(setCreateStock({ remark: value }))
            }
            rows={6}
          />
        </div>
        <div className={style["right-form"]}>
          <CustomShowList<EquipmentBriefType>
            labelname="入/出庫設備"
            noSelectMessage="未選擇設備"
            valueSelector={(state) => state.stock.createData.equipments}
            renderlist={(value) => (
              <CustomSelectedEquipmentList
                serialNumber={value.serialNumber + ""}
                equipmentType={value.equipmentType + ""}
              />
            )}
            handleDelete={(id) => {
              const equipments = store.getState().stock.createData.equipments;
              dispatch(
                setCreateStock({
                  equipments: equipments.filter((eq) => eq.id !== id),
                })
              );
            }}
          />
          <CustomShowModalField text="選擇設備">
            {({ modalRef, closeModal }) => (
              <SearchEquipmentModal
                closeModal={closeModal}
                ref={modalRef}
                equipmentSelectors={(state) =>
                  state.stock.createData.equipments
                }
                onChange={(value) => {
                  const equipments =
                    store.getState().stock.createData.equipments;
                  dispatch(
                    setCreateStock({
                      equipments: equipments.find((eq) => eq.id === value.id)
                        ? equipments.filter((eq) => eq.id !== value.id)
                        : [
                            ...equipments,
                            {
                              id: value.id,
                              serialNumber: value.serialNumber,
                              equipmentType: value.equipmentType,
                            },
                          ],
                    })
                  );
                }}
              />
            )}
          </CustomShowModalField>
        </div>
      </div>
    </div>
  );
}

export default StockForm;
