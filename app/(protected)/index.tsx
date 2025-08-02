import { Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '../../components/Icon';
import MapWrapper from '../../components/MapWrapper';
import BottomNavBar from '../../components/BottomNavBar';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingHorizontal: 16 }}>
          <Icon name="search" size={24} color="#60758a" />
          <TextInput
            placeholder="Barberia, indirizzo o servizio"
            style={{ flex: 1, height: 48, marginLeft: 8, fontSize: 16 }}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 16 }}>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Orario di apertura</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginRight: 8 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Recensioni</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Servizi</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
        <MapWrapper />
        <View style={{ position: 'absolute', bottom: 100, right: 16, gap: 8 }}>
          <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Icon name="add" size={24} color="#111418" />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Icon name="remove" size={24} color="#111418" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ position: 'absolute', bottom: 180, right: 16, backgroundColor: 'white', borderRadius: 12, padding: 12, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Icon name="navigate-outline" size={24} color="#111418" />
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: '#0c7ff2', borderRadius: 12, padding: 16, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
          <Icon name="list" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <BottomNavBar />
    </View>
  );
}