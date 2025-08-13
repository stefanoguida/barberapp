import React from 'react';
import { View, Text, Platform } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

interface Barber {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: string;
  latitude: number;
  longitude: number;
  phone: string;
  services: string[];
}

interface MapWrapperProps {
  barbers: Barber[];
  onMarkerPress: (barber: Barber) => void;
}

// Conditional import for react-native-maps
let MapView: any = null;
let Marker: any = null;

if (Platform.OS !== 'web') {
  try {
    // Using dynamic import instead of require
    import('react-native-maps').then((maps) => {
      MapView = maps.default;
      Marker = maps.Marker;
    }).catch((error) => {
      console.log('react-native-maps not available:', error);
    });
  } catch (error) {
    console.log('react-native-maps not available:', error);
  }
}

export default function MapWrapper({ barbers, onMarkerPress }: MapWrapperProps) {
  console.log('MapWrapper rendered for platform:', Platform.OS);

  if (Platform.OS === 'web') {
    return (
      <View style={[commonStyles.mapContainer, commonStyles.center]}>
        <Text style={commonStyles.text}>
          Le mappe non sono supportate su web in Natively.
          {'\n'}Usa l'app mobile per vedere la mappa interattiva.
        </Text>
      </View>
    );
  }

  if (!MapView || !Marker) {
    return (
      <View style={[commonStyles.mapContainer, commonStyles.center]}>
        <Text style={commonStyles.text}>Mappa non disponibile</Text>
      </View>
    );
  }

  return (
    <View style={commonStyles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 45.4642,
          longitude: 9.1900,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {barbers.map((barber) => (
          <Marker
            key={barber.id}
            coordinate={{
              latitude: barber.latitude,
              longitude: barber.longitude,
            }}
            title={barber.name}
            description={barber.address}
            onPress={() => onMarkerPress(barber)}
          />
        ))}
      </MapView>
    </View>
  );
}