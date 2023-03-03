import { useState } from "react";
import Header from "./components/header/Header";
import Calculator from "./routes/calculator/Calculator";
import Footer from "./components/footer/Footer";
import "./App.css";
import Result from "./routes/result/Result";

function App() {
  const [data, setData] = useState({ inputs: null, outputs: null });
  return (
    <div className="App">
      <Header />
      {data.outputs ? (
        <Result data={data} setData={setData} />
      ) : (
        <Calculator data={data} setData={setData} />
      )}
      <Footer />
    </div>
  );
}

export default App;
