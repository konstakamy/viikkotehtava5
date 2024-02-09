import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {
  
    const [location, setLocation] = useState({
      latitude: 40.7128, // New York's latitude
      longitude: -74.0060, // New York's longitude
      latitudeDelta: 0.04,
      longitudeDelta: 0.05
    });

    useEffect(() => {
      getUserPosition();
    }, []); 

    const getUserPosition = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={location} 
        />
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
