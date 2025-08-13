import { View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';
import { Swipeable } from 'react-native-gesture-handler';
import { useEffect, useRef } from 'react';

interface AppointmentDetailProps {
  booking: {
    id: string;
    barberName: string;
    service: string;
    date: string;
    time: string;
    address: string;
  };
  onCancel: () => void;
}

export default function AppointmentDetail({ booking, onCancel }: AppointmentDetailProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = () => (
    <TouchableOpacity
      style={{
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: '100%',
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
        // opacity: isOpen ? 1 : 0,
      }}
      onPress={onCancel}
      // disabled={!isOpen}
    >
      {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Cancella</Text> */}
      <Icon name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      rightThreshold={10}
      friction={1}
    >
      <View style={{ padding: 16, backgroundColor: colors.card || '#f0f2f5', borderRadius: 12, marginBottom: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 16 }}>{booking.date}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <View style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 12, marginRight: 16 }}>
            <Icon name="calendar" size={24} color="#111418" />
          </View>
          <View>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>{booking.barberName} - {booking.service}</Text>
            <Text style={{ fontSize: 14, color: '#60758a' }}>{booking.time}</Text>
            <Text style={{ fontSize: 14, color: '#60758a' }}>{booking.address}</Text>
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
