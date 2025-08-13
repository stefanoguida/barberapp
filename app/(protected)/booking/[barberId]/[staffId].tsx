import { Text, View, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../../components/Button';
import Icon from '../../../../components/Icon';
import { commonStyles, colors } from '../../../../styles/commonStyles';

// Mock data, in a real app this would be fetched from an API
const barber = {
  id: '1',
  name: 'The Sharp Edge',
  coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-rbZOXyL1lMOqktrNJUObpb1KHo7zxClcgXI5irjojrElb7h4csAttUGbq5jb5bfXt_CNqY1O1tSORIDIsaMjXWDMqyYJY2jR35bv73FyP3ZIZ94uuzY9KKqaYbct8eu8bDAsJEHM-YTLHhFkRD998OxtfsZ8fh8OZw8kRF6tcMs9SGfSDAmY9-9TuTTbjDbhK6GrpztFFEXvHQ7CPm94gvId1jRj3IiH96DccFjEfJggeta0mmbde5FOM9plURj_RFJ68iFDhOI',
  services: [
    { name: 'Haircut', price: '€25', duration: '30 min' },
    { name: 'Beard Trim', price: '€15', duration: '20 min' },
    { name: 'Hot Towel Shave', price: '€30', duration: '40 min' },
  ],
};

export default function BookingScreen() {
  const { barberId, staffId } = useLocalSearchParams<{ barberId: string; staffId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      Alert.alert('Error', 'Please select a date, time, and service to continue.');
      return;
    }
    // Handle booking logic here
    console.log('Booking confirmed:', { selectedDate, selectedTime, selectedService });
    router.push('/(protected)/bookings');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <ImageBackground
          source={{ uri: barber.coverImage }}
          style={{ height: 250, justifyContent: 'flex-end' }}
          resizeMode="cover"
        >
          <TouchableOpacity 
            onPress={() => router.back()}
            style={{
              position: 'absolute',
              top: 10, // distanza dal bordo superiore (puoi regolare)
              left: 10, // distanza dal bordo sinistro
              zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.4)',
              borderRadius: 20,
              padding: 6,
              color: 'white'
            }}
          >
            <Icon color='white' name="arrow-back" size={24} />
          </TouchableOpacity>
          <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', padding: 16 }}>
            <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>{barber.name}</Text>
          </View>
        </ImageBackground>

        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 8 }}>Select Service</Text>
          {barber.services.map((service) => (
            <TouchableOpacity
              key={service.name}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 16,
                borderRadius: 12,
                backgroundColor: selectedService === service.name ? colors.primary : '#f0f2f5',
                marginBottom: 8,
              }}
              onPress={() => setSelectedService(service.name)}
            >
              <Text style={{ fontSize: 16, fontWeight: '600', color: selectedService === service.name ? 'white' : 'black' }}>{service.name}</Text>
              <Text style={{ fontSize: 16, color: selectedService === service.name ? 'white' : 'black' }}>{service.price}</Text>
            </TouchableOpacity>
          ))}

          <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 16 }}>Select Date & Time</Text>
          {/* Implement a calendar and time slot selection here */}
        </View>
      </ScrollView>
      <View style={{ padding: 16, borderTopWidth: 1, borderTopColor: '#f0f2f5' }}>
        <Button
          text="Book Now"
          onPress={handleBooking}
          disabled={!selectedDate || !selectedTime || !selectedService}
        />
      </View>
    </View>
  );
}