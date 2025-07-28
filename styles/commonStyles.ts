import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2E7D32',      // Green for barber theme
  secondary: '#4CAF50',    // Lighter green
  accent: '#81C784',       // Light green accent
  background: '#FAFAFA',   // Light gray background
  backgroundAlt: '#FFFFFF', // White background
  text: '#212121',         // Dark text
  textSecondary: '#757575', // Gray text
  grey: '#E0E0E0',         // Light gray
  card: '#FFFFFF',         // White card background
  success: '#4CAF50',      // Success green
  warning: '#FF9800',      // Warning orange
  error: '#F44336',        // Error red
  available: '#E8F5E8',    // Light green for available slots
  occupied: '#FFEBEE',     // Light red for occupied slots
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  secondary: {
    backgroundColor: colors.secondary,
    alignSelf: 'center',
    width: '100%',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: 'auto',
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.grey,
    marginBottom: 16,
  },
  mapContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bottomSheet: {
    backgroundColor: colors.backgroundAlt,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    minHeight: 200,
  },
  tabBar: {
    backgroundColor: colors.backgroundAlt,
    borderTopWidth: 1,
    borderTopColor: colors.grey,
    paddingBottom: 8,
  },
  calendarDay: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  timeSlot: {
    padding: 12,
    borderRadius: 8,
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  available: {
    backgroundColor: colors.available,
    borderColor: colors.success,
    borderWidth: 1,
  },
  occupied: {
    backgroundColor: colors.occupied,
    borderColor: colors.error,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: colors.primary,
  },
});