import { View, TextInput, TouchableOpacity } from 'react-native';
import Icon from './Icon';

export default function HeaderSearchBar({ search, setSearch, onFilterPress }: { search: string; setSearch: (v: string) => void; onFilterPress: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <View style={{ flex: 1, backgroundColor: '#f0f2f5', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
        <Icon name="search" size={24} color="#60758a" />
        <TextInput
          placeholder="Barberia, indirizzo o servizio"
          style={{ flex: 1, height: 48, marginLeft: 8, fontSize: 16 }}
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <TouchableOpacity
        style={{
          marginLeft: 12,
          backgroundColor: '#e6eaf0',
          borderRadius: 12,
          padding: 12,
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          width: 48,
        }}
        onPress={onFilterPress}
      >
        <Icon name="filter" size={24} color="#0c7ff2" />
      </TouchableOpacity>
    </View>
  );
}