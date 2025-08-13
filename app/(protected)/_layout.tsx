import { Redirect, Stack, router } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import { useUser } from '../../context/UserContext';

export default function ProtectedLayout() {
  // Mock authentication status and user role
  const { isAuthenticated, nome, cognome } = useUser();
  const [isBarber, setIsBarber] = useState(true);

  if (!isAuthenticated) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // Nasconde la barra superiore
        }}
      />
      <Stack.Screen name="barber/[id]" options={{ headerShown: false }} />
      <Stack.Screen name="booking/[barberId]/[staffId]" options={{ headerShown: false }} />
      <Stack.Screen name="bookings" options={{ headerShown: false }} />
      <Stack.Screen name="map" options={{ headerShown: false }} />
      <Stack.Screen name="barber/dashboard/index" options={{ title: 'Pannello di Controllo' }} />
      <Stack.Screen name="barber/dashboard/shop" options={{ title: 'Gestisci Negozio' }} />
      <Stack.Screen name="barber/dashboard/services" options={{ title: 'Gestisci Servizi' }} />
      <Stack.Screen name="barber/dashboard/staff" options={{ title: 'Gestisci Staff' }} />
    </Stack>
  );
}
