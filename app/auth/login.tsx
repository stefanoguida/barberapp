import { Text, View, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../../components/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login logic
    console.log('Logging in with:', email, password);
    router.replace('/(protected)');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground
        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMHurKuRM1QUskx6wCDG4XuIbfGhgSBLAGhiiiJ5hLI4Avih1A3fag9SLNIo_S5Scj13TshZgfcUVZDzHhDjLyNL5oLRIk-ZrLcjetjouvAU4Etb7M2mpzzAUKTLGaVvXHxTwDy7smgVZFF1DDnoJBePR0_5S-0POfouWR0dF7awjDFmKtpGnSQ4hmhl8zzsusOXL6CVhPaOSP1d0NFInNziiWuxh0MIckl1smuMHC7BWTNgh7gVJMt6gY-UWwi8_h6oCcen3szhA' }}
        style={{ height: 320, justifyContent: 'flex-end' }}
        resizeMode="cover"
      />
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 }}>Bentornato</Text>
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
          style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, marginBottom: 24, fontSize: 16 }}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          text="Login"
          onPress={handleLogin}
        />
        <Text style={{ textAlign: 'center', marginTop: 16, color: '#60758a' }}>Oppure accedi con</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 16 }}>
          <TouchableOpacity style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#f0f2f5', borderRadius: 12, padding: 16, flex: 1, alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold' }}>Google</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => router.push('/auth/signup')}>
          <Text style={{ textAlign: 'center', marginTop: 24, fontWeight: 'bold' }}>
            Non hai un account? Registrati
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
