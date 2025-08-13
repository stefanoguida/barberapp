import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useUser } from '../../context/UserContext';
import { router } from 'expo-router';
import { colors } from '../../styles/commonStyles';

export default function ProfileScreen() {
  const { user, logout } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilo</Text>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user?.name || 'Non disponibile'}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email || 'Non disponibile'}</Text>
        <Text style={styles.label}>Ruolo:</Text>
        <Text style={styles.value}>{user?.isBarber ? 'Barbiere' : 'Cliente'}</Text>
      </View>
      <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background || 'white',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: colors.primary,
  },
  infoBox: {
    backgroundColor: colors.card || '#f0f2f5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    shadowColor: colors.shadow || '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    fontSize: 16,
    color: colors.textSecondary || '#60758a',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.textPrimary || '#111418',
  },
  logoutBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});