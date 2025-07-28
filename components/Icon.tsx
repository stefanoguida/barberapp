import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/commonStyles';

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: any;
}

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Icon({ name, size = 24, color = colors.text, style }: IconProps) {
  return (
    <View style={[styles.icon, style]}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}