import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native';

export default function StaffList({ staff, selectedStaff, onSelectStaff }: {
  staff: any[];
  selectedStaff: any;
  onSelectStaff: (staff: any) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {staff.map((person) => {
        const isSelected = selectedStaff?.id === person.id;
        return (
          <View key={person.id} style={{ alignItems: 'center', marginRight: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: isSelected ? '#0c7ff2' : '#f0f2f5',
                alignItems: 'center',
                marginBottom: 8,
                borderRadius: 12,
                padding: 8,
              }}
              onPress={() => onSelectStaff(person)}
            >
              <Image source={{ uri: person.avatar }} style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }} />
              <Text style={{ fontSize: 16, fontWeight: '600', color: isSelected ? 'white' : 'black' }}>{person.name}</Text>
              <Text style={{ fontSize: 14, color: isSelected ? '#d3d3d3' : '#60758a' }}>{person.role}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
}