import { Text, View, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { commonStyles, buttonStyles, colors } from '../styles/commonStyles';

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

export default function BookingsScreen() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      console.log('Loading bookings...');
      const storedBookings = await AsyncStorage.getItem('bookings');
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings);
        // Sort by date and time
        parsedBookings.sort((a: BookingData, b: BookingData) => {
          const dateA = new Date(`${a.date} ${a.time}`);
          const dateB = new Date(`${b.date} ${b.time}`);
          return dateA.getTime() - dateB.getTime();
        });
        setBookings(parsedBookings);
        console.log('Loaded bookings:', parsedBookings.length);
      } else {
        setBookings([]);
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

  // Check if booking can be modified/cancelled (more than 4 hours before appointment)
  const canModifyBooking = (date: string, time: string): boolean => {
    const bookingDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const fourHoursInMs = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
    const timeDifference = bookingDateTime.getTime() - now.getTime();
    
    console.log('Checking if booking can be modified:', {
      bookingDateTime: bookingDateTime.toISOString(),
      now: now.toISOString(),
      timeDifference: timeDifference,
      fourHours: fourHoursInMs,
      canModify: timeDifference > fourHoursInMs
    });
    
    return timeDifference > fourHoursInMs;
  };

  const handleCancelBooking = async (bookingId: string, date: string, time: string) => {
    if (!canModifyBooking(date, time)) {
      Alert.alert(
        'Cancellazione Non Consentita',
        'Non è possibile cancellare la prenotazione entro 4 ore dall\'appuntamento.',
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Cancella Prenotazione',
      'Sei sicuro di voler cancellare questa prenotazione?',
      [
        { text: 'Annulla', style: 'cancel' },
        {
          text: 'Cancella',
          style: 'destructive',
          onPress: async () => {
            try {
              const updatedBookings = bookings.map(booking =>
                booking.id === bookingId
                  ? { ...booking, status: 'cancelled' as const }
                  : booking
              );
              await AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings));
              setBookings(updatedBookings);
              console.log('Booking cancelled:', bookingId);
              Alert.alert('Successo', 'Prenotazione cancellata con successo');
            } catch (error) {
              console.error('Error cancelling booking:', error);
              Alert.alert('Errore', 'Impossibile cancellare la prenotazione');
            }
          }
        }
      ]
    );
  };

  const handleModifyBooking = (booking: BookingData) => {
    if (!canModifyBooking(booking.date, booking.time)) {
      Alert.alert(
        'Modifica Non Consentita',
        'Non è possibile modificare la prenotazione entro 4 ore dall\'appuntamento.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Navigate to booking screen with existing booking data
    router.push({
      pathname: `/booking/${booking.barberId}/${booking.staffId}`,
      params: { 
        modifyBookingId: booking.id,
        existingDate: booking.date,
        existingTime: booking.time,
        existingService: booking.service
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.success;
      case 'pending':
        return colors.warning;
      case 'cancelled':
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confermato';
      case 'pending':
        return 'In Attesa';
      case 'cancelled':
        return 'Cancellato';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isUpcoming = (date: string, time: string) => {
    const bookingDateTime = new Date(`${date} ${time}`);
    return bookingDateTime > new Date();
  };

  const getTimeUntilAppointment = (date: string, time: string): string => {
    const bookingDateTime = new Date(`${date} ${time}`);
    const now = new Date();
    const timeDifference = bookingDateTime.getTime() - now.getTime();
    
    if (timeDifference <= 0) return '';
    
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours < 1) {
      return `Tra ${minutes} minuti`;
    } else if (hours < 24) {
      return `Tra ${hours} ore`;
    } else {
      const days = Math.floor(hours / 24);
      return `Tra ${days} giorni`;
    }
  };

  const upcomingBookings = bookings.filter(booking => 
    booking.status !== 'cancelled' && isUpcoming(booking.date, booking.time)
  );
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'cancelled' || !isUpcoming(booking.date, booking.time)
  );

  if (loading) {
    return (
      <View style={[commonStyles.container, commonStyles.center]}>
        <Image 
          source={require('../assets/images/final_quest_240x240.png')} 
          style={{ width: 60, height: 60, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text style={commonStyles.text}>Caricamento prenotazioni...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back" size={24} />
          </TouchableOpacity>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Image 
              source={require('../assets/images/final_quest_240x240.png')} 
              style={{ width: 24, height: 24, marginRight: 8 }}
              resizeMode="contain"
            />
            <Text style={commonStyles.subtitle}>Le Mie Prenotazioni</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/map')}>
            <Icon name="add" size={24} />
          </TouchableOpacity>
        </View>

        {bookings.length === 0 ? (
          <View style={[commonStyles.center, { marginTop: 50 }]}>
            <Image 
              source={require('../assets/images/final_quest_240x240.png')} 
              style={{ width: 120, height: 120, marginBottom: 24 }}
              resizeMode="contain"
            />
            <Text style={commonStyles.subtitle}>Nessuna Prenotazione</Text>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 24 }]}>
              Non hai ancora prenotazioni. Trova un barbiere e prenota il tuo primo appuntamento!
            </Text>
            <Button
              text="Trova Barbieri"
              onPress={() => router.push('/map')}
              style={buttonStyles.primary}
            />
          </View>
        ) : (
          <>
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <View style={commonStyles.section}>
                <Text style={commonStyles.subtitle}>Prossimi Appuntamenti</Text>
                {upcomingBookings.map((booking) => {
                  const canModify = canModifyBooking(booking.date, booking.time);
                  const timeUntil = getTimeUntilAppointment(booking.date, booking.time);
                  
                  return (
                    <View key={booking.id} style={commonStyles.card}>
                      <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                        <Text style={commonStyles.text}>{booking.barberName}</Text>
                        <Text style={[commonStyles.textSecondary, { color: getStatusColor(booking.status) }]}>
                          {getStatusText(booking.status)}
                        </Text>
                      </View>
                      
                      <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                        {booking.staffName}
                      </Text>
                      
                      <View style={[commonStyles.row, { marginBottom: 8 }]}>
                        <Icon name="calendar" size={16} style={{ marginRight: 8 }} />
                        <Text style={commonStyles.textSecondary}>
                          {formatDate(booking.date)} alle {booking.time}
                        </Text>
                      </View>

                      {timeUntil && (
                        <View style={[commonStyles.row, { marginBottom: 8 }]}>
                          <Icon name="time" size={16} style={{ marginRight: 8 }} />
                          <Text style={[commonStyles.textSecondary, { fontStyle: 'italic' }]}>
                            {timeUntil}
                          </Text>
                        </View>
                      )}
                      
                      <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 16 }]}>
                        <Text style={commonStyles.text}>{booking.service}</Text>
                        <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                          {booking.price}
                        </Text>
                      </View>

                      {!canModify && (
                        <View style={[commonStyles.row, { marginBottom: 12, padding: 8, backgroundColor: colors.warning + '20', borderRadius: 8 }]}>
                          <Icon name="warning" size={16} color={colors.warning} style={{ marginRight: 8 }} />
                          <Text style={[commonStyles.textSecondary, { color: colors.warning, fontSize: 12 }]}>
                            Modifica/cancellazione non disponibile entro 4 ore dall&apos;appuntamento
                          </Text>
                        </View>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <View style={commonStyles.row}>
                          <Button
                            text="Cancella"
                            onPress={() => handleCancelBooking(booking.id, booking.date, booking.time)}
                            style={[
                              buttonStyles.outline, 
                              { flex: 1, marginRight: 8 },
                              !canModify && { opacity: 0.5 }
                            ]}
                            disabled={!canModify}
                          />
                          <Button
                            text="Modifica"
                            onPress={() => handleModifyBooking(booking)}
                            style={[
                              buttonStyles.secondary, 
                              { flex: 1, marginLeft: 8 },
                              !canModify && { opacity: 0.5 }
                            ]}
                            disabled={!canModify}
                          />
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <View style={commonStyles.section}>
                <Text style={commonStyles.subtitle}>Storico</Text>
                {pastBookings.map((booking) => (
                  <View key={booking.id} style={[commonStyles.card, { opacity: 0.7 }]}>
                    <View style={[commonStyles.row, commonStyles.spaceBetween, { marginBottom: 8 }]}>
                      <Text style={commonStyles.text}>{booking.barberName}</Text>
                      <Text style={[commonStyles.textSecondary, { color: getStatusColor(booking.status) }]}>
                        {getStatusText(booking.status)}
                      </Text>
                    </View>
                    
                    <Text style={[commonStyles.textSecondary, { marginBottom: 4 }]}>
                      {booking.staffName}
                    </Text>
                    
                    <View style={[commonStyles.row, { marginBottom: 8 }]}>
                      <Icon name="calendar" size={16} style={{ marginRight: 8 }} />
                      <Text style={commonStyles.textSecondary}>
                        {formatDate(booking.date)} alle {booking.time}
                      </Text>
                    </View>
                    
                    <View style={[commonStyles.row, commonStyles.spaceBetween]}>
                      <Text style={commonStyles.text}>{booking.service}</Text>
                      <Text style={[commonStyles.text, { color: colors.primary, fontWeight: '600' }]}>
                        {booking.price}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}