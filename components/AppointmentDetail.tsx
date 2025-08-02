import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

interface AppointmentDetailProps {
  booking: {
    id: string;
    barberName: string;
    service: string;
    date: string;
    time: string;
    address: string;
  };
  onModify: () => void;
  onCancel: () => void;
}

export default function AppointmentDetail({ booking, onModify, onCancel }: AppointmentDetailProps) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>{booking.date}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 12, marginRight: 16 }}>
          <Icon name="cut" size={24} color="#111418" />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{booking.service}</Text>
          <Text style={{ fontSize: 14, color: '#60758a' }}>{booking.time}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
        <View style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 12, marginRight: 16 }}>
          <Icon name="person" size={24} color="#111418" />
        </View>
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{booking.barberName}</Text>
          <Text style={{ fontSize: 14, color: '#60758a' }}>{booking.address}</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 }}
          onPress={onModify}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#111418' }}>Modifica</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: '#0c7ff2', borderRadius: 12, paddingVertical: 12, paddingHorizontal: 24 }}
          onPress={onCancel}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Cancella</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
