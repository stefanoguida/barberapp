import { Text, View, TextInput } from 'react-native';
import { useState } from 'react';
import Button from '../../../../components/Button';
import { commonStyles, buttonStyles } from '../../../../styles/commonStyles';

export default function ShopManagementScreen() {
  const [shopName, setShopName] = useState('Barbiere Centrale');
  const [address, setAddress] = useState('Via Roma 123, Milano');
  const [phone, setPhone] = useState('+39 02 1234567');
  const [email, setEmail] = useState('info@barbiere.it');

  const handleSave = () => {
    console.log('Saving shop info:', { shopName, address, phone, email });
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Gestisci Negozio</Text>
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Nome Negozio"
          value={shopName}
          onChangeText={setShopName}
        />
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Indirizzo"
          value={address}
          onChangeText={setAddress}
        />
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Telefono"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Button
          text="Salva Modifiche"
          onPress={handleSave}
          style={buttonStyles.primary}
        />
      </View>
    </View>
  );
}
