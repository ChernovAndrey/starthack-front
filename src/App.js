import MyChart from "./components/MyChart/MyChart";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import './App.css';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { year: 2020, equity: 100 },
  { year: 2021, equity: 120 },
  { year: 2022, equity: 150 },
  { year: 2023, equity: 180 },
];

const App = () => {
  return (
    <div className="App">
      <Navbar/>
      <div className="content">
        <Header/>
        <MyChart data={data} />
      </div>
    </div>
    
  );
};

export default App;