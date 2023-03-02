import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Metals from "./Metals";
import Dropdown from "../../components/inputs/Dropdown";
import Yesno from "../../components/inputs/Yesno";
import "./calculator.css";

function Calculator(props: any) {
  const inputs = {
    Metals: [
      {
        Commodity: "",
        Grade: 0,
        Recovery: 0,
        Price: 0,
        Measurement: "",
        key: Math.random(),
      },
    ],
    Vein_width: "",
    Approx_tonnage: "",
    Avg_depth: "",
    Questions: [],
  };

  const [state, setState] = useState(inputs);
  const [err, setErr] = useState<null | string>(null);

  // useEffect(() => {
  //   props.setData({ inputs: null, outputs: null });
  // }, []);

  function updateInputs(key: string) {
    const obj = { ...state };
    return (val: any) => {
      obj[key] = val;
      setState({ ...obj });
    };
  }

  const navigate = useNavigate();
  async function handleSubmit() {
    const err = handleValidation({ ...state })();
    setErr(err);
    if (err) {
      return;
    }
    const formData = new FormData();
    const Metals = JSON.parse(JSON.stringify(state.Metals));
    Metals.map((el) => delete el.key);
    formData.append("metals", JSON.stringify(Metals));
    formData.append("vein_width", state.Vein_width);
    formData.append("approx_tonnage", state.Approx_tonnage);
    formData.append("avg_depth", state.Avg_depth);
    const res = await axios.post("http://localhost:8081/", formData);
    props.setData({ inputs: { ...state }, outputs: { ...res.data } });
  }

  useEffect(() => {
    props.data.outputs && navigate("/result");
  }, [props.data]);

  return (
    <div className="Calculator">
      <article>
        <h1>
          HOW CAN <span>SURGICAL MINING ADD VALUE?</span>
        </h1>
        <p>
          Using innovative technology, we make mining equipment ‘smart,’ able to
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
          <h2>Find out how much surgical mining could add to your project</h2>
          <Metals update={updateInputs("Metals")} />
          <VeinWidth update={updateInputs("Vein_width")} />
          <ApproximateTonnage update={updateInputs("Approx_tonnage")} />
          <AvgDepositDepth update={updateInputs("Avg_depth")} />
          <Questionnaire update={updateInputs("Questions")} />
        </div>
        <div className="actionButtons">
          <div className="errorContainer">
            <p>{err}</p>
          </div>
          <button onClick={handleSubmit}>CALCULATE NOW</button>
        </div>
      </div>
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
      <h3>Approximate width of vein</h3>
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
    { label: "300", value: "400" },
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
      <h3>Average depth of deposit</h3>
      <Dropdown
        options={options}
        displayValue={renderDropdownDisplayValue()}
        change={handleChange}
      />
    </div>
  );
}

function Questionnaire(props) {
  const [questions, setQuestions] = useState([
    { body: "Is the average dip angle 60° or greater?", answer: null },
    { body: "Is deposit within 10 meters of the surface?", answer: null },
  ]);

  useEffect(() => props.update([...questions]), [questions]);

  function handleChange(i: number) {
    const arr = [...questions];
    return (val: boolean) => {
      arr[i].answer = val;
      setQuestions(arr);
    };
  }

  return (
    <div className="Calculator__form questionnaire">
      {questions.map((q, i) => {
        const change = handleChange(i);
        return (
          <Yesno key={i} question={q.body} answer={q.answer} change={change} />
        );
      })}
    </div>
  );
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
    return err;
  };
}

export default Calculator;
