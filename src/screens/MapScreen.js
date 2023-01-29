import React, { useState, useEffect } from "react";
import { Platform, Text, Image, View, StyleSheet } from "react-native";
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
import { Zocial, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import Device from "expo-device";
import * as Location from "expo-location";
import google from "../api/google";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapViewDirections from "react-native-maps-directions";
import axios from "axios";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [results, setResults] = useState([]);
  const [searchTokens, setSearchTokens] = useState([]);

  const mapRef = React.createRef();

  const fetchData = (cl) => {
    if (!cl) return;

    const searchLocations = [
      "mcdonald's",
      "starbucks",
      "cvs",
      "rite aid",
      "walmart",
      "target",
      "arco",
      "extra miles",
      "winco",
      "publix",
      "piggly wiggly",
      "meijer",
      "wegmans",
      "safeway pharmacy",
      "walgreens",
      "ampm",
      "extramile",
      "pilot flying j",
      "love's travel",
      "ta travel center",
      "sapp bros",
    ];

    let apiCalls = [];
    searchLocations.forEach((loc) => {
      let call = google.get("/maps/api/place/nearbysearch/json", {
        params: {
          location: `${cl.coords.latitude},${cl.coords.longitude}`,
          radius: 8000,
          keyword: loc,
          // pageToken,
        },
      });
      apiCalls.push(call);
    });

    axios
      .all(apiCalls)
      .then(
        axios.spread((...allData) => {
          let places = [];

          allData.map((r) => {
            places = places.concat(r.data.results);
          });

          return places;
        })
      )
      .then((r) => {
        setResults(r);
      });
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      })
        .then((currentLocation) => {
          console.log(
            `Setting current Location to {${currentLocation.coords.latitude},${currentLocation.coords.longitude}}`
          );
          setLocation(currentLocation);
          return currentLocation;
        })
        .then((cl) => {
          console.log(`Fetching data`);
          fetchData(cl);
          return cl;
        });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.error(text);
  } else if (location) {
    text = JSON.stringify(location);
  }

  const goToMyLocation = async () => {
    if (location == null) {
      console.log("Current location is null");
    }

    if (mapRef == null) {
      console.log("Mapref is null");
      return;
    }

    console.log(
      `Going to current location: {${location.coords.latitude},${location.coords.longitude}}`
    );

    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  return (
    location?.coords && (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          minZoomLevel={12}
          onMapReady={goToMyLocation}
          region={{
            latitude: location?.coords?.latitude,
            longitude: location?.coords?.longitude,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
        >
          {results &&
            results.map((r, i) => {
              return (
                <Marker
                  title={`${r.name} at ${r.vicinity}`}
                  coordinate={{
                    latitude: r.geometry.location.lat,
                    longitude: r.geometry.location.lng,
                  }}
                  image={require("../../assets/logo.png")}
                  key={i}
                >
                  <Callout style={styles.callout}>
                    {/*                     
                    <Image
                      source={}
                      style={{ height: 35, width: 35 }}
                    /> */}
                    <Text style={styles.callOutHeading}>{r.name}</Text>
                    <Text style={styles.callOutAddress}>{r.vicinity}</Text>
                    <TouchableOpacity>
                      <FontAwesome5
                        name="directions"
                        size={24}
                        style={styles.callOutNavigation}
                      />
                      {/* <MapViewDirections
                        origin={r.geometry.location}
                        destination={`r.geometry.location: ${r.geometry.location}`}
                        apikey="AIzaSyALxVcQZDG7p4qh_89RmPJ8pguo-mtYyRI"
                        strokeWidth={3}
                        strokeColor="hotpink"
                        onReady={console.log(location)}
                        // onError={this.onError}
                      /> */}
                    </TouchableOpacity>
                  </Callout>
                </Marker>
              );
            })}
        </MapView>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  callout: {
    textAlign: "center",
  },
  callOutHeading: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  callOutAddress: {
    fontSize: 18,
    color: "gray",
    marginBottom: 5,
  },
  callOutNavigation: {
    textAlign: "right",
    marginBottom: 5,
  },
});
