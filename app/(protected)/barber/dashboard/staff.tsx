import { Text, View, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import Button from '../../../../components/Button';
import { commonStyles, buttonStyles } from '../../../../styles/commonStyles';

interface StaffMember {
  name: string;
  specialties: string[];
}

export default function StaffManagementScreen() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { name: 'Marco Rossi', specialties: ['Tagli Classici', 'Barba'] },
    { name: 'Giuseppe Bianchi', specialties: ['Tagli Moderni', 'Styling'] },
  ]);
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffSpecialties, setNewStaffSpecialties] = useState('');

  const handleAddStaff = () => {
    if (newStaffName && newStaffSpecialties) {
      setStaff([...staff, { name: newStaffName, specialties: newStaffSpecialties.split(',') }]);
      setNewStaffName('');
      setNewStaffSpecialties('');
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Gestisci Staff</Text>
        <FlatList
          data={staff}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={commonStyles.card}>
              <Text style={commonStyles.text}>{item.name}</Text>
              <Text style={commonStyles.textSecondary}>{item.specialties.join(', ')}</Text>
            </View>
          )}
        />
        <View style={{ marginTop: 16 }}>
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Nome Membro Staff"
            value={newStaffName}
            onChangeText={setNewStaffName}
          />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Specialità (separate da virgola)"
            value={newStaffSpecialties}
            onChangeText={setNewStaffSpecialties}
          />
          <Button
            text="Aggiungi Membro"
            onPress={handleAddStaff}
            style={buttonStyles.primary}
          />
        </View>
      </View>
    </View>
  );
}
