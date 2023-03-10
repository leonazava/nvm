import { useEffect, useState } from "react";
import axios from "axios";
import Metals from "./Metals";
import Dropdown from "../../components/inputs/Dropdown";
import Yesno from "../../components/inputs/Yesno";
import "./calculator.css";
import Freetext from "../../components/inputs/Freetext";

function Calculator(props: any) {
  const inputs = {
    Metals: [
      {
        Commodity: "",
        Grade: "",
        Recovery: 0,
        Price: "",
        Measurement: "",
      },
    ],
    Vein_width: "",
    Approx_tonnage: "",
    Avg_depth: "",
    Sixty_deg: null,
    Ten_meters: null,
    Start_depth: null,
  };

  useEffect(() => {
    props.setData({ inputs: "", outputs: "" });
  }, []);

  const [state, setState] = useState(inputs);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [err, setErr] = useState<null | string>(null);

  useEffect(() => {
    const obj = { ...state };
    if (obj.Ten_meters === true) {
      obj.Start_depth = 10;
    } else {
      obj.Start_depth = null;
    }
    setState(obj);
  }, [state.Ten_meters]);

  function updateInputs(key: string) {
    const obj = { ...state };
    return (val: any) => {
      obj[key] = val;
      setState({ ...obj });
    };
  }

  async function handleSubmit() {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const err = handleValidation({ ...state })();
    setErr(err);
    if (err) {
      setIsSubmitting(false);
      return;
    }
    const formData = new FormData();
    const metalsObj = JSON.parse(JSON.stringify(state.Metals));
    metalsObj.map((el, i) => {
      delete el.key;
      metalsObj[i].Price = parseFloat(el.Price);
      metalsObj[i].Grade = parseFloat(el.Grade);
    });
    formData.append("metals", JSON.stringify(metalsObj));
    formData.append("vein_width", state.Vein_width);
    formData.append("approx_tonnage", state.Approx_tonnage);
    formData.append("avg_depth", state.Avg_depth);
    formData.append("sixty_deg", state.Sixty_deg);
    formData.append("ten_meters", state.Ten_meters);
    formData.append("start_depth", state.Start_depth);
    const res = await axios.post(
      "https://novamera.fruitfulsource.com/",
      formData
    );
    setIsSubmitting(false);
    props.setData({ inputs: { ...state }, outputs: { ...res.data } });
  }

  return (
    <div className="Calculator">
      <article>
        <h1>
          HOW CAN <span>SURGICAL MINING ADD VALUE?</span>
        </h1>
        <p>
          Using innovative technology, we make mining equipment ???smart,??? able to
          precisely navigate, drill and extract without the need for large
          open-pits or extensive underground infrastructure.
        </p>
        <p>
          Our unique technology integrates into conventional drilling tools,
          making them able to pinpoint, map, navigate and extract high-value
          stranded deposits without the need for costly infrastructure.
        </p>
      </article>
      <div className="Calculator__form wrapper">
        <div className="Calculator__form container">
          <h2>ESTIMATE YOUR PROJECT RETURN</h2>
          <Metals update={updateInputs("Metals")} />
          <VeinWidth update={updateInputs("Vein_width")} />
          <ApproximateTonnage update={updateInputs("Approx_tonnage")} />
          <AvgDepositDepth update={updateInputs("Avg_depth")} />
          <Yesno
            question="Is the average dip angle 60?? or greater?"
            change={updateInputs("Sixty_deg")}
            displayValue={state.Sixty_deg}
          />
          {state.Sixty_deg === false && (
            <div className="warningContainer">
              <p>
                Surgical mining provides ideal returns for deposits over 60
                degrees. Get in touch to discuss your situation.
              </p>
            </div>
          )}
          <Yesno
            question="Is deposit within 10 meters of the surface?"
            change={updateInputs("Ten_meters")}
            displayValue={state.Ten_meters}
          />
          {state.Ten_meters === false && (
            <div className="warningContainer">
              <Freetext
                label="If no, at what depth does it start? (meters)"
                displayValue={state.Start_depth || ""}
                placeholder="e.g. 15"
                change={updateInputs("Start_depth")}
              />
            </div>
          )}
        </div>
        <div className="actionButtons">
          <div className="errorContainer">
            <p>{err}</p>
          </div>
          <button onClick={handleSubmit}>
            {isSubmitting ? "Loading..." : "CALCULATE NOW"}
          </button>
        </div>
      </div>

      <img className="vector" src="https://i.imgur.com/uIw1hG8.png" />
    </div>
  );
}

