import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  List,
  ListItem,
  Divider,
  ListItemText,
} from "@material-ui/core";
// import {  geocodeByPlaceId } from 'react-places-autocomplete';
import { HiOutlineLocationMarker } from "react-icons/hi";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    cursor: "pointer",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));
function AutoComplete({ form, formikField, setForm, check, check1, check3 }) {
  const classes = useStyles();
  const [state, setState] = useState({
    addrss: "941 Bourbon St New Orleans",
    bool: true,
  });
  let getGoogleSuggestion = [];
  const [suggestn, setSuggestion] = useState([]);

  const handleChange = (addrss) => {
    setForm({
      ...form,
      locationName: addrss,
    });
  };

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((resp) => {
        //
        // placeid=

        var coordinates = "";
        var addrs = "";
        var country = "";
        getLatLng(resp[0]).then((info) => {
          coordinates = [info?.lng, info?.lat];
          const address = resp[0].formatted_address.split(",");
          country = address[address.length - 1];

          addrs = address[1] ? address[0]?.concat(address[1]) : address[0];
          formikField && formikField("location", resp[0].formatted_address);
          setForm({
            ...form,
            locationName: resp[0].formatted_address,
            location: coordinates,
          });
          setSuggestion([]);
        });
      })
      .catch((error) => {});
  };

  const searchOptions = {
    componentRestrictions: { country: ["us"] },
  };
  return (
    <>
      <PlacesAutocomplete
        value={form?.locationName ? form?.locationName : ""}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          if (suggestions.length > 0) {
            getGoogleSuggestion = suggestions?.filter((ii) =>
              ii?.description
                .toLocaleLowerCase()
                .includes("NC,".toLocaleLowerCase())
            );
          }
          return (
            <div>
              {check ? (
                <div
                  className="iptAuth field w-100"
                  style={{ width: "400px !important" }}
                >
                  <HiOutlineLocationMarker />
                  <input
                    {...getInputProps({
                      placeholder: "Enter Location",
                    })}
                    className="autocomplete_input"
                    value={form.locationName}

                    // onError={this._handleError}
                    //  clearItemsOnError={true}
                  />
                </div>
              ) : (
                <div
                  className={
                    check1
                      ? "profil_locat w-100"
                      : check3
                      ? "profil_locat w-100"
                      : "profil_locat w-68"
                  }
                  style={{ width: "387px", paddingLeft: "2%" }}
                >
                  <HiOutlineLocationMarker />
                  <input
                    {...getInputProps({
                      placeholder: "Enter Location",
                    })}
                    className="autocomplete_input"
                    value={form.locationName}
                  />
                </div>
              )}

              <div className="autocomplete-dropdown-container">
                {loading && (
                  <List className={classes.root} style={{ width: "500px" }}>
                    <ListItem alignItems="flex-start">
                      <ListItemText primary={"Loading..."} />
                    </ListItem>
                  </List>
                )}

                {getGoogleSuggestion.map((suggestion) => {
                  return (
                    <div {...getSuggestionItemProps(suggestion, {})}>
                      <List className={classes.root} style={{ width: "500px" }}>
                        <ListItem alignItems="flex-start">
                          <ListItemText primary={suggestion.description} />
                        </ListItem>
                      </List>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
    </>
  );
}

export default AutoComplete;
