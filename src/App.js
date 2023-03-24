import MyChart from "./components/MyChart/MyChart";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Screen1 from "./components/Screen1/Screen1";
import './App.css';
import { Component } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { year: 2020, equity: 100 },
  { year: 2021, equity: 120 },
  { year: 2022, equity: 150 },
  { year: 2023, equity: 180 },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavbarListItemId: null,
      // showPopup: false,
      // popupAction: '',
      // navbarList: [],
      // equitiesList: [],
      // contentDeletionMode: false,
      // loadingEquities: false,
      // errorMessageLoadingEquities: '',
      // dataProvider: 'yahoo',
    };
  }

  onNavbarListItemSelection(id) {
    this.setState({ selectedNavbarListItemId: id});
  }

  render() {
    return (
      <div className="App">
        {/* <Navbar 
          onNavbarListItemSelection={this.onNavbarListItemSelection.bind(this)}
          selectedNavbarListItemId={this.state.selectedNavbarListItemId}
        /> */}
        <div className="content">
          {/* <Header/> */}
          <Screen1/>
        </div>
      </div>
    )
  }
}

// const App = () => {
//   return (
//     <div className="App">
//       <Navbar/>
//       <div className="content">
//         <Header/>
//         <MyChart data={data} />
//       </div>
//     </div>
    
//   );
// };

export default App;