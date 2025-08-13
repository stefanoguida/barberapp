import { View, TouchableOpacity, Text } from 'react-native';

export default function TimeSlots({ times, selectedTime, onSelectTime }: {
  times: string[];
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
      {times.map((time) => (
        <TouchableOpacity
          key={time}
          style={{
            backgroundColor: selectedTime === time ? '#0c7ff2' : '#f0f2f5',
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={() => onSelectTime(time)}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: selectedTime === time ? 'white' : 'black' }}>{time}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}