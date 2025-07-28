import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textSecondary,
  }
});

export default function Button({ text, onPress, style, textStyle, disabled = false }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        disabled && styles.disabled
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[
        styles.text,
        textStyle,
        disabled && styles.disabledText
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}