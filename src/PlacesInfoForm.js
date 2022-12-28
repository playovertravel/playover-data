import React, { useState } from "react";
import logo from "./playover.png";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AutoCompleteForm from "./AutoCompleteForm";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const PlacesInfoBox = ({ placesData }) => {
  const navigate = useNavigate();

  const randomRating = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const validateItem = (item) => {
    if (item != null) {
      return item;
    } else {
      return "";
    }
  };
  console.log("from PlacesInfoBox: ", placesData);
  /*
  Perhaps this would work as a firebase function

	fetch(placesData.photos[0].getUrl()).then((r) => {
		if (r.redirected) {
			console.log("redirected to: ", r.url, r.redirected)
		}
	})
	*/

  return (
    <>
      <Typography variant="h5" component="h2" color="white">
        Alright, does all this look good?
      </Typography>
      <Box
        sx={{
          flex: 1,
          width: 700,
          //height: 1500,
          padding: 5,
          margin: 5,
          color: "black",
          borderRadius: 5,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" component="h3">
          Basic Info
        </Typography>
        <p>Name: {placesData.name}</p>
        <p>Phone Number: {placesData.formatted_phone_number}</p>
        <p>Website: {placesData.website}</p>
        <p>Places Photo URL: {placesData.photos[0].getUrl()}</p>
        <p>Price level: {placesData.price_level}</p>
        <Typography variant="h5" component="h3">
          Geodata
        </Typography>
        {placesData.geometry != null ? (
          <>
            <p>Latitude: {placesData.geometry.location.lat()}</p>
            <p>Longitude: {placesData.geometry.location.lng()}</p>
          </>
        ) : (
          false
        )}
        <Typography variant="h5" component="h3">
          Categories
        </Typography>
        {placesData.types != null
          ? Object.values(placesData.types).map((category) => (
              <p key={category}>{category}</p>
            ))
          : false}
        <Typography variant="h5" component="h3">
          Hours
        </Typography>
        {placesData.opening_hours != null
          ? Object.values(placesData.opening_hours.weekday_text).map(
              (hours) => <p key={hours}>{hours}</p>
            )
          : false}
        <Typography variant="h5" component="h3">
          The First Review
        </Typography>
        {placesData.reviews != null ? (
          <>
            <p>{placesData.reviews[0].text}</p>
            <p>Written by: {placesData.reviews[0].author_name}</p>
          </>
        ) : (
          false
        )}
        <img src={placesData.photos[0].getUrl()} />
      </Box>
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          marginBottom: 3,
          width: 700,
          height: 700,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Button
              type="submit"
              variant="contained"
              onClick={() =>
                navigate("/playover-data/userform", {
                  state: {
                    name: validateItem(placesData.name),
                    placeId: validateItem(placesData.place_id),
                    id: validateItem(placesData.place_id),
                    layoverLength: 1,
                    difficulty: 1,
                    isOutsideAirport: true,
                    location: {
                      lat:
                        placesData.geometry != null
                          ? placesData.geometry.location.lat()
                          : 0,
                      lng:
                        placesData.geometry != null
                          ? placesData.geometry.location.lng()
                          : 0,
                      latDelta: 0.07,
                      lngDelta: 0.04,
                    },
                    categories:
                      placesData.types != null ? placesData.types : [], // this is an array
                    minimumTime: 1,
                    photos: [],
                    recommendedTransportation: "rideshare",
                    rating: randomRating(3, 5),
                    reviews:
                      placesData.reviews != null ? placesData.reviews : [], // this is an array of review objects
                  },
                })
              }
            >
              Indeed
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button type="submit" variant="contained" onClick={() => {}}>
              Nope, let's try again
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default function PlacesInfoForm() {
  const [placesData, setPlacesData] = useState({});
  const [displayBox, setDisplayBox] = useState(false);

  const onSetPlacesData = (data) => {
    setPlacesData(data);
    setDisplayBox(true);
  };

  return (
    <div>
      <Container className="AppContainer">
        <img src={logo} className="App-logo" alt="logo" />
        <Typography variant="h4" component="h1" color="white">
          Hey team! Search for a place just like you would with Google Maps
        </Typography>
        <Box mt={6} ml={8} mb={6}>
          <AutoCompleteForm onChangeData={onSetPlacesData} />
        </Box>
      </Container>
      {displayBox ? <PlacesInfoBox placesData={placesData} /> : false}
    </div>
  );
}

/*
                "business_state": validateItem(placesData.business_status),
                "phone_number": validateItem(placesData.formatted_phone_number),
                "latitude": placesData.geometry != null ? placesData.geometry.location.lat() : 0,
                "longitude": placesData.geometry != null ? placesData.geometry.location.lng() : 0,
                "name": validateItem(placesData.name),
                "hours": placesData.opening_hours != null ? placesData.opening_hours.weekday_text : [], // this is an array
                "id": validateItem(placesData.place_id),
                "price_level": validateItem(placesData.price_level),
                "rating": validateItem(placesData.rating),
                "reviews": placesData.reviews != null ? placesData.reviews : [], // this is an array of review objects
                "categories": placesData.types != null ? placesData.types : [], // this is an array
                "website": validateItem(placesData.website),
                "photos": placesData.photos.map((po) => po.getUrl()), // this needs fixing ASAP. These photo URLs are not constant!
                "google_maps_url": validateItem(placesData.url),
                */
