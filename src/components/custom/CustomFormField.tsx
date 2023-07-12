import { InputHTMLAttributes, TextareaHTMLAttributes, useState } from "react";
import { getInvalidMessage } from "../../utils/getInvalidMessage";
import style from "./CustomFormField.module.css";

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelname: string;
  initialValue: string;
  handleChange: (value: string) => void;
}

interface CustomTextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelname: string;
  initialValue: string;
  handleChange: (value: string) => void;
}
interface CustomRadioFieldProps extends Omit<CustomTextFieldProps, "type"> {
  radioGroupSelections: Readonly<string[]> | string[];
  radioGroupTexts: string[];
  initialValue: string;
  handleChange: (value: string) => void;
}

interface CustomSelectFieldProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  labelname: string;
  initialValue: string;
  groupSelections: Readonly<string[]> | string[];
  groupTexts: string[];
  handleChange: (value: string) => void;
}

export function CustomInputText({
  labelname,
  required,
  type,
  initialValue,
  handleChange,
  ...rest
}: CustomTextFieldProps) {
  const [invalidMessage, setInvalidMessage] = useState("");

  return (
    <label className={style["text-field"]}>
      <p>
        {required && <small>*</small>}
        {labelname}
      </p>
      <div className={style["input-wrapper"]}>
        <input
          key={initialValue}
          defaultValue={initialValue}
          onChange={(e) => {
            if (type === "date")
              handleChange(new Date(e.target.valueAsNumber).toISOString());
            else handleChange(e.target.value);
          }}
          onInput={(e) => {
            if (invalidMessage === "") return;
            const element = e.target as HTMLInputElement;
            if (element.validity.valid) return setInvalidMessage("");
            setInvalidMessage(getInvalidMessage(element));
          }}
          onInvalid={(e) =>
            setInvalidMessage(getInvalidMessage(e.target as HTMLInputElement))
          }
          required={!!required}
          type={type}
          {...rest}
        />
        {invalidMessage.length > 0 && (
          <span className={style["invalid-message"]}>{invalidMessage}</span>
        )}
      </div>
    </label>
  );
}

export function CustomInputTextArea({
  labelname,
  required,
  initialValue,
  handleChange,
  ...rest
}: CustomTextAreaFieldProps) {
  const [invalidMessage, setInvalidMessage] = useState("");

  return (
    <label className={style["text-field"]}>
      <p>
        {required && <small>*</small>}
        {labelname}
      </p>
      <div className={style["input-wrapper"]}>
        <textarea
          key={initialValue}
          defaultValue={initialValue}
          onChange={(e) => handleChange(e.target.value)}
          onInput={(e) => {
            if (invalidMessage === "") return;
            const element = e.target as HTMLInputElement;
            if (element.validity.valid) return setInvalidMessage("");
            setInvalidMessage(getInvalidMessage(element));
          }}
          onInvalid={(e) =>
            setInvalidMessage(getInvalidMessage(e.target as HTMLInputElement))
          }
          required={!!required}
          {...rest}
        />
        {invalidMessage.length > 0 && (
          <span className={style["invalid-message"]}>{invalidMessage}</span>
        )}
      </div>
    </label>
  );
}

export function CustomRadioField({
  labelname,
  radioGroupTexts,
  radioGroupSelections,
  initialValue,
  handleChange,
  ...rest
}: CustomRadioFieldProps) {
  return (
    <div className={style.radio}>
      <p>{labelname}</p>
      <div className={style["radio-group"]}>
        {radioGroupSelections.map((selection, idx) => (
          <label key={selection}>
            <input
              key={initialValue}
              type="radio"
              name={labelname}
              defaultChecked={selection === initialValue}
              onChange={() => handleChange(selection)}
              {...rest}
            />
            <span>{radioGroupTexts[idx]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function CustomInputSelect({
  labelname,
  type,
  initialValue,
  groupSelections,
  groupTexts,
  handleChange,
  ...rest
}: CustomSelectFieldProps) {
  return (
    <div className={style.select}>
      <p>{labelname}</p>
      <div className={style["select-wrapper"]}>
        <select
          key={initialValue}
          name={labelname}
          defaultValue={initialValue}
          onChange={(e) => handleChange(e.target.value)}
          {...rest}
        >
          {groupSelections.map((selection, idx) => (
            <option key={selection} value={selection}>
              {groupTexts[idx]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
