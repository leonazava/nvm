import { useState, useEffect, useRef } from "react";
import "./inputs.css";

function Yesno(props: any) {
  const inputRef = useRef(null);
  const [err, setErr] = useState(false);

  function handleError() {
    setErr(true);
  }

  useEffect(() => {
    document.addEventListener("customSubmit", handleError, false);
  }, []);

  //cleanup
  useEffect(
    () => () => {
      document.addEventListener("customSubmit", handleError, false);
    },
    []
  );

  useEffect(() => {
    props.dispayValue && setErr(false);
  }, [props]);

  function checkIfSelected(condition: boolean) {
    if (props.displayValue !== null) {
      if (condition) return "selected";
    }
  }

  return (
    <div className={`Yesno ${err && "error"}`} ref={inputRef}>
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
