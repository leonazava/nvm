import { useEffect, useState } from "react";
import Dropdown from "../../components/inputs/Dropdown";
import Freetext from "../../components/inputs/Freetext";
import Slider from "../../components/inputs/Slider";

export default function Metals(props: any) {
  const reset = {
    Commodity: "",
    Grade: "",
    Recovery: 0,
    Price: "",
    Measurement: "",
    key: Math.random(),
  };

  const [metals, setMetals] = useState([{ ...reset }]);

  // fill remaining commodities / double check the values
  const options = [
    {
      label: "Gold",
      value: "Gold",
      price: "1600.00",
      measurement: "g/t",
    },
    {
      label: "Silver",
      value: "Silver",
      price: "18.00",
      measurement: "g/t",
    },
    { label: "Lead", value: "Lead", price: "0.85", measurement: "%" },
    { label: "Zinc", value: "Zinc", price: "1.10", measurement: "%" },
    { label: "Copper", value: "Copper", price: "3.50", measurement: "%" },
    { label: "Nickel", value: "Nickel", price: "11.00", measurement: "%" },
    {
      label: "Platinum",
      value: "Platinum",
      price: "900.00",
      measurement: "g/t",
    },
    {
      label: "Palladium",
      value: "Palladium",
      price: "1300.00",
      measurement: "g/t",
    },
  ];

  useEffect(() => {
    props.update([...metals]);
  }, [metals]);

  function renderOptions() {
    let arr = [...options];
    metals.map((metal) => {
      arr.map((option, i: number) => {
        if (metal.Commodity === option.value) {
          arr.splice(i, 1);
        }
      });
    });
    return arr;
  }

  function renderDropdownDisplayValue(metal: any) {
    let arr = [...options];
    let res = arr.filter((el) => metal.Commodity === el.value);
    if (res.length > 0) {
      return res[0].label;
    }
    return "Select";
  }

  function handleAdd() {
    setMetals((prev) => [...prev, reset]);
  }

  function handleRemove(i: number) {
    setMetals((prev) => prev.filter((_, index: number) => index !== i));
  }

  function handleChange(i: number, field: string) {
    const arr = metals;
    return (val: any) => {
      arr[i][field] = val;
      setMetals([...arr]);
    };
  }

  function handleChangeMetalType(i: number) {
    const arr = metals;
    return (val: string) => {
      arr[i].Commodity = options.filter((el) => el.value === val)[0].value;
      arr[i].Price = options.filter((el) => el.value === val)[0].price;
      arr[i].Measurement = options.filter(
        (el) => el.value === val
      )[0].measurement;
      setMetals([...arr]);
    };
  }
  return (
    <div className="Calculator__form MetalTypes">
      <h3>
        Select metals <span>(Add up to 3)</span>
      </h3>
      {metals.map((metal, i) => {
        return (
          <div key={metal.key} className="metal container">
            {metals.length > 1 && (
              <img
                src="/close-btn.svg"
                alt="close-btn"
                onClick={() => handleRemove(i)}
              />
            )}
            <div className="metal inputsRow">
              <Dropdown
                label="Metal type:"
                options={renderOptions()}
                change={handleChangeMetalType(i)}
                displayValue={renderDropdownDisplayValue(metal)}
              />
              <Freetext
                label="In-situ grade:"
                placeholder="e.g. 5.00"
                displayValue={metal.Grade || ""}
                change={handleChange(i, "Grade")}
                decoration={metal.Measurement || ""}
              />
              <Slider
                label="Mill recovery rate:"
                displayValue={Math.floor(metal.Recovery * 100)}
                change={handleChange(i, "Recovery")}
              />
            </div>
            {/* <div>err msg</div> */}
          </div>
        );
      })}
      {metals.length < 3 && (
        <div className="AddMoreBtn" onClick={handleAdd}>
          + ADD MORE
        </div>
      )}
    </div>
  );
}
