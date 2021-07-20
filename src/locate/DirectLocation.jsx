import React, { useState } from "react";
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";

function Demo(props) {
  const [directAddress, setdirectAddress] = useState("");
  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  //NOTE: USE YOUR OWN GOOGLE API KEY
  Geocode.setApiKey("YOUR_API_KEY");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  // Geocode.setRegion("es");

  // set location_type filter . Its optional.
  // google geocoder returns more that one address for given lat/lng.
  // In some case we need one address as response for which google itself provides a location_type filter.
  // So we can easily parse the result for fetching address components
  // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
  // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
  Geocode.setLocationType("ROOFTOP");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  // Get formatted address, city, state, country from latitude & longitude when
  // Geocode.setLocationType("ROOFTOP") enabled
  // the below parser will work for most of the countries
  const Locate = (latitude, longitude) => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
              default:
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(address);
        setdirectAddress(address);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return !props.isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !props.isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : props.coords ? (
    <table>
      {Locate(props.coords.latitude, props.coords.longitude)}
      <tbody>
        <tr>
          <td>latitude:</td>
          <td>{props.coords.latitude}</td>
        </tr>
        <tr>
          <td>longitude:</td>
          <td>{props.coords.longitude}</td>
        </tr>
        {/* <tr>
          <td>altitude</td>
          <td>{props.coords.altitude}</td>
        </tr>
        <tr>
          <td>heading</td>
          <td>{props.coords.heading}</td>
        </tr>
        <tr>
          <td>speed</td>
          <td>{props.coords.speed}</td>
        </tr> */}
        <tr>
          <td>address:</td>
          <td>{directAddress} </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div>Getting the location data&hellip; </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Demo);
