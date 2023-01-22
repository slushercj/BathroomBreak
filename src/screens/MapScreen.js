import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Device from "expo-device";
import * as Location from "expo-location";
import google from "../api/google";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [results, setResults] = useState([]);
  const [pageToken, setPageToken] = useState(null);

  const mapRef = React.createRef();

  const nearbySearch = async (location) => {
    const response = await google.get("/maps/api/place/nearbysearch/json", {
      params: {
        location: `${location.coords.latitude},${location.coords.longitude}`,
        radius: 8000,
        name: "mcdonald's|starbucks|cvs|walgreens|ampm|extramile",
        pagetoken: null,
      },
    });
    // console.log("Search results: ");
    console.log(response.data.results);
    setResults(response.data.results);
    setPageToken(response.data.next_page_token);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        enableHighAccuracy: true,
        timeInterval: 5,
      });

      setLocation(location);
      nearbySearch(location);
    })();
  }, []);

  // useEffect(async () => {
  //   await nearbySearch();
  // }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
    console.error(text);
  } else if (location) {
    text = JSON.stringify(location);
  }

  const goToMyLocation = async () => {
    console.log(`Going to location `);
    console.log(location);

    if (location == null || mapRef == null) return;

    mapRef.current.animateCamera({
      center: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  return (
    location && (
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          minZoomLevel={11}
          onMapReady={goToMyLocation}
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          zoomControlEnabled={true}
          zoomEnabled={true}
        >
          {results &&
            results.map((r) => {
              return (
                <Marker
                  title={`${r.name} at ${r.vicinity}`}
                  coordinate={{
                    latitude: r.geometry.location.lat,
                    longitude: r.geometry.location.lng,
                  }}
                />
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
});
