import { Text, View, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from '../../components/Icon';
import AppointmentDetail from '../../components/AppointmentDetail';
import BottomNavBar from '../../components/BottomNavBar';

interface BookingData {
  id: string;
  barberId: string;
  staffId: string;
  staffName: string;
  barberName: string;
  date: string;
  time: string;
  service: string;
  price: string;
  address: string; // Assuming address is part of booking data
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  const loadBookings = async () => {
    try {
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadBookings();
    }, [])
  );

  const handleCancel = async (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedBookings = bookings.filter(b => b.id !== bookingId);
              await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
              setBookings(updatedBookings);
            } catch (error) {
              console.error('Error cancelling booking:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Dettagli appuntamento</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentDetail
            booking={item}
            onCancel={() => handleCancel(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, color: '#60758a' }}>Nessuna prenotazione trovata.</Text>
          </View>
        )}
      />
      <BottomNavBar />
    </View>
  );
}