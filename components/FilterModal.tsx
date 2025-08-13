import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from './Icon';

export default function FilterModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 24,
          width: '85%',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' }}>Filtri</Text>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Orario di apertura</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12, marginBottom: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Recensioni</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12 }}>
            <Text style={{ fontSize: 14, fontWeight: '500' }}>Servizi</Text>
            <Icon name="chevron-down" size={20} color="#111418" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 24,
              backgroundColor: '#0c7ff2',
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: 'center',
            }}
            onPress={onClose}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Chiudi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}