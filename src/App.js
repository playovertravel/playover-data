import logo from './playover.png';
import './App.css';
import Container from '@mui/material/Container';

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
    <Container className="App" maxWidth="lg" >
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <p>Hey team, here's the app blah blah</p>
    </Container>
  );
}

export default App;
