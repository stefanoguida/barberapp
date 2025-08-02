import { Text, View, TextInput, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import MapWrapper from '../../components/MapWrapper';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';

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

const mockBarbers: Barber[] = [
  {
    id: '1',
    name: 'Barbiere Centrale',
    address: 'Via Roma 123, Milano',
    rating: 4.8,
    distance: '0.5 km',
    latitude: 45.4642,
    longitude: 9.1900,
    phone: '+39 02 1234567',
    services: ['Taglio', 'Barba', 'Shampoo']
  },
  {
    id: '2',
    name: 'Style & Cut',
    address: 'Corso Buenos Aires 45, Milano',
    rating: 4.6,
    distance: '1.2 km',
    latitude: 45.4755,
    longitude: 9.2017,
    phone: '+39 02 7654321',
    services: ['Taglio', 'Barba', 'Styling']
  },
  {
    id: '3',
    name: 'Gentleman Barber',
    address: 'Via Brera 78, Milano',
    rating: 4.9,
    distance: '0.8 km',
    latitude: 45.4719,
    longitude: 9.1881,
    phone: '+39 02 9876543',
    services: ['Taglio Premium', 'Barba', 'Trattamenti']
  }
];

export default function MapScreen() {
  console.log('MapScreen rendered');
  const [searchText, setSearchText] = useState('');
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [filteredBarbers, setFilteredBarbers] = useState<Barber[]>(mockBarbers);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredBarbers(mockBarbers);
    } else {
      const filtered = mockBarbers.filter(barber =>
        barber.name.toLowerCase().includes(searchText.toLowerCase()) ||
        barber.address.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredBarbers(filtered);
    }
  }, [searchText]);

  const handleMarkerPress = (barber: Barber) => {
    console.log('Marker pressed:', barber.name);
    setSelectedBarber(barber);
  };

  const handleBarberSelect = (barber: Barber) => {
    console.log('Barber selected:', barber.name);
    router.push(`/barber/${barber.id}`);
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <Text style={commonStyles.subtitle}>Trova Barbieri</Text>
          <View style={{ width: 24 }} />
        </View>

        <TextInput
          style={commonStyles.searchInput}
          placeholder="Cerca per nome o indirizzo..."
          value={searchText}
          onChangeText={setSearchText}
        />

        <MapWrapper 
          barbers={filteredBarbers}
          onMarkerPress={handleMarkerPress}
        />

        <ScrollView style={{ flex: 1 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
            Barbieri Trovati ({filteredBarbers.length})
          </Text>
          
          {filteredBarbers.map((barber) => (
            <TouchableOpacity
              key={barber.id}
              style={commonStyles.card}
              onPress={() => handleBarberSelect(barber)}
            >
              <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.subtitle}>{barber.name}</Text>
                <View style={commonStyles.row}>
                  <Icon name="star" size={16} style={{ marginRight: 4 }} />
                  <Text style={commonStyles.text}>{barber.rating}</Text>
                </View>
              </View>
              
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Icon name="location" size={16} style={{ marginRight: 8 }} />
                <Text style={commonStyles.textSecondary}>{barber.address}</Text>
              </View>
              
              <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                <Text style={commonStyles.textSecondary}>{barber.distance}</Text>
                <Text style={[commonStyles.textSecondary, { color: colors.primary }]}>
                  Tocca per dettagli
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}