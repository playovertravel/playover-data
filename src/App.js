import React, { useState } from 'react';
import logo from './playover.png';
import './App.css';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}

function App() {
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  
  const onChangeInput = (event) => {
    setData({...data, [event.target.name]: event.target.value})
  }

  const onSetUserData = () => {
    setUserData({...userData,
      age: 27,
      ambassador_information: {},
      current_flight: {},
      email: data.email,
      emergency_contact: "1234567890",
      first_name: data.firstName,
      international_number: "+11234567890",
      isAmbassador: false,
      last_name: data.lastName,
      notifications: true,
      phone: "0987654321",
      preferred_currency: "USD",
      preferred_lanuage: "English",
      reviews_given: 0,
      reviews_received: 0,
      will_leave_airport: true,
      wishlist: {}
    });
  }
  
  const onSubmitForm = async (event) => {
    event.preventDefault()

    try {
      const docRef = await addDoc(collection(db, "playover-data"), data);
      const userRef = await addDoc(collection(db, "user-data"), userData)
      console.log("Document written with id: ", docRef.id);
      console.log("Document written with id: ", userRef.id);
    } catch(e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="App">
      <Container className="AppContainer">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" color="white">
          Hey team! Search for a place just like you would with Google Maps
        </Typography>
      </Container>
      <form onSubmit={onSubmitForm}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 650,
            '& > :not(style)': { m: 3 },
          }}
        >
          <TextField
            id="firstName" 
            name="firstName"
            label="First Name" 
            variant="outlined"
            margin="normal"
            color="primary"
            fullWidth
            value={data.firstName}
            onChange={(e) => onChangeInput(e)}
            required
          />
          <TextField
            id="lastName" 
            name="lastName"
            label="Last Name" 
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.lastName}
            onChange={(e) => onChangeInput(e)}
            required
          />
          <TextField
            id="email" 
            name="email"
            label="Email" 
            variant="outlined"
            margin="normal"
            fullWidth
            value={data.email}
            onChange={(e) => onChangeInput(e)}
            required
          />
          <TextField
            id="timeToSpend"
            name="timeToSpend"
            label="Minimum Time To Spend"
            type="number"
            margin="normal"
            helperText="Select the minimum number of hours one should expect to spend on this activity"
            fullWidth
            value={data.timeToSpend}
            onChange={(e) => onChangeInput(e)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
          <FormControl sx={{ m: 1, minWidth: 650 }}>
            <InputLabel id="transportationTypeSelect">Transportation Type</InputLabel>
            <Select
              labelId="transportationType"
              id="transportationType"
              name="transportationType"
              value={data.transportationType}
              label="Transportation Type"
              onChange={(e) => onChangeInput(e)}
            >
              <MenuItem value="walk">Walk</MenuItem>
              <MenuItem value="bike">Bike</MenuItem>
              <MenuItem value="uber">Uber</MenuItem>
              <MenuItem value="lyft">Lyft</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="train">Catapult</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText>With label + helper text</FormHelperText>
          </FormControl>
          <TextField
            id="notes" 
            label="Notes" 
            name="notes"
            variant="outlined"
            multiline
            margin="normal"
            minRows={4}
            fullWidth
            value={data.notes}
            onChange={(e) => {
              onChangeInput(e)
              onSetUserData()
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
          >
            Submit that shit
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default App;
