import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../../components/Button';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Mock login logic
    console.log('Logging in with:', email, password);
    router.replace('/');
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Login</Text>
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={commonStyles.searchInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          text="Login"
          onPress={handleLogin}
          style={buttonStyles.primary}
        />
        <TouchableOpacity onPress={() => router.push('/auth/signup')}>
          <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
            Non hai un account? Registrati
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
