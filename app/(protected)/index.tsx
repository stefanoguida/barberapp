import { View, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import HeaderSearchBar from '../../components/HeaderSearchBar';
import FilterModal from '../../components/FilterModal';
import MapWrapper from '../../components/MapWrapper';
import BottomNavBar from '../../components/BottomNavBar';
import BarberListItem from '../../components/BarberListItem';

interface Barber {
  id: string;
  name: string;
  address: string;
  rating: number;
  distance: number;
  latitude: number;
  longitude: number;
  phone?: string;
  services: string[];
}

const mockBarbers: Barber[] = [
  { id: '1', name: 'Barbiere Centrale', address: 'Via Roma 123, Milano', rating: 4.5, distance: 0, latitude: 45.4642, longitude: 9.1900, services: ['Taglio', 'Barba'] },
  { id: '2', name: 'Style & Cut', address: 'Corso Buenos Aires 45, Milano', rating: 4.8, distance: 0, latitude: 45.4781, longitude: 9.2100, services: ['Taglio', 'Barba', 'Colore'] },
  { id: '3', name: 'Gentleman Barber', address: 'Via Brera 78, Milano', rating: 4.2, distance: 0, latitude: 45.4722, longitude: 9.1856, services: ['Taglio', 'Barba'] },
  { id: '4', name: 'The Barber Shop', address: 'Piazza Duomo 1, Milano', rating: 4.9, distance: 0, latitude: 45.4646, longitude: 9.1916, services: ['Taglio', 'Barba', 'Massaggio'] },
  { id: '5', name: 'Barbiere Centrale', address: 'Via Roma 123, Milano', rating: 4.5, distance: 0, latitude: 45.4642, longitude: 9.1900, services: ['Taglio', 'Barba'] },
  { id: '6', name: 'Style & Cut', address: 'Corso Buenos Aires 45, Milano', rating: 4.8, distance: 0, latitude: 45.4781, longitude: 9.2100, services: ['Taglio', 'Barba', 'Colore'] },
  { id: '7', name: 'Gentleman Barber', address: 'Via Brera 78, Milano', rating: 4.2, distance: 0, latitude: 45.4722, longitude: 9.1856, services: ['Taglio', 'Barba'] },
  { id: '8', name: 'The Barber Shop', address: 'Piazza Duomo 1, Milano', rating: 4.9, distance: 0, latitude: 45.4646, longitude: 9.1916, services: ['Taglio', 'Barba', 'Massaggio'] }
];

const userLocation = { latitude: 45.4642, longitude: 9.1900 }; // Mock user location (Duomo di Milano)

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

const deg2rad = (deg: number) => deg * (Math.PI / 180)

export default function HomeScreen() {
  const [nearbyBarbers, setNearbyBarbers] = useState<Barber[]>([]);
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>(mockBarbers);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [search, setSearch] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  useEffect(() => {
    const barbersWithDistance = mockBarbers.map(barber => ({
      ...barber,
      distance: getDistance(userLocation.latitude, userLocation.longitude, barber.latitude, barber.longitude)
    }));
    const filtered = barbersWithDistance.filter(barber => barber.distance <= 2);
    setNearbyBarbers(filtered);
    setFilteredBarbers(barbersWithDistance);
  }, []);

  useEffect(() => {
    const barbersWithDistance = mockBarbers.map(barber => ({
      ...barber,
      distance: getDistance(userLocation.latitude, userLocation.longitude, barber.latitude, barber.longitude)
    }));
    const filtered = barbersWithDistance.filter(barber =>
      barber.name.toLowerCase().includes(search.toLowerCase()) ||
      barber.address.toLowerCase().includes(search.toLowerCase()) ||
      barber.services.some(service => service.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredBarbers(filtered);
  }, [search]);

  const handleMarkerPress = (barber: Barber) => {
    setSelectedBarber(barber);
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingTop: 36, paddingLeft: 16, paddingRight: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#e0e0e0' }}>
        <HeaderSearchBar
          search={search}
          setSearch={setSearch}
          onFilterPress={() => setFilterModalVisible(true)}
        />
        <FilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
        />
      </View>
      <View style={{ flex: 1 }}>
        <MapWrapper 
          barbers={filteredBarbers}
          onMarkerPress={handleMarkerPress}
        />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 16, marginTop: 40 }}>
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