function VeinWidth(props) {
  const [width, setWidth] = useState("");

  const options = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "3.5", value: "3.5" },
  ];

  useEffect(() => props.update(width), [width]);

  function renderDropdownDisplayValue() {
    let arr = [...options];
    let res = arr.filter((el) => el.value === width);
    if (res.length > 0) {
      return res[0].label;
    }
    return "Select";
  }

  function handleChange(val: string) {
    setWidth(val);
  }

  return (
    <div className="Calculator__form VeinWidth">
      <h3>Average vein width (meters)</h3>
      <Dropdown
        options={options}
        displayValue={renderDropdownDisplayValue()}
        change={handleChange}
      />
    </div>
  );
}

function ApproximateTonnage(props) {
  const [tonnage, setTonnage] = useState("");

  const options = [
    { label: "500k", value: "500000" },
    { label: "1 million", value: "1000000" },
    { label: "1.5 million", value: "1500000" },
    { label: "2 million", value: "2000000" },
  ];

  useEffect(() => props.update(tonnage), [tonnage]);

  function renderDropdownDisplayValue() {
    let arr = [...options];
    let res = arr.filter((el) => el.value === tonnage);
    if (res.length > 0) {
      return res[0].label;
    }
    return "Select";
  }

  function handleChange(val: string) {
    setTonnage(val);
  }

  return (
    <div className="Calculator__form ApproxtimateTonnage">
      <h3>Approximate tonnage</h3>
      <Dropdown
        options={options}
        displayValue={renderDropdownDisplayValue()}
        change={handleChange}
      />
    </div>
  );
}

function AvgDepositDepth(props) {
  const [depth, setDepth] = useState("");

  const options = [
    { label: "100", value: "100" },
    { label: "200", value: "200" },
    { label: "300", value: "300" },
    { label: "400", value: "400" },
    { label: "500+", value: "500" },
  ];

  useEffect(() => props.update(depth), [depth]);

  function renderDropdownDisplayValue() {
    let arr = [...options];
    let res = arr.filter((el) => el.value === depth);
    if (res.length > 0) {
      return res[0].label;
    }
    return "Select";
  }

  function handleChange(val: string) {
    setDepth(val);
  }

  return (
    <div className="Calculator__form veinWidth">
      <h3>Average deposit depth (meters)</h3>
      <Dropdown
        options={options}
        displayValue={renderDropdownDisplayValue()}
        change={handleChange}
      />
    </div>
  );
}

function StartingDepth(props) {
  if (props.ten_meters === false) {
    return (
      <div className="warningContainer">
        <Freetext
          label="If no, at what depth does it start? (meters)"
          displayValue={props.displayValue || ""}
          placeholder="e.g. 15"
          change={props.update}
        />
      </div>
    );
  }
}

function handleValidation(obj: any): () => string | null {
  const errMsg = "Some fields were left empty";
  return () => {
    let err: string | null = null;
    obj.Metals.map((el: any) => {
      if (!el.Commodity) {
        return (err = errMsg);
      }
      if (!el.Grade) {
        return (err = errMsg);
      }
      if (!el.Recovery || el.Recovery == 0) {
        return (err = errMsg);
      }
    });
    if (!obj.Vein_width) {
      return (err = errMsg);
    }
    if (!obj.Approx_tonnage) {
      return (err = errMsg);
    }
    if (!obj.Avg_depth) {
      return (err = errMsg);
    }
    if (obj.Sixty_deg === null) {
      return (err = errMsg);
    }
    if (obj.Ten_meters === null) {
      return (err = errMsg);
    }
    if (obj.Ten_meters === false && !obj.Start_depth) {
      return (err = errMsg);
    }
    return err;
  };
}

export default Calculator;
