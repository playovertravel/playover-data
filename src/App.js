import logo from './playover.png';
import './App.css';
import Typography from '@mui/material/Typography';

/*
const data = {
    firstName: "",
    lastName: "",
    email: "",
    timeToSpend: 0,
    transportationMethod: "",
    notes: "",
    placesData: {},
}
*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Typography variant="h2">Hey team! Search for a place just like you would with Google Maps</Typography>
    </div>
  );
}

export default App;
