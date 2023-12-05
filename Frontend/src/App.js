import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [number, _number] = useState(0);
  const [data, _data] = useState([])

  const generate = async (type = 'triangle') => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_HOST}/generate/${type}`,
        {
          params: { number }
        }
      );
      _data(data.data.data)
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <div className="App">
      <input
        placeholder="Input Angka"
        type="number"
        value={number}
        onChange={(e) => _number(e.target.value)}
      />

      <div style={{ columnGap: 10, marginTop: 16, display: "flex" }}>
        <button onClick={() => generate('triangle')}>Generate Segitiga</button>
        <button onClick={() => generate('ganjil')}>Generate Bilangan Ganjil</button>
        <button onClick={() => generate('prima')}>Generate Bilangan Prima</button>
      </div>

      <h1>Result</h1>
      {data && data.map((v, idx) => (
        <span key={idx}>{v}</span>
      ))}
    </div>
  );
}

export default App;
