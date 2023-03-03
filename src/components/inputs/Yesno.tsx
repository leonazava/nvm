import "./inputs.css";

function Yesno(props: any) {
  function checkIfSelected(condition: boolean) {
    if (props.displayValue !== null) {
      if (condition) return "selected";
    }
  }

  return (
    <div className="Yesno">
      <h3>{props.question}</h3>
      <div className="answers">
        <div
          onClick={() => props.change(true)}
          className={checkIfSelected(props.displayValue)}
        >
          YES
        </div>
        <div
          onClick={() => props.change(false)}
          className={checkIfSelected(!props.displayValue)}
        >
          NO
        </div>
      </div>
    </div>
  );
}

export default Yesno;
