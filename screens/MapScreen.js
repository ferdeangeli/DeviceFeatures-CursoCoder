import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";

const initialRegion = {
  latitude: -34.91965,
  longitude: -57.95095,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

const MapScreen = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const handleSelectedLocation = (event) => {

    const lat = event.nativeEvent.coordinate.latitude
    const lng = event.nativeEvent.coordinate.longitude

    setSelectedLocation(prevState => {
      return {
        lat: lat,
        lng: lng
      }
    });
  };

  const handleSaveLocation = (event) => {
    navigation.navigate("Nuevo", {
      mapLocation: {
        lat: 0.06587304174900055,
        lng: 52.24742074398264,
      },
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <Ionicons name="md-save-outline" color="black" size={22} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <MapView
      provider="google"
      initialRegion={initialRegion}
      style={styles.container}
      onPress={handleSelectedLocation}
    >
      {selectedLocation && (
        <Marker
          title="Ubicacion seleccionada"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapScreen;