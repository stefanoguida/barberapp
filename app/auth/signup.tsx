import { Text, View, TextInput, TouchableOpacity, Switch } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import Button from '../../components/Button';
import { commonStyles, buttonStyles, colors } from '../../styles/commonStyles';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBarber, setIsBarber] = useState(false);

  const handleSignup = () => {
    // Mock signup logic
    console.log('Signing up with:', email, password, 'as barber:', isBarber);
    router.replace('/');
  };

  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Registrati</Text>
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
        <View style={[commonStyles.row, { justifyContent: 'space-between', marginVertical: 16 }]}>
          <Text style={commonStyles.text}>Sei un barbiere?</Text>
          <Switch
            value={isBarber}
            onValueChange={setIsBarber}
            trackColor={{ false: colors.grey, true: colors.primary }}
          />
        </View>
        <Button
          text="Registrati"
          onPress={handleSignup}
          style={buttonStyles.primary}
        />
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
            Hai già un account? Accedi
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
