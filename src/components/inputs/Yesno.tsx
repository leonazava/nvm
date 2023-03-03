import "./inputs.css";

function Yesno(props: any) {
  function renderWarning() {
    if (props.input_prompt) {
    }
  }
  return (
    <div className="Yesno">
      <h3>{props.question}</h3>
      <div className="answers">
        <div
          onClick={() => props.change("Yes")}
          className={props.answer === "Yes" ? "selected" : ""}
        >
          YES
        </div>
        <div
          onClick={() => props.change("No")}
          className={props.answer === "No" ? "selected" : ""}
        >
          NO
        </div>
      </div>
      {props.answer === "No" && <p>{props.warning}</p>}
    </div>
  );
}

export default Yesno;
