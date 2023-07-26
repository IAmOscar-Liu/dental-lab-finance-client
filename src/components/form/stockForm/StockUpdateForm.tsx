import { setUpdateStock } from "../../../redux/stockSlice";
import { store, useAppDispatch } from "../../../redux/store";
import {
  EquipmentBriefType,
  STOCK_TYPE_SELECTIONS,
  StockType,
  UpdateStockType,
  getStockTypeText,
} from "../../../types/StockTypes";
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

function StockUpdateForm({ updateData }: { updateData: UpdateStockType }) {
  const dispatch = useAppDispatch();

  return (
    <div className={style.form}>
      <h1>庫存資料設定</h1>
      <div className={style["form-body"]}>
        <div className={style["left-form"]}>
          <CustomInputTextByValue
            labelname="合約名稱"
            valueSelector={(state) => state.stock.updateData.contractName ?? ""}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomInputTextByValue
            labelname="合約編號"
            valueSelector={(state) => state.stock.updateData.contractNo ?? ""}
            placeholder="請選擇"
            editable={false}
            required
          />
          <CustomShowModalField text="選擇合約">
            {({ modalRef, closeModal }) => (
              <SearchContractModal
                closeModal={closeModal}
                ref={modalRef}
                contractSelectors={(state) => state.stock.updateData.contractId}
                onChange={(value) =>
                  dispatch(
                    setUpdateStock({
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
            initialValue={updateData.inOutType}
            handleChange={(value) =>
              dispatch(
                setUpdateStock({
                  inOutType: value as StockType,
                })
              )
            }
            radioGroupSelections={STOCK_TYPE_SELECTIONS}
            radioGroupTexts={STOCK_TYPE_SELECTIONS.map(getStockTypeText)}
          />
          <CustomInputText
            labelname="Operator"
            initialValue={updateData.operator}
            handleChange={(value) =>
              dispatch(setUpdateStock({ operator: value }))
            }
            required
          />
          <CustomInputText
            labelname="入/出庫時間"
            type="datetime-local"
            initialValue={getLocalISOStringFromUTC(updateData.inOutTime).slice(
              0,
              16
            )}
            handleChange={(value) =>
              dispatch(
                setUpdateStock({ inOutTime: getUTCISOStringFromLocal(value) })
              )
            }
            required
          />
          <CustomInputTextArea
            labelname="備註"
            initialValue={updateData.remark}
            handleChange={(value) =>
              dispatch(setUpdateStock({ remark: value }))
            }
            rows={6}
          />
        </div>
        <div className={style["right-form"]}>
          <CustomShowList<EquipmentBriefType>
            labelname="入/出庫設備"
            noSelectMessage="未選擇設備"
            valueSelector={(state) => state.stock.updateData.equipments}
            renderlist={(value) => (
              <CustomSelectedEquipmentList
                serialNumber={value.serialNumber + ""}
                equipmentType={value.equipmentType + ""}
              />
            )}
            handleDelete={(id) => {
              const equipments = store.getState().stock.updateData.equipments;
              dispatch(
                setUpdateStock({
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
                  state.stock.updateData.equipments
                }
                onChange={(value) => {
                  const equipments =
                    store.getState().stock.updateData.equipments;
                  dispatch(
                    setUpdateStock({
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

export default StockUpdateForm;
