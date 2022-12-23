import React, { useEffect, useRef } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DirectionsIcon from "@mui/icons-material/Directions";
// https://www.telerik.com/blogs/integrating-google-places-autocomplete-api-react-app
// https://developers.google.com/maps/documentation/places/web-service/autocomplete#required-parameters
// https://developers.google.com/maps/documentation/places/web-service/supported_types -> For a listing of the Place types
// https://developers.google.com/maps/documentation/places/web-service/place-data-fields -> For a list of the data fields

/**
 * This file gets included into PlacesInfoForm.js
 */

export default function AutoCompleteForm({ onChangeData }) {
  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    //componentRestrictions: { country: "us" },
    fields: [
      "business_status",
      "geometry",
      "photos",
      "opening_hours",
      "website",
      "icon",
      "name",
      "place_id",
      "types",
      "formatted_phone_number",
      "url",
      "price_level",
      "reviews",
      "rating",
    ],
    types: ["establishment"],
  };

  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    );

    // get the actual data
    autoCompleteRef.current.addListener("place_changed", async () => {
      const place = await autoCompleteRef.current.getPlace();
      console.log("from AutoCompleteForm: ", place);
      onChangeData(place);
    });
  }, []);

  return (
    <Paper
      component="form"
      sx={{ display: "flex", alignItems: "center", width: 1000 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Google Maps"
        inputProps={{ "aria-label": "search google maps" }}
        inputRef={inputRef}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <DirectionsIcon />
      </IconButton>
    </Paper>
  );
}
