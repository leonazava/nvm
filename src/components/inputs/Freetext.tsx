import "./inputs.css";

function Freetext(props: any) {
  return (
    <div className="InputContainer">
      {props.label && <h4 className="label">{props.label}</h4>}
      <div className="InputWrapper">
        <input
          type="number"
          placeholder={props.placeholder}
          value={props.displayValue}
          onChange={(e) =>
            e.target.value !== "0" && props.change(parseFloat(e.target.value))
          }
        />
      </div>
    </div>
  );
}

export default Freetext;
