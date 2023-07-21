import {
  CSSProperties,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { RootState, useAppSelector } from "../../redux/store";
import { getInvalidMessage } from "../../utils/getInvalidMessage";
import style from "./CustomFormField.module.css";
import { AiFillDelete } from "react-icons/ai";

interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  labelname: string;
  initialValue: string;
  handleChange: (value: string) => void;
  editable?: boolean;
}

interface CustomTextFieldByValueProps
  extends InputHTMLAttributes<HTMLInputElement> {
  labelname: string;
  valueSelector: (state: RootState) => string;
  handleChange?: (value: string) => void;
  editable?: boolean;
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
  editable = true,
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
            if (type === "date" || type === "datetime-local")
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
          className={editable ? "" : style.disable}
          {...rest}
        />
        {invalidMessage.length > 0 && (
          <span className={style["invalid-message"]}>{invalidMessage}</span>
        )}
      </div>
    </label>
  );
}

export function CustomInputTextByValue({
  labelname,
  required,
  type,
  valueSelector,
  handleChange,
  editable = true,
  ...rest
}: CustomTextFieldByValueProps) {
  const [invalidMessage, setInvalidMessage] = useState("");
  const value = useAppSelector(valueSelector);

  return (
    <label className={style["text-field"]}>
      <p>
        {required && <small>*</small>}
        {labelname}
      </p>
      <div className={style["input-wrapper"]}>
        <input
          value={value}
          onChange={(e) => {
            if (handleChange && (type === "date" || type === "datetime-local"))
              handleChange(new Date(e.target.valueAsNumber).toISOString());
            else if (handleChange) handleChange(e.target.value);
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
          className={editable ? "" : style.disable}
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

export function CustomShowModalField({
  text,
  disabled = false,
  children,
}: {
  text: string;
  disabled?: boolean;
  children: (value: {
    modalRef: React.RefObject<HTMLDivElement>;
    closeModal: () => void;
  }) => ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (disabled) return;

    const handler = (e: MouseEvent) => {
      if (modalRef.current === null) return;
      const { x, right, y, bottom } = modalRef.current.getBoundingClientRect();
      if (
        e.clientX >= x &&
        e.clientX <= right &&
        e.clientY >= y &&
        e.clientY <= bottom
      )
        return;

      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [isOpen, disabled]);

  return (
    <>
      <div className={style["show-modal"]}>
        <p></p>
        <p
          style={
            disabled
              ? { color: "rgb(125, 125, 125)", pointerEvents: "none" }
              : {}
          }
          onClick={() => {
            if (disabled) return;
            setTimeout(() => {
              setIsOpen(true);
            }, 100);
          }}
        >
          {text}
        </p>
        {isOpen &&
          !disabled &&
          children({
            modalRef,
            closeModal,
          })}
      </div>
    </>
  );
}

export function CustomShowModalButton({
  text,
  style,
  children,
}: {
  text: string;
  style?: CSSProperties;
  children: (value: {
    modalRef: React.RefObject<HTMLDivElement>;
    closeModal: () => void;
  }) => ReactNode;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (modalRef.current === null) return;
      const { x, right, y, bottom } = modalRef.current.getBoundingClientRect();
      if (
        e.clientX >= x &&
        e.clientX <= right &&
        e.clientY >= y &&
        e.clientY <= bottom
      )
        return;

      if (isOpen) setIsOpen(false);
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => {
          setTimeout(() => {
            setIsOpen(true);
          }, 100);
        }}
        style={style}
      >
        {text}
      </button>
      {isOpen &&
        children({
          modalRef,
          closeModal,
        })}
    </>
  );
}

export function CustomShowList({
  labelname,
  noSelectMessage,
  valueSelector,
  renderlist,
  handleDelete,
}: {
  labelname: string;
  noSelectMessage: string;
  valueSelector: (state: RootState) => any[];
  renderlist: (value: any) => ReactNode;
  handleDelete: (id: string) => void;
}) {
  const values = useAppSelector(valueSelector);
  const [invalidMessage, setInvalidMessage] = useState("");

  useEffect(() => {
    if (values.length > 0 && invalidMessage.length > 0) setInvalidMessage("");
    // eslint-disable-next-line
  }, [values]);

  return (
    <div className={style["show-list"]}>
      <p>
        <small>*</small>
        {labelname}
      </p>
      <div className={style["list"]}>
        {values.length === 0 ? (
          <ul>
            <li>{noSelectMessage}</li>
            <li>
              <input
                type="text"
                value=""
                onChange={() => {}}
                style={{ display: "none" }}
                onInvalid={(e) =>
                  setInvalidMessage(
                    getInvalidMessage(e.target as HTMLInputElement)
                  )
                }
                required
              />
              {invalidMessage.length > 0 && (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.9em",
                    pointerEvents: "none",
                  }}
                >
                  {invalidMessage}
                </span>
              )}
            </li>
          </ul>
        ) : (
          <ul className={style["with-border"]}>
            {values.map((value, vIdx) => (
              <li key={vIdx}>
                <div>
                  {renderlist(value)}
                  <div className="flex"></div>
                  {value.id && (
                    <AiFillDelete onClick={() => handleDelete(value.id)} />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
