import { Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../../components/Button';
import Icon from '../../../components/Icon';
import { commonStyles, buttonStyles, colors } from '../../../styles/commonStyles';

interface TimeSlot {
  time: string;
  available: boolean;
}

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
  status: 'confirmed' | 'pending' | 'cancelled';
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const startHour = 9;
  const endHour = 19;
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const available = Math.random() > 0.3; // 70% chance of being available
      slots.push({ time, available });
    }
  }
  
  return slots;
};

const generateCalendarDays = () => {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      day: date.getDate(),
      month: date.toLocaleDateString('it-IT', { month: 'short' }),
      weekday: date.toLocaleDateString('it-IT', { weekday: 'short' })
    });
  }
  
  return days;
};

const mockServices = [
  { name: 'Taglio Classico', price: '€25', duration: '30 min' },
  { name: 'Taglio + Barba', price: '€35', duration: '45 min' },
  { name: 'Shampoo', price: '€10', duration: '15 min' },
  { name: 'Trattamento Barba', price: '€20', duration: '30 min' }
];

const staffNames: { [key: string]: string } = {
  '1': 'Marco Rossi',
  '2': 'Giuseppe Bianchi',
  '3': 'Antonio Verdi',
  '4': 'Luca Ferrari',
  '5': 'Matteo Romano',
  '6': 'Alessandro Conti',
  '7': 'Francesco Marino',
  '8': 'Roberto Galli'
};

const barberNames: { [key: string]: string } = {
  '1': 'Barbiere Centrale',
  '2': 'Style & Cut',
  '3': 'Gentleman Barber'
};

