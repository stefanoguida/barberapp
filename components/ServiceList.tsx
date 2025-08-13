import { View, TouchableOpacity, Text } from 'react-native';

export default function ServiceList({ services, selectedService, onSelectService }: {
  services: string[];
  selectedService: string | null;
  onSelectService: (service: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
      {services.map((service) => (
        <TouchableOpacity
          key={service}
          style={{
            backgroundColor: selectedService === service ? '#0c7ff2' : '#f0f2f5',
            borderRadius: 12,
            paddingVertical: 8,
            paddingHorizontal: 12,
          }}
          onPress={() => onSelectService(service)}
        >
          <Text style={{ fontSize: 14, fontWeight: '500', color: selectedService === service ? 'white' : 'black' }}>{service}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}