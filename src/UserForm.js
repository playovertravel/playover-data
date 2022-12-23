import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { useLocation, useNavigate } from "react-router-dom";

// Firebase stuff
import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

export default function UserForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const placesData = location.state;
  const [data, setData] = useState(placesData);
  const [userData, setUserData] = useState({});

  const onChangeInput = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const onSetUserData = () => {
    setUserData({
      ...userData,
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
      wishlist: {},
    });
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "playovers"), data);
      const userRef = await addDoc(collection(db, "user-data"), userData);
      console.log("Document written with id: ", docRef.id);
      console.log("Document written with id: ", userRef.id);
      alert("Successfully wrote document with id: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Error adding document");
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <Box mt={5}>
          <Typography variant="h5" component="h2" color="white">
            Now just add some custom playover-specific stuff. Whatever name and
            email you enter will be automatically created in Firebase
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            width: 700,
            padding: 5,
            margin: 5,
            color: "black",
            borderRadius: 5,
            backgroundColor: "white",
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
            id="ambassadorLayoverLength"
            name="ambassadorLayoverLength"
            label="Your layover length"
            type="number"
            margin="normal"
            helperText="How long was your layover when you experienced this activity?"
            fullWidth
            value={data.ambassadorLayoverLength}
            onChange={(e) => onChangeInput(e)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="minimumTime"
            name="minimumTime"
            label="Minimum Time To Spend"
            type="number"
            margin="normal"
            helperText="Select the minimum number of hours one should expect to spend on this activity"
            fullWidth
            value={data.minimumTime}
            onChange={(e) => onChangeInput(e)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <TextField
            id="difficulty"
            name="difficulty"
            label="Traveler Difficulty"
            type="number"
            margin="normal"
            helperText="How hard would it be for another traveler to experience this activity?"
            fullWidth
            value={data.difficulty}
            onChange={(e) => onChangeInput(e)}
            InputLabelProps={{
              shrink: true,
            }}
            variant="standard"
          />
          <FormControl sx={{ minWidth: 625, mt: 2 }}>
            <InputLabel id="isOutsideAirport">Is outside airport?</InputLabel>
            <Select
              labelId="isOutsideAirport"
              id="isOutsideAirport"
              name="isOutsideAirport"
              defaultValue={true}
              value={data.isOutsideAirport}
              label="Is outside airport?"
              onChange={(e) => onChangeInput(e)}
            >
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
            <FormHelperText>
              Did this activity require you to leave the airport
            </FormHelperText>
          </FormControl>
          <FormControl sx={{ minWidth: 625, mt: 2 }}>
            <InputLabel id="transportationTypeSelect">
              Transportation Type
            </InputLabel>
            <Select
              labelId="recommendedTransportation"
              id="recommendedTransportation"
              name="recommendedTransportation"
              defaultValue="walk"
              value={data.recommendedTransportation}
              label="Transportation Type"
              onChange={(e) => onChangeInput(e)}
            >
              <MenuItem value="walk">Walk</MenuItem>
              <MenuItem value="bike">Bike</MenuItem>
              <MenuItem value="rideshare">Rideshare</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="catapult">Catapult</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
            <FormHelperText>
              Whatever you think is the best way to get there
            </FormHelperText>
          </FormControl>
          <TextField
            id="details"
            label="Details"
            name="details"
            variant="outlined"
            multiline
            margin="normal"
            minRows={4}
            fullWidth
            value={data.details}
            onChange={(e) => {
              onChangeInput(e);
              onSetUserData();
            }}
            required
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
      <Button
        sx={{ marginLeft: 2, marginBottom: 2 }}
        type="submit"
        variant="contained"
        onClick={() => navigate("/playover-data/placesform")}
      >
        Back to beginning
      </Button>
    </div>
  );
}
