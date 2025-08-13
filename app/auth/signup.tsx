import { Text, View, TextInput, TouchableOpacity, ImageBackground, Switch } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../../components/Button';
import { colors } from '../../styles/commonStyles';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isBarber, setIsBarber] = useState(false);

  const handleSignup = () => {
    // Mock signup logic
    console.log('Signing up with:', { name, surname, email, password, phone, isBarber });
    router.replace('/(protected)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHurKuRM1QUskx6wCDG4XuIbfGhgSBLAGhiiiJ5hLI4Avih1A3fag9SLNIo_S5Scj13TshZgfcUVZDzHhDjLyNL5oLRIk-ZrLcjetjouvAU4Etb7M2mpzzAUKTLGaVvXHxTwDy7smgVZFF1DDnoJBePR0_5S-0POfouWR0dF7awjDFmKtpGnSQ4hmhl8zzsusOXL6CVhPaOSP1d0NFInNziiWuxh0MIckl1smuMHC7BWTNgh7gVJMt6gY-UWwi8_h6oCcen3szhA' }}
        style={{ height: 200, justifyContent: 'flex-end' }}
        resizeMode="cover"
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Benvenuto</Text>
        <TextInput
          placeholder="Nome"
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16 }}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Cognome"
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16 }}
          value={surname}
          onChangeText={setSurname}
        />
        <TextInput
          placeholder="Email"
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16 }}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 16, fontSize: 16 }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          placeholder="Numero di telefono"
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 16 }}
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 16 }}>Sei un barbiere?</Text>
          <Switch
            value={isBarber}
            onValueChange={setIsBarber}
            trackColor={{ false: colors.grey, true: colors.primary }}
          />
        </View>
        <Button
          text="Registrati"
          onPress={handleSignup}
        />
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={{ textAlign: 'center', marginTop: 24, fontWeight: 'bold' }}>Hai già un account? Accedi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
