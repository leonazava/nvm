import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./result.css";

export default function Result(props: any) {
  const navigate = useNavigate();

  if (!props.data.outputs) {
    navigate("/");
    return;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function renderMeasurement(val: string) {
    if (val === "g/t") {
      return "oz";
    } else {
      return "lb";
    }
  }
  return (
    <div className="Result">
      <div className="inputs container">
        <h1>YOUR INPUTS</h1>
        <div className="wrapper">
          {props.data.inputs.Metals.map((el: any) => (
            <div key={Math.random()} className="primary">
              <h2>{el.Commodity}</h2>
              <div className="parameters">
                <p>In-situ grade - {el.Grade}</p>
                <p>Recovery rate - {Math.ceil(el.Recovery * 100)}%</p>
              </div>
            </div>
          ))}
          <div className="secondary">
            <h2>Approximate width of vein (m)</h2>
            <div className="parameters">
              <p>{props.data.inputs.Vein_width}</p>
            </div>
          </div>
          <div className="secondary">
            <h2>Approximate tonnage (tonnes)</h2>
            <div className="parameters">
              <p>
                {parseInt(props.data.inputs.Approx_tonnage).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="secondary">
            <h2>Average depth of deposit (m)</h2>
            <div className="parameters">
              <p>{props.data.inputs.Avg_depth}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="outputs wrapper">
        <h1>ESTIMATED PROJECT VALUE</h1>
        <div className="container">
          <div className="primary">
            <div id="NPV">
              <h3>NPV</h3>
              <h1>${props.data.outputs.NPV.toLocaleString()}</h1>
            </div>
            <div id="IRR">
              <h3>IRR</h3>
              <h1>
                {props.data.outputs.NPV < 0
                  ? 0
                  : Math.ceil(props.data.outputs.IRR * 100)}
                %
              </h1>
            </div>
          </div>
          <div className="secondary">
            {props.data.inputs.Metals.map((metal, i) => (
              <div key={Math.random()} className={`metal_${i}`}>
                <h3>
                  {metal.Commodity} ({renderMeasurement(metal.Measurement)})
                </h3>
                <p>Price: ${metal.Price}</p>
                <h2>
                  {Math.ceil(props.data.outputs.Metals[i]).toLocaleString()}
                </h2>
              </div>
            ))}
          </div>
          <div className="tertiary">
            <div>
              <h2>Tonnes/day</h2>
              <div className="buffer" />
              <h2>{props.data.outputs.Tonnes_per_day}</h2>
            </div>
            <div>
              <h2>Operating Cost per Tonne</h2>
              <div className="buffer" />
              <h2>{props.data.outputs.Cost_per_tonne}</h2>
            </div>
            <div>
              <h2>AISC per Tonne</h2>
              <div className="buffer" />
              <h2>{props.data.outputs.AISC}</h2>
            </div>
            <div>
              <h2>Estimated Life of Mine</h2>
              <div className="buffer" />
              <h2>{props.data.outputs.LOM}</h2>
            </div>
          </div>
          <div className="divider" />
          <div className="final">
            <div>
              <h3>Availability (hr)</h3>
              <p>{props.data.outputs.Params.Availability * 100}%</p>
            </div>
            <div>
              <h3>Penetration Rate (m/hr)</h3>
              <p>{props.data.outputs.Params.Penetration}</p>
            </div>
            <div>
              <h3>Pile Top Drill Rigs (#)</h3>
              <p>{props.data.outputs.Params.Rigs}</p>
            </div>
            <div>
              <h3>Cutting Head Diameter (m)</h3>
              <p>{props.data.outputs.Params.Cutting_head_diameter}</p>
            </div>
          </div>
          <div className="buttons">
            <div onClick={() => props.setData({ inputs: "", outputs: "" })}>
              RECALCULATE
            </div>
            <div>BOOK A MEETING</div>
          </div>
        </div>
        <p>*All amounts are in US Dollars</p>
      </div>
    </div>
  );
}
