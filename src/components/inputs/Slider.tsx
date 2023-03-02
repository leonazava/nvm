import { useRef, useEffect } from "react";
import "./inputs.css";
import "./slider.css";

function Slider(props: any) {
  const rangeRef = useRef();

  function handleInputChange(e: any) {
    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;

    target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
    props.change(e.target.value / 100);
  }

  return (
    <div className="InputContainer Slider">
      {props.label && <h4 className="label">{props.label}</h4>}
      <div className="InputWrapper">
        <p>{props.displayValue}%</p>
        <input
          ref={rangeRef.current}
          value={props.displayValue}
          onChange={handleInputChange}
          type="range"
          min="0"
          max={props.legend?.length - 1 || 100}
          placeholder="Slider"
        />
      </div>
    </div>
  );
}

export default Slider;
