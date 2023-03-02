import { useState } from "react";
import Header from "./components/header/Header";
import Calculator from "./routes/calculator/Calculator";
import Footer from "./components/footer/Footer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Result from "./routes/result/Result";

const router = (props: any) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Calculator {...props} />,
    },
    {
      path: "/result",
      element: <Result {...props} />,
    },
  ]);

function App() {
  const [data, setData] = useState({ inputs: null, outputs: null });
  return (
    <div className="App">
      {/* <img className="vector" src="/src/assets/Vector.png" /> */}
      <Header />
      <RouterProvider router={router({ data, setData })} />
      <Footer />
    </div>
  );
}

export default App;
