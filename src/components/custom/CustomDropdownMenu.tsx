import { useEffect, useRef, useState, MouseEvent, CSSProperties } from "react";
import { IoIosArrowDown } from "react-icons/io";
import styles from "./CustomDropdownMenu.module.css";

type Props = {
  data: string[];
  defaultSelection?: string;
  onItemChange: (item: string) => void;
  menuWidth?: number;
  menuBgColor?: string;
  menuBgColorHover?: string;
};

function CustomDropdownMenu({
  data,
  onItemChange,
  defaultSelection = "Please Select",
  menuWidth = 200,
  menuBgColor = "#ed4c21",
  menuBgColorHover = "#d12c00",
}: Props) {
  const customSelectList = useRef<HTMLDivElement>(null);
  const customSelectCheckbox = useRef<HTMLInputElement>(null);
  const [selectedItem, setSelectedItem] = useState<string | undefined>();

  const capitalizeWords = (words: string) => {
    return words
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substring(1))
      .join(" ");
  };

  const handleMouseMove = (_: MouseEvent) => {
    customSelectList.current
      ?.querySelector("ul li[data-active='true']")
      ?.setAttribute("data-active", "false");
    // ?.classList.remove("active");
  };

  const handleSelectItemChange = (item: string | undefined) => {
    setSelectedItem(item);
    if (item !== undefined) onItemChange(item);
  };

  useEffect(() => {
    const clickHandler = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !customSelectCheckbox.current ||
        customSelectCheckbox.current.contains(target)
      ) {
        return;
      }
      if (customSelectList.current?.contains(target)) {
        handleSelectItemChange(target.dataset.value);
      }

      customSelectList.current
        ?.querySelector("ul li[data-active='true']")
        ?.setAttribute("data-active", "false");
      // ?.classList.remove("active");
      customSelectCheckbox.current.checked = false;
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (
        customSelectCheckbox.current?.checked &&
        (e.code === "Space" ||
          e.code === "Enter" ||
          e.code === "ArrowUp" ||
          e.code === "ArrowDown")
      ) {
        const highlightItem =
          customSelectList.current?.querySelector(
            "ul li[data-active='true']"
          ) || customSelectList.current?.querySelector("ul li:hover");

        if ((e.code === "Space" || e.code === "Enter") && highlightItem) {
          highlightItem.setAttribute("data-active", "false");
          // highlightItem.classList.remove("active");
          handleSelectItemChange((highlightItem as HTMLElement).dataset.value);
          if (e.code === "Enter") customSelectCheckbox.current.checked = false;
        } else if (e.code === "ArrowDown" && !highlightItem) {
          customSelectList.current
            ?.querySelector("ul li:first-of-type")
            ?.setAttribute("data-active", "true");
          // ?.classList.add("active");
        } else if (e.code === "ArrowUp" && !highlightItem) {
          customSelectList.current
            ?.querySelector("ul li:last-of-type")
            ?.setAttribute("data-active", "true");
          // ?.classList.add("active");
        } else if (
          e.code === "ArrowDown" &&
          highlightItem?.nextElementSibling
        ) {
          highlightItem.setAttribute("data-active", "false");
          highlightItem.nextElementSibling.setAttribute("data-active", "true");
          //   highlightItem.classList.remove("active");
          //   highlightItem.nextElementSibling.classList.add("active");
        } else if (
          e.code === "ArrowUp" &&
          highlightItem?.previousElementSibling
        ) {
          highlightItem.setAttribute("data-active", "false");
          highlightItem.previousElementSibling.setAttribute(
            "data-active",
            "true"
          );
          //   highlightItem.classList.remove("active");
          //   highlightItem.previousElementSibling.classList.add("active");
        }
      }
    };

    document.addEventListener("click", clickHandler);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", handleKeydown);
    };
  // eslint-disable-next-line  
  }, []);

  return (
    <div
      style={
        {
          "--custom-select-width": menuWidth + "px",
          "--custom-select-primary-bg-color": menuBgColor,
          "--custom-select-primary-bg-color-hover":
            menuBgColorHover,
        } as CSSProperties
      }
      className={styles["custom-select"]}
    >
      <p className={styles["custom-select-title"]}>
        {selectedItem ? capitalizeWords(selectedItem) : defaultSelection}
        <IoIosArrowDown />
      </p>
      <input ref={customSelectCheckbox} type="checkbox" />
      <div
        ref={customSelectList}
        className={styles["custom-select-list"]}
        onMouseMove={handleMouseMove}
      >
        <ul>
          {data.map((d) => (
            <li key={d} data-value={d} data-active={false}>
              {capitalizeWords(d)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CustomDropdownMenu;
