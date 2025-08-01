import { Text, View, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';

export default function HomeScreen() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const navigateToMap = () => {
    console.log('Navigating to map...');
    router.push('/map');
  };

  const navigateToBookings = () => {
    console.log('Navigating to bookings...');
    router.push('/bookings');
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Buongiorno';
    if (hour < 18) return 'Buon pomeriggio';
    return 'Buonasera';
  };

  return (
    <ScrollView style={commonStyles.container}>
      <View style={commonStyles.content}>

        {/* Greeting */}
        <View style={[commonStyles.card, { backgroundColor: colors.primary + '10', borderColor: colors.primary, borderWidth: 1, marginBottom: 24 }]}>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Image
              source={require('../../assets/images/final_quest_240x240__.png')}
              style={{ width: 40, height: 40, marginRight: 12 }}
              resizeMode="contain"
            />
            <View>
              <Text style={[commonStyles.subtitle, { color: colors.primary }]}>
                {getGreeting()}!
              </Text>
              <Text style={commonStyles.textSecondary}>
                Pronto per il tuo prossimo taglio?
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Azioni Rapide</Text>

          <View style={[commonStyles.card, { marginBottom: 16 }]}>
            <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 12 }]}>
              <Icon name="location" size={24} color={colors.primary} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.text}>Trova Barbieri</Text>
                <Text style={commonStyles.textSecondary}>
                  Cerca barbieri vicino a te sulla mappa
                </Text>
              </View>
            </View>
            <Button
              text="Apri Mappa"
              onPress={navigateToMap}
              style={buttonStyles.primary}
            />
          </View>

          <View style={commonStyles.card}>
            <View style={[commonStyles.row, { alignItems: 'center', marginBottom: 12 }]}>
              <Icon name="calendar" size={24} color={colors.secondary} style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text style={commonStyles.text}>Le Mie Prenotazioni</Text>
                <Text style={commonStyles.textSecondary}>
                  Gestisci i tuoi appuntamenti
                </Text>
              </View>
            </View>
            <Button
              text="Vedi Prenotazioni"
              onPress={navigateToBookings}
              style={buttonStyles.secondary}
            />
          </View>
        </View>

        {/* Features */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Perché scegliere BarberBook?</Text>

          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>Prenotazione facile e veloce</Text>
          </View>

          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>Barbieri verificati e professionali</Text>
          </View>

          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>Notifiche per i tuoi appuntamenti</Text>
          </View>

          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Icon name="checkmark-circle" size={20} color={colors.success} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>Modifica e cancellazione flessibili</Text>
          </View>
        </View>

        {/* Call to Action */}
        <View style={[commonStyles.center, { marginTop: 32, marginBottom: 32 }]}>
          <Image
            source={require('../../assets/images/natively-dark.png')}
            style={{ width: 80, height: 80, marginBottom: 16, opacity: 0.7 }}
            resizeMode="contain"
          />
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', fontSize: 12 }]}>
            Powered by Natively
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}