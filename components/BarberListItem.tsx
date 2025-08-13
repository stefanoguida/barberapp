import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface BarberListItemProps {
  barber: {
    id: string;
    name: string;
    address: string;
    rating: number;
    distance: number;
  };
}

export default function BarberListItem({ barber }: BarberListItemProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#f0f2f5',
        marginBottom: 12,
      }}
      onPress={() => router.push(`/(protected)/barber/${barber.id}`)}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>{barber.name}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="star" size={16} color={colors.warning} />
          <Text style={{ marginLeft: 4, color: '#60758a' }}>{barber.rating} </Text>
          <Text style={{ fontSize: 14, color: '#60758a', marginVertical: 4 }}>{barber.address}</Text>
          <Text style={{ marginLeft: 8, color: '#60758a' }}>({barber.distance.toFixed(1)} km)</Text>
        </View>
      </View>
      <Icon name="chevron-forward" size={24} color="#60758a" />
    </TouchableOpacity>
  );
}
