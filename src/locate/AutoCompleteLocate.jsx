import React, { useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";


//NOTE: USE YOUR OWN GOOGLE API KEY API IN "public/index.html"
/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script> */

export default function LocationSearchInput() {
  const [state, setState] = useState({ address: "" });

  const handleChange = (address) => {
    setState({ address });
  };

  const handleSelect = (address) => {
    setState({ address });
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error));
  };

  return (
    <PlacesAutocomplete
      value={state.address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: "Search Places ...",
              className: "location-search-input",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div style={{color:"white"}}>Loading...</div>}
            {suggestions.map((suggestion, key) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                  key={key}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
