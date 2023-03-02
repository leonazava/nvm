import { useEffect, useState, useRef } from "react";
import "./inputs.css";

interface DorpdownProps {
  label?: string;
  options: { label: string; value: string }[];
  change: (option: string) => void;
  displayValue: string;
}

function Dropdown(props: DorpdownProps) {
  const [isActive, setIsActive] = useState(false);

  const ref = useRef<HTMLInputElement>(null);

  function handleOpen() {
    setIsActive((prev) => !prev);
  }

  function handleClickAway(event: any) {
    const outsideClick = !ref.current?.contains(event.target);
    if (outsideClick) {
      setIsActive(false);
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickAway);
  }, []);

  useEffect(() => {
    return () => {
      document.removeEventListener("click", handleClickAway);
    };
  }, []);

  return (
    <div className="InputContainer">
      {props.label && <h4 className="label">{props.label}</h4>}
      <div className="InputWrapper" onClick={handleOpen}>
        <div className={`dropdown ${isActive && "active"}`} ref={ref}>
          <p className={props.displayValue === "Select" ? "faint" : ""}>
            {props.displayValue}
          </p>
          <img src="/arrow.svg" alt="arrow" />
          <ul>
            {props.options.map((el: any, i: number) => {
              return (
                <li key={i} onClick={() => props.change(el.value)}>
                  {el.label}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
