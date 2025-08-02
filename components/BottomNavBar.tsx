import { View, TouchableOpacity, Text } from 'react-native';
import { router } from 'expo-router';
import Icon from './Icon';
import { colors } from '../styles/commonStyles';

export default function BottomNavBar() {
  return (
    <View style={{ flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f0f2f5', backgroundColor: 'white', paddingVertical: 8 }}>
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', gap: 4 }} onPress={() => router.push('/(protected)')}>
        <Icon name="search" size={24} color={colors.primary} />
        <Text style={{ fontSize: 12, color: colors.primary }}>Cerca</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', gap: 4 }} onPress={() => router.push('/(protected)/bookings')}>
        <Icon name="calendar" size={24} color="#60758a" />
        <Text style={{ fontSize: 12, color: '#60758a' }}>Prenotazioni</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1, alignItems: 'center', gap: 4 }} onPress={() => router.push('/(protected)/profile')}>
        <Icon name="person" size={24} color="#60758a" />
        <Text style={{ fontSize: 12, color: '#60758a' }}>Profilo</Text>
      </TouchableOpacity>
    </View>
  );
}
