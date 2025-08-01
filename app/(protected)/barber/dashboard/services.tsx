import { Text, View, TextInput, FlatList } from 'react-native';
import { useState } from 'react';
import Button from '../../../../components/Button';
import { commonStyles, buttonStyles } from '../../../../styles/commonStyles';

interface Service {
  name: string;
  price: string;
  duration: string;
}

export default function ServicesManagementScreen() {
  const [services, setServices] = useState<Service[]>([
    { name: 'Taglio Classico', price: '€25', duration: '30 min' },
    { name: 'Taglio + Barba', price: '€35', duration: '45 min' },
  ]);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState('');

  const handleAddService = () => {
    if (newServiceName && newServicePrice && newServiceDuration) {
      setServices([...services, { name: newServiceName, price: newServicePrice, duration: newServiceDuration }]);
      setNewServiceName('');
      setNewServicePrice('');
      setNewServiceDuration('');
    }
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Gestisci Servizi</Text>
        <FlatList
          data={services}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={commonStyles.card}>
              <Text style={commonStyles.text}>{item.name}</Text>
              <Text style={commonStyles.textSecondary}>{item.price} - {item.duration}</Text>
            </View>
          )}
        />
        <View style={{ marginTop: 16 }}>
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Nome Servizio"
            value={newServiceName}
            onChangeText={setNewServiceName}
          />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Prezzo"
            value={newServicePrice}
            onChangeText={setNewServicePrice}
          />
          <TextInput
            style={commonStyles.searchInput}
            placeholder="Durata"
            value={newServiceDuration}
            onChangeText={setNewServiceDuration}
          />
          <Button
            text="Aggiungi Servizio"
            onPress={handleAddService}
            style={buttonStyles.primary}
          />
        </View>
      </View>
    </View>
  );
}
