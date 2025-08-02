import { Text, View, TextInput, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import Icon from '../../components/Icon';
import MapWrapper from '../../components/MapWrapper';
import BottomNavBar from '../../components/BottomNavBar';
import BarberListItem from '../../components/BarberListItem';

const mockBarbers = [
  { id: '1', name: 'Barbiere Centrale', address: 'Via Roma 123, Milano', rating: 4.5, distance: 0.5, lat: 45.4642, lng: 9.1900 },
  { id: '2', name: 'Style & Cut', address: 'Corso Buenos Aires 45, Milano', rating: 4.8, distance: 1.2, lat: 45.4781, lng: 9.2100 },
  { id: '3', name: 'Gentleman Barber', address: 'Via Brera 78, Milano', rating: 4.2, distance: 2.5, lat: 45.4722, lng: 9.1856 },
  { id: '4', name: 'The Barber Shop', address: 'Piazza Duomo 1, Milano', rating: 4.9, distance: 0.2, lat: 45.4646, lng: 9.1916 },
];

const userLocation = { lat: 45.4642, lng: 9.1900 }; // Mock user location (Duomo di Milano)

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180)
}


export default function HomeScreen() {
  const [nearbyBarbers, setNearbyBarbers] = useState<any[]>([]);

  useEffect(() => {
    const barbersWithDistance = mockBarbers.map(barber => ({
      ...barber,
      distance: getDistance(userLocation.lat, userLocation.lng, barber.lat, barber.lng)
    }));
    const filteredBarbers = barbersWithDistance.filter(barber => barber.distance <= 2);
    setNearbyBarbers(filteredBarbers);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingHorizontal: 16 }}>
          <Icon name="search" size={24} color="#60758a" />
          <TextInput
            placeholder="Barberia, indirizzo o servizio"
            style={{ flex: 1, height: 48, marginLeft: 8, fontSize: 16 }}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Orario di apertura</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Recensioni</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Servizi</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <MapWrapper />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Barbieri Vicini</Text>
        <FlatList
          data={nearbyBarbers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BarberListItem barber={item} />}
        />
      </View>
      <BottomNavBar />
    </View>
  );
}