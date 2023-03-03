import "./inputs.css";

function Freetext(props: any) {
  return (
    <div className="InputContainer">
      {props.label && <h4 className="label">{props.label}</h4>}
      <div className="InputWrapper">
        {props.decoration && (
          <div className="decoration">({props.decoration})</div>
        )}
        <input
          type="text"
          placeholder={props.placeholder}
          value={props.displayValue}
          onChange={(e) =>
            e.target.value !== "0" && props.change(e.target.value)
          }
        />
      </div>
    </div>
  );
}

export default Freetext;
