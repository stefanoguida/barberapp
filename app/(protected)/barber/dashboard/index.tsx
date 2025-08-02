import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Icon from '../../../../components/Icon';
import { commonStyles, colors } from '../../../../styles/commonStyles';

export default function BarberDashboard() {
  return (
    <View style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Pannello di Controllo</Text>

        <TouchableOpacity style={commonStyles.card} onPress={() => router.push('/(protected)/barber/dashboard/shop')}>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Icon name="storefront" size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <View>
              <Text style={commonStyles.subtitle}>Gestisci Negozio</Text>
              <Text style={commonStyles.textSecondary}>Modifica informazioni e orari</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.card} onPress={() => router.push('/(protected)/barber/dashboard/services')}>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Icon name="cut" size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <View>
              <Text style={commonStyles.subtitle}>Gestisci Servizi</Text>
              <Text style={commonStyles.textSecondary}>Aggiungi o modifica servizi</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={commonStyles.card} onPress={() => router.push('/(protected)/barber/dashboard/staff')}>
          <View style={[commonStyles.row, { alignItems: 'center' }]}>
            <Icon name="people" size={24} color={colors.primary} style={{ marginRight: 12 }} />
            <View>
              <Text style={commonStyles.subtitle}>Gestisci Staff</Text>
              <Text style={commonStyles.textSecondary}>Aggiungi o modifica membri dello staff</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
