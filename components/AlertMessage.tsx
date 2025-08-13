import { View, Text } from 'react-native';

interface AlertMessageProps {
  message: string;
  type?: 'error' | 'success' | 'info';
}

export default function AlertMessage({ message, type = 'error' }: AlertMessageProps) {
  const backgroundColor =
    type === 'error'
      ? '#ffe5e5'
      : type === 'success'
      ? '#e6ffed'
      : '#e6f0ff';

  const textColor =
    type === 'error'
      ? '#d32f2f'
      : type === 'success'
      ? '#388e3c'
      : '#1565c0';

  return (
    <View style={{
      backgroundColor,
      borderRadius: 10,
      padding: 14,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: textColor,
      alignItems: 'center',
    }}>
      <Text style={{ color: textColor, fontWeight: 'bold', fontSize: 15 }}>{message}</Text>
    </View>
  );
}