export default function BookingScreen() {
  const { 
    barberId, 
    staffId, 
    modifyBookingId, 
    existingDate, 
    existingTime, 
    existingService 
  } = useLocalSearchParams<{ 
    barberId: string; 
    staffId: string; 
    modifyBookingId?: string;
    existingDate?: string;
    existingTime?: string;
    existingService?: string;
  }>();
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [calendarDays] = useState(generateCalendarDays());
  const [isModifying, setIsModifying] = useState(false);

  useEffect(() => {
    console.log('BookingScreen rendered with barberId:', barberId, 'staffId:', staffId);
    
    // Check if this is a modification
    if (modifyBookingId && existingDate && existingTime && existingService) {
      console.log('Modifying existing booking:', modifyBookingId);
      setIsModifying(true);
      setSelectedDate(existingDate);
      setSelectedTime(existingTime);
      setSelectedService(existingService);
    } else {
      setSelectedDate(calendarDays[0].date);
    }
    
    setTimeSlots(generateTimeSlots());
  }, [modifyBookingId, existingDate, existingTime, existingService, barberId, staffId, calendarDays]);

  useEffect(() => {
    if (selectedDate && !isModifying) {
      // Regenerate time slots when date changes (only for new bookings)
      setTimeSlots(generateTimeSlots());
      setSelectedTime('');
    }
  }, [selectedDate, isModifying]);

  const handleDateSelect = (date: string) => {
    console.log('Date selected:', date);
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    console.log('Time selected:', time);
    setSelectedTime(time);
  };

  const handleServiceSelect = (service: string) => {
    console.log('Service selected:', service);
    setSelectedService(service);
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !selectedService) {
      Alert.alert('Errore', 'Seleziona data, ora e servizio per continuare');
      return;
    }

    const booking: BookingData = {
      id: isModifying ? modifyBookingId! : Date.now().toString(),
      barberId: barberId!,
      staffId: staffId!,
      staffName: staffNames[staffId!] || 'Staff Member',
      barberName: barberNames[barberId!] || 'Barbiere',
      date: selectedDate,
      time: selectedTime,
      service: selectedService,
      price: mockServices.find(s => s.name === selectedService)?.price || '€25',
      status: 'confirmed'
    };

    try {
      const existingBookings = await AsyncStorage.getItem('bookings');
      const bookings = existingBookings ? JSON.parse(existingBookings) : [];
      
      if (isModifying) {
        // Update existing booking
        const updatedBookings = bookings.map((b: BookingData) => 
          b.id === modifyBookingId ? booking : b
        );
        await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
        console.log('Booking modified:', booking);
        
        Alert.alert(
          'Prenotazione Modificata!',
          `Appuntamento modificato per ${selectedDate} alle ${selectedTime} con ${booking.staffName}`,
          [
            {
              text: 'OK',
              onPress: () => router.push('/bookings')
            }
          ]
        );
      } else {
        // Create new booking
        bookings.push(booking);
        await AsyncStorage.setItem('bookings', JSON.stringify(bookings));
        console.log('Booking saved:', booking);
        
        Alert.alert(
          'Prenotazione Confermata!',
          `Appuntamento prenotato per ${selectedDate} alle ${selectedTime} con ${booking.staffName}`,
          [
            {
              text: 'OK',
              onPress: () => router.push('/bookings')
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error saving booking:', error);
      Alert.alert('Errore', 'Impossibile salvare la prenotazione');
    }
  };

  const selectedServiceData = mockServices.find(s => s.name === selectedService);

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Image 
              source={require('../../../assets/images/final_quest_240x240.png')} 
              style={{ width: 24, height: 24, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={commonStyles.subtitle}>
              {isModifying ? 'Modifica Appuntamento' : 'Prenota Appuntamento'}
            </Text>
          </View>
          <View style={{ width: 24 }} />
        </View>

        {isModifying && (
          <View style={[commonStyles.card, { backgroundColor: colors.primary + '10', borderColor: colors.primary, borderWidth: 1, marginBottom: 16 }]}>
            <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 8 }]}>
              <Icon name="information-circle" size={20} color={colors.primary} style={{ marginRight: 8 }} />
              <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                Stai modificando una prenotazione esistente
              </Text>
            </View>
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              Puoi cambiare data, ora e servizio. Le modifiche saranno salvate automaticamente.
            </Text>
          </View>
        )}

        {/* Staff Info */}
        <View style={commonStyles.card}>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Image 
              source={require('../../../assets/images/final_quest_240x240__.png')} 
              style={{ width: 40, height: 40, marginRight: 12, borderRadius: 20 }}
              resizeMode="contain"
            />
            <View>
              <Text style={commonStyles.subtitle}>{staffNames[staffId!] || 'Staff Member'}</Text>
              <Text style={commonStyles.textSecondary}>
                {barberNames[barberId!] || 'Barbiere'}
              </Text>
            </View>
          </View>
        </View>

        {/* Service Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Seleziona Servizio</Text>
          {mockServices.map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[
                commonStyles.card,
                selectedService === service.name && { borderColor: colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleServiceSelect(service.name)}
            >
              <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                <View>
                  <Text style={commonStyles.text}>{service.name}</Text>
                  <Text style={commonStyles.textSecondary}>{service.duration}</Text>
                </View>
                <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                  {service.price}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Seleziona Data</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={commonStyles.row}>
              {calendarDays.map((day) => (
                <TouchableOpacity
                  key={day.date}
                  style={[
                    commonStyles.calendarDay,
                    selectedDate === day.date && commonStyles.selected
                  ]}
                  onPress={() => handleDateSelect(day.date)}
                >
                  <Text style={[
                    commonStyles.textSecondary,
                    { fontSize: 12 },
                    selectedDate === day.date && { color: colors.backgroundAlt }
                  ]}>
                    {day.weekday}
                  </Text>
                  <Text style={[
                    commonStyles.text,
                    { fontWeight: '600' },
                    selectedDate === day.date && { color: colors.backgroundAlt }
                  ]}>
                    {day.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Seleziona Orario</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {timeSlots.map((slot, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  commonStyles.timeSlot,
                  slot.available ? commonStyles.available : commonStyles.occupied,
                  selectedTime === slot.time && commonStyles.selected
                ]}
                onPress={() => slot.available && handleTimeSelect(slot.time)}
                disabled={!slot.available}
              >
                <Text style={[
                  commonStyles.textSecondary,
                  !slot.available && { color: colors.error },
                  selectedTime === slot.time && { color: colors.backgroundAlt }
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedDate && selectedTime && selectedService && (
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>
              {isModifying ? 'Riepilogo Modifiche' : 'Riepilogo Prenotazione'}
            </Text>
            <View style={commonStyles.card}>
              <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Servizio:</Text>
                <Text style={commonStyles.text}>{selectedService}</Text>
              </View>
              <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Data:</Text>
                <Text style={commonStyles.text}>{selectedDate}</Text>
              </View>
              <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                <Text style={commonStyles.text}>Orario:</Text>
                <Text style={commonStyles.text}>{selectedTime}</Text>
              </View>
              <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
                <Text style={commonStyles.text}>Prezzo:</Text>
                <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                  {selectedServiceData?.price}
                </Text>
              </View>
              <Button
                text={isModifying ? 'Salva Modifiche' : 'Conferma Prenotazione'}
                onPress={handleBooking}
                style={buttonStyles.primary}
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}