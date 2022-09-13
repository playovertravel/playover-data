import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

// Firebase stuff
import { db } from './firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';

export default function UserForm({ placesData }) {
  const [data, setData] = useState({
    "business_state": placesData.business_status,
    "phone_number": placesData.formatted_phone_number,
    "latitude": placesData.geometry.location.lat(),
    "longitude": placesData.geometry.location.lng(),
    "name": placesData.name,
    "hours": placesData.opening_hours.weekday_text, // this is an array
    "id": placesData.place_id,
    "price_level": placesData.price_level,
    "rating": placesData.rating,
    "reviews": placesData.reviews, // this is an array of review objects
    "categories": placesData.types, // this is an array
    "website": placesData.website,
    "photos": placesData.photos.map((po) => po.getUrl()),
    "google_maps_url": placesData.url
  });
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
    <form onSubmit={onSubmitForm}>
      <Box mt={5}>
        <Typography variant="h5" component="h2" color="white">
          Now just add some custom playover-specific stuff. Whatever name and email you enter will be automatically created in Firebase
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          width: 700,
          padding: 5,
          margin: 5,
          color: 'black',
          borderRadius: 5,
          backgroundColor: 'white'
        }}
      >
        <TextField
          id="firstName" 
          name="firstName"
          label="First Name" 
          margin="normal"
          variant="standard"
          color="primary"
          size="medium"
          fullWidth
          value={data.firstName}
          onChange={(e) => onChangeInput(e)}
          required
        />
        <TextField
          id="lastName" 
          name="lastName"
          label="Last Name" 
          variant="standard"
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
          variant="standard"
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
          variant="standard"
        />
        <FormControl sx={{ minWidth: 625, mt: 2 }}>
          <InputLabel id="transportationTypeSelect">Transportation Type</InputLabel>
          <Select
            labelId="transportationType"
            id="transportationType"
            name="transportationType"
            defaultValue="walk"
            value={data.transportationType}
            label="Transportation Type"
            onChange={(e) => onChangeInput(e)}
          >
            <MenuItem value="walk">Walk</MenuItem>
            <MenuItem value="bike">Bike</MenuItem>
            <MenuItem value="uber">Uber</MenuItem>
            <MenuItem value="lyft">Lyft</MenuItem>
            <MenuItem value="train">Train</MenuItem>
            <MenuItem value="catapult">Catapult</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <FormHelperText>Whatever you think is the best way to get there</FormHelperText>
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
        <Button
          sx={{ marginLeft: 2 }}
          type="submit"
          variant="contained"
          onClick={() => window.location.reload}
        >
          Start over
        </Button>
      </Box>
    </form>
  );